/**
 * Recebe os avisos do Mercado Pago quando um pagamento muda de status.
 * Quando um pagamento é APROVADO, envia um e-mail para você com os itens
 * e o endereço de entrega do cliente - é com esses dados que você faz o
 * pedido no fornecedor.
 *
 * O Mercado Pago chama esta URL sozinho (a criar-preferencia.js já informa
 * o endereço em "notification_url"), não precisa configurar nada no painel.
 *
 * Variáveis de ambiente (Vercel > Settings > Environment Variables):
 *   MP_ACCESS_TOKEN  -> o mesmo token usado no checkout
 *   RESEND_API_KEY   -> chave gratuita de https://resend.com (envia o e-mail)
 *   EMAIL_PEDIDOS    -> e-mail que vai RECEBER os avisos de pedido
 *                       (use o mesmo e-mail com que criou a conta no Resend)
 *   EMAIL_REMETENTE  -> (opcional) remetente com o domínio da loja, ex:
 *                       Térmica Market <pedidos@termicamarket.com.br>
 *                       O domínio precisa estar verificado no Resend. Com ele
 *                       configurado, o CLIENTE também recebe um e-mail de
 *                       confirmação quando o pagamento é aprovado.
 *
 * Se RESEND_API_KEY / EMAIL_PEDIDOS não estiverem configurados, o pedido
 * aparece apenas nos logs da Vercel (Deployments > Functions/Logs).
 */

function esc(texto) {
  return String(texto == null ? "" : texto)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function reais(valor) {
  return Number(valor || 0).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });
}

/** Descobre o id do pagamento nos dois formatos de aviso do Mercado Pago. */
function extrairIdPagamento(req) {
  const query = req.query || {};
  const corpo = req.body && typeof req.body === "object" ? req.body : {};

  const tipo = query.type || query.topic || corpo.type || corpo.topic;
  if (tipo !== "payment") return null;

  const id =
    query["data.id"] ||
    query.id ||
    (corpo.data && corpo.data.id) ||
    corpo.id;
  return id ? String(id) : null;
}

function montarPedido(pagamento) {
  const m = pagamento.metadata || {};
  const payer = pagamento.payer || {};
  const itens = (pagamento.additional_info && pagamento.additional_info.items) || [];

  const produtos = itens
    .filter((i) => i.id !== "frete" && i.title !== "Frete")
    .map((i) => ({
      titulo: i.title,
      quantidade: Number(i.quantity),
      preco: Number(i.unit_price)
    }));

  return {
    pedido: pagamento.external_reference || m.pedido || `PAG-${pagamento.id}`,
    pagamentoId: pagamento.id,
    total: pagamento.transaction_amount,
    metodo: pagamento.payment_type_id || pagamento.payment_method_id || "",
    frete: m.frete,
    cupom: m.cupom || "",
    produtos,
    cliente: {
      nome: m.nome || [payer.first_name, payer.last_name].filter(Boolean).join(" "),
      email: m.email || payer.email || "",
      telefone: m.telefone || "",
      cep: m.cep || "",
      rua: m.rua || "",
      numero: m.numero || "",
      complemento: m.complemento || "",
      bairro: m.bairro || "",
      cidade: m.cidade || "",
      uf: m.uf || ""
    }
  };
}

function textoDoPedido(p) {
  const c = p.cliente;
  const linhasProdutos = p.produtos
    .map((i) => `- ${i.quantidade}x ${i.titulo} (${reais(i.preco)} cada)`)
    .join("\n");

  return [
    `NOVO PEDIDO PAGO: ${p.pedido}`,
    `Pagamento Mercado Pago: ${p.pagamentoId} (${p.metodo})`,
    "",
    "PRODUTOS",
    linhasProdutos || "(itens não informados - veja no painel do Mercado Pago)",
    "",
    p.cupom ? `Cupom usado: ${p.cupom} (já descontado nos preços acima)` : "",
    `Frete cobrado: ${reais(p.frete)}`,
    `Total pago: ${reais(p.total)}`,
    "",
    "ENTREGAR PARA",
    c.nome,
    `${c.rua}, ${c.numero}${c.complemento ? " - " + c.complemento : ""}`,
    `${c.bairro} - ${c.cidade}/${c.uf}`,
    `CEP: ${c.cep}`,
    "",
    "CONTATO",
    `Telefone/WhatsApp: ${c.telefone}`,
    `E-mail: ${c.email}`
  ].join("\n");
}

function htmlDoPedido(p) {
  const c = p.cliente;
  const itens = p.produtos
    .map(
      (i) =>
        `<li>${esc(i.quantidade)}x ${esc(i.titulo)} <small>(${reais(i.preco)} cada)</small></li>`
    )
    .join("");

  return `
  <div style="font-family:Arial,sans-serif;max-width:560px;color:#1b2430">
    <h2 style="margin:0 0 4px">Novo pedido pago 🎉</h2>
    <p style="margin:0 0 16px;color:#5c6b7a">
      Pedido <strong>${esc(p.pedido)}</strong> · Mercado Pago #${esc(p.pagamentoId)} (${esc(p.metodo)})
    </p>

    <h3 style="margin:16px 0 6px">Produtos</h3>
    <ul style="margin:0;padding-left:20px">${itens || "<li>Veja os itens no painel do Mercado Pago</li>"}</ul>
    ${p.cupom ? `<p style="margin:8px 0 0">Cupom usado: <strong>${esc(p.cupom)}</strong> (já descontado nos preços)</p>` : ""}
    <p style="margin:8px 0 0">Frete: ${reais(p.frete)} · <strong>Total pago: ${reais(p.total)}</strong></p>

    <h3 style="margin:16px 0 6px">Entregar para</h3>
    <p style="margin:0;line-height:1.5">
      <strong>${esc(c.nome)}</strong><br>
      ${esc(c.rua)}, ${esc(c.numero)}${c.complemento ? " - " + esc(c.complemento) : ""}<br>
      ${esc(c.bairro)} - ${esc(c.cidade)}/${esc(c.uf)}<br>
      CEP ${esc(c.cep)}
    </p>

    <h3 style="margin:16px 0 6px">Contato</h3>
    <p style="margin:0;line-height:1.5">
      Telefone/WhatsApp: ${esc(c.telefone)}<br>
      E-mail: ${esc(c.email)}
    </p>
  </div>`;
}

const EMAIL_CONTATO = "termicasmarket@gmail.com";

function formatarCep(cep) {
  const d = String(cep || "").replace(/\D/g, "");
  return d.length === 8 ? `${d.slice(0, 5)}-${d.slice(5)}` : String(cep || "");
}

function htmlParaCliente(p) {
  const c = p.cliente;
  const primeiroNome = String(c.nome || "").split(/\s+/)[0] || "";
  const itens = p.produtos
    .map(
      (i) =>
        `<tr><td style="padding:6px 0">${esc(i.quantidade)}x ${esc(i.titulo)}</td>` +
        `<td style="padding:6px 0;text-align:right;white-space:nowrap">${reais(i.preco * i.quantidade)}</td></tr>`
    )
    .join("");

  return `
  <div style="font-family:Arial,sans-serif;max-width:560px;margin:0 auto;color:#1b2430">
    <h2 style="margin:0 0 6px;color:#15324a">Pagamento aprovado! ✅</h2>
    <p style="margin:0 0 16px;line-height:1.5">
      Olá${primeiroNome ? ", " + esc(primeiroNome) : ""}! Recebemos o pagamento do seu pedido
      <strong>${esc(p.pedido)}</strong>. Obrigado por comprar na Térmica Market.
    </p>

    <h3 style="margin:18px 0 6px;color:#15324a">Resumo do pedido</h3>
    <table style="width:100%;border-collapse:collapse;font-size:15px">
      ${itens || '<tr><td style="padding:6px 0">Itens do pedido</td><td></td></tr>'}
      ${p.cupom ? `<tr><td style="padding:6px 0;color:#0f7b5f" colspan="2">Cupom ${esc(p.cupom)} aplicado nos preços acima</td></tr>` : ""}
      <tr><td style="padding:6px 0;border-top:1px solid #e3e8ee">Frete</td>
          <td style="padding:6px 0;border-top:1px solid #e3e8ee;text-align:right">${Number(p.frete) > 0 ? reais(p.frete) : "Grátis"}</td></tr>
      <tr><td style="padding:6px 0"><strong>Total pago</strong></td>
          <td style="padding:6px 0;text-align:right"><strong>${reais(p.total)}</strong></td></tr>
    </table>

    <h3 style="margin:18px 0 6px;color:#15324a">Endereço de entrega</h3>
    <p style="margin:0;line-height:1.5">
      ${esc(c.nome)}<br>
      ${esc(c.rua)}, ${esc(c.numero)}${c.complemento ? " - " + esc(c.complemento) : ""}<br>
      ${esc(c.bairro)} - ${esc(c.cidade)}/${esc(c.uf)} · CEP ${esc(formatarCep(c.cep))}
    </p>

    <h3 style="margin:18px 0 6px;color:#15324a">Próximos passos</h3>
    <p style="margin:0;line-height:1.5">
      Separamos e despachamos o seu pedido em até 3 dias úteis. Quando ele for enviado,
      mandamos o código de rastreio por aqui ou pelo WhatsApp.
    </p>

    <p style="margin:18px 0 0;line-height:1.5;color:#5c6b7a;font-size:14px">
      Alguma dúvida ou algo errado no endereço? É só responder este e-mail ou escrever para
      <a href="mailto:${EMAIL_CONTATO}">${EMAIL_CONTATO}</a>.
    </p>
    <p style="margin:16px 0 0;color:#5c6b7a;font-size:13px">Térmica Market · Goiânia-GO</p>
  </div>`;
}

function textoParaCliente(p) {
  const c = p.cliente;
  return [
    `Pagamento aprovado! Pedido ${p.pedido}`,
    "",
    "Obrigado por comprar na Térmica Market.",
    "",
    ...p.produtos.map((i) => `- ${i.quantidade}x ${i.titulo}: ${reais(i.preco * i.quantidade)}`),
    `Frete: ${Number(p.frete) > 0 ? reais(p.frete) : "Grátis"}`,
    `Total pago: ${reais(p.total)}`,
    "",
    "Entrega:",
    c.nome,
    `${c.rua}, ${c.numero}${c.complemento ? " - " + c.complemento : ""}`,
    `${c.bairro} - ${c.cidade}/${c.uf} · CEP ${formatarCep(c.cep)}`,
    "",
    "Despachamos em até 3 dias úteis e enviamos o código de rastreio.",
    `Dúvidas: responda este e-mail ou escreva para ${EMAIL_CONTATO}.`
  ].join("\n");
}

/** Envia um e-mail pelo Resend. A chave de idempotência evita e-mails repetidos
 *  quando o Mercado Pago avisa o mesmo pagamento mais de uma vez. */
async function enviarPeloResend(chave, idempotencia, mensagem) {
  const resposta = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${chave}`,
      "Idempotency-Key": idempotencia
    },
    body: JSON.stringify(mensagem)
  });

  if (!resposta.ok) {
    const detalhe = await resposta.text();
    throw new Error(`Falha ao enviar e-mail (${resposta.status}): ${detalhe}`);
  }
}

async function enviarEmails(pedido) {
  const chave = process.env.RESEND_API_KEY;
  const destino = process.env.EMAIL_PEDIDOS;
  const remetente = process.env.EMAIL_REMETENTE;

  if (!chave || !destino) {
    console.log(
      "RESEND_API_KEY/EMAIL_PEDIDOS não configurados. Pedido pago:\n" +
        textoDoPedido(pedido)
    );
    return;
  }

  // 1) Aviso para a loja (sempre)
  await enviarPeloResend(chave, `loja-${pedido.pagamentoId}`, {
    from: remetente || "Térmica Market <onboarding@resend.dev>",
    to: [destino],
    subject: `Novo pedido pago ${pedido.pedido} - ${reais(pedido.total)}`,
    html: htmlDoPedido(pedido),
    text: textoDoPedido(pedido)
  });

  // 2) Confirmação para o cliente (só com domínio verificado no Resend)
  const emailCliente = pedido.cliente.email;
  if (!remetente) {
    console.log("EMAIL_REMETENTE não configurado: o cliente não recebe a confirmação.");
    return;
  }
  if (!emailCliente) return;

  try {
    await enviarPeloResend(chave, `cliente-${pedido.pagamentoId}`, {
      from: remetente,
      to: [emailCliente],
      reply_to: EMAIL_CONTATO,
      subject: `Pagamento aprovado - pedido ${pedido.pedido}`,
      html: htmlParaCliente(pedido),
      text: textoParaCliente(pedido)
    });
  } catch (erro) {
    // Não repete o aviso da loja por causa de falha no e-mail do cliente.
    console.error("E-mail do cliente não enviado:", erro.message);
  }
}

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).end();
    return;
  }

  try {
    const idPagamento = extrairIdPagamento(req);

    // Outros tipos de aviso (ex: merchant_order) não nos interessam.
    if (!idPagamento) {
      res.status(200).end();
      return;
    }

    const accessToken = process.env.MP_ACCESS_TOKEN;
    if (!accessToken) {
      console.error("MP_ACCESS_TOKEN não configurado.");
      res.status(500).end();
      return;
    }

    // Nunca confie só no aviso recebido: confirma o pagamento direto no
    // Mercado Pago. Assim ninguém consegue forjar um pedido "pago".
    const respostaMP = await fetch(
      `https://api.mercadopago.com/v1/payments/${encodeURIComponent(idPagamento)}`,
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );

    if (!respostaMP.ok) {
      console.error("Não foi possível consultar o pagamento", idPagamento, respostaMP.status);
      // 404 = id inexistente (ex: teste do painel): não adianta tentar de novo.
      res.status(respostaMP.status === 404 ? 200 : 500).end();
      return;
    }

    const pagamento = await respostaMP.json();
    console.log("Pagamento", pagamento.id, "status:", pagamento.status);

    if (pagamento.status === "approved") {
      await enviarEmails(montarPedido(pagamento));
    }

    res.status(200).end();
  } catch (erro) {
    // Responder erro faz o Mercado Pago tentar novamente mais tarde.
    console.error(erro);
    res.status(500).end();
  }
};
