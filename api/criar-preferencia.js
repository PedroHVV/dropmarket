/**
 * Função serverless (Vercel) que cria uma "preferência de pagamento"
 * no Mercado Pago e devolve o link de checkout (init_point).
 *
 * O Mercado Pago Checkout Pro já oferece Pix, cartão de crédito,
 * cartão de débito e boleto automaticamente para contas brasileiras -
 * não é preciso configurar cada meio de pagamento manualmente.
 *
 * Segurança: o navegador envia só { id, quantidade } de cada item. Os
 * preços e o frete são recalculados aqui, a partir de js/produtos.js,
 * então ninguém consegue alterar o valor da compra pelo navegador.
 *
 * Requer a variável de ambiente MP_ACCESS_TOKEN (veja o README.md).
 */

const { PRODUTOS, FRETE_FIXO, FRETE_GRATIS_ACIMA } = require("../js/produtos.js");

function limpar(valor, max) {
  return String(valor == null ? "" : valor).trim().slice(0, max);
}

function digitos(valor) {
  return String(valor == null ? "" : valor).replace(/\D/g, "");
}

/** Valida e normaliza os dados do cliente. Devolve { cliente } ou { erro }. */
function validarCliente(bruto) {
  if (!bruto || typeof bruto !== "object") {
    return { erro: "Dados de entrega não informados." };
  }

  const cliente = {
    nome: limpar(bruto.nome, 120),
    email: limpar(bruto.email, 120),
    telefone: digitos(bruto.telefone),
    cep: digitos(bruto.cep),
    rua: limpar(bruto.rua, 120),
    numero: limpar(bruto.numero, 20),
    complemento: limpar(bruto.complemento, 80),
    bairro: limpar(bruto.bairro, 80),
    cidade: limpar(bruto.cidade, 80),
    uf: limpar(bruto.uf, 2).toUpperCase()
  };

  if (cliente.nome.split(/\s+/).filter(Boolean).length < 2) {
    return { erro: "Informe nome e sobrenome." };
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cliente.email)) {
    return { erro: "E-mail inválido." };
  }
  if (cliente.telefone.length < 10 || cliente.telefone.length > 11) {
    return { erro: "Telefone inválido (informe com DDD)." };
  }
  if (cliente.cep.length !== 8) return { erro: "CEP inválido." };
  if (!cliente.rua || !cliente.numero || !cliente.bairro || !cliente.cidade) {
    return { erro: "Endereço incompleto." };
  }
  if (!/^[A-Z]{2}$/.test(cliente.uf)) return { erro: "Estado (UF) inválido." };

  return { cliente };
}

/** Monta os itens a partir do catálogo oficial (ignora preços do navegador). */
function montarItens(itensRecebidos) {
  if (!Array.isArray(itensRecebidos) || itensRecebidos.length === 0) {
    return { erro: "Carrinho vazio ou inválido." };
  }

  const itens = [];
  for (const recebido of itensRecebidos) {
    const produto = PRODUTOS.find((p) => recebido && p.id === recebido.id);
    if (!produto) return { erro: "Um dos produtos do carrinho não existe mais." };

    const quantidade = Number(recebido.quantidade);
    if (!Number.isInteger(quantidade) || quantidade < 1 || quantidade > 99) {
      return { erro: "Quantidade inválida." };
    }
    if (typeof produto.estoque === "number" && quantidade > produto.estoque) {
      return { erro: `Estoque insuficiente para ${produto.nome}.` };
    }

    itens.push({
      id: produto.id,
      title: produto.nome.slice(0, 250),
      quantity: quantidade,
      unit_price: Number(produto.preco),
      currency_id: "BRL"
    });
  }
  return { itens };
}

function calcularFrete(subtotal) {
  if (FRETE_GRATIS_ACIMA > 0 && subtotal >= FRETE_GRATIS_ACIMA) return 0;
  return FRETE_FIXO;
}

function gerarNumeroPedido() {
  const agora = Date.now().toString(36).toUpperCase();
  const aleatorio = Math.random().toString(36).slice(2, 5).toUpperCase();
  return `FROST-${agora}${aleatorio}`;
}

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ erro: "Método não permitido" });
    return;
  }

  const accessToken = process.env.MP_ACCESS_TOKEN;
  if (!accessToken) {
    res.status(500).json({
      erro: "MP_ACCESS_TOKEN não configurado no servidor. Veja o README.md."
    });
    return;
  }

  try {
    const corpo = req.body || {};

    const resultadoItens = montarItens(corpo.itens);
    if (resultadoItens.erro) {
      res.status(400).json({ erro: resultadoItens.erro });
      return;
    }

    const resultadoCliente = validarCliente(corpo.cliente);
    if (resultadoCliente.erro) {
      res.status(400).json({ erro: resultadoCliente.erro });
      return;
    }

    const { itens } = resultadoItens;
    const { cliente } = resultadoCliente;

    const subtotal = itens.reduce((t, i) => t + i.unit_price * i.quantity, 0);
    const frete = calcularFrete(subtotal);

    const itensMercadoPago = itens.map((i) => ({ ...i }));
    if (frete > 0) {
      itensMercadoPago.push({
        id: "frete",
        title: "Frete",
        quantity: 1,
        unit_price: Number(frete.toFixed(2)),
        currency_id: "BRL"
      });
    }

    const numeroPedido = gerarNumeroPedido();
    const origem = req.headers.origin || `https://${req.headers.host}`;
    const hospedagem = `https://${req.headers.host}`;

    const [nome, ...resto] = cliente.nome.split(/\s+/);

    const respostaMP = await fetch(
      "https://api.mercadopago.com/checkout/preferences",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`
        },
        body: JSON.stringify({
          items: itensMercadoPago,
          payer: {
            name: nome,
            surname: resto.join(" "),
            email: cliente.email,
            phone: {
              area_code: cliente.telefone.slice(0, 2),
              number: cliente.telefone.slice(2)
            }
          },
          external_reference: numeroPedido,
          // O Mercado Pago devolve estes dados quando avisa que o
          // pagamento foi aprovado (veja api/webhook.js).
          metadata: {
            pedido: numeroPedido,
            nome: cliente.nome,
            email: cliente.email,
            telefone: cliente.telefone,
            cep: cliente.cep,
            rua: cliente.rua,
            numero: cliente.numero,
            complemento: cliente.complemento,
            bairro: cliente.bairro,
            cidade: cliente.cidade,
            uf: cliente.uf,
            frete: frete.toFixed(2)
          },
          notification_url: `${hospedagem}/api/webhook`,
          back_urls: {
            success: `${origem}/sucesso.html`,
            failure: `${origem}/falha.html`,
            pending: `${origem}/pendente.html`
          },
          auto_return: "approved",
          statement_descriptor: "FROST TERMICA"
        })
      }
    );

    const dadosMP = await respostaMP.json();

    if (!respostaMP.ok) {
      console.error("Erro do Mercado Pago:", JSON.stringify(dadosMP));
      res.status(502).json({ erro: "Erro ao criar preferência de pagamento" });
      return;
    }

    res.status(200).json({ init_point: dadosMP.init_point, pedido: numeroPedido });
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ erro: "Erro interno ao processar o pagamento" });
  }
};
