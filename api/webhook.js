/**
 * (OPCIONAL) Endpoint para receber notificações do Mercado Pago
 * quando o status de um pagamento muda (aprovado, recusado, etc).
 *
 * Para uma loja pequena, isso não é obrigatório no começo: você pode
 * simplesmente conferir os pagamentos no painel do Mercado Pago.
 * Mas se no futuro quiser automatizar (ex: dar baixa em estoque,
 * enviar e-mail de confirmação), configure esta URL como webhook
 * no painel do Mercado Pago:
 *   https://SEU-SITE.vercel.app/api/webhook
 */

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).end();
    return;
  }

  console.log("Notificação recebida do Mercado Pago:", req.body);

  // Aqui você poderia:
  // 1. Consultar a API do Mercado Pago para confirmar o status do pagamento
  // 2. Atualizar seu estoque/banco de dados
  // 3. Enviar um e-mail de confirmação para o cliente

  res.status(200).end();
};
