/**
 * Função serverless (Vercel) que cria uma "preferência de pagamento"
 * no Mercado Pago e devolve o link de checkout (init_point).
 *
 * O Mercado Pago Checkout Pro já oferece Pix, cartão de crédito,
 * cartão de débito e boleto automaticamente para contas brasileiras -
 * não é preciso configurar cada meio de pagamento manualmente.
 *
 * Requer a variável de ambiente MP_ACCESS_TOKEN (veja o README.md).
 */

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
    const { itens } = req.body;

    if (!Array.isArray(itens) || itens.length === 0) {
      res.status(400).json({ erro: "Carrinho vazio ou inválido" });
      return;
    }

    // Nunca confie em preços vindos do navegador: aqui você poderia
    // revalidar cada item contra a lista oficial de produtos antes
    // de gerar a cobrança. Para uma loja pequena, o mínimo recomendado
    // é conferir se o preço bate com o catálogo (products.js/DB).
    const itensMercadoPago = itens.map((item) => ({
      title: String(item.nome).slice(0, 250),
      quantity: Number(item.quantidade),
      unit_price: Number(item.preco),
      currency_id: "BRL"
    }));

    const origem = req.headers.origin || `https://${req.headers.host}`;

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
      console.error("Erro do Mercado Pago:", dadosMP);
      res.status(502).json({ erro: "Erro ao criar preferência de pagamento" });
      return;
    }

    res.status(200).json({ init_point: dadosMP.init_point });
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ erro: "Erro interno ao processar o pagamento" });
  }
};
