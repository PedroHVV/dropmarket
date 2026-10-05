/**
 * Botão flutuante do WhatsApp.
 * ----------------------------
 * Troque o número abaixo pelo seu WhatsApp (com DDI 55 + DDD + número,
 * só dígitos, sem espaço/traço/parênteses). Exemplo pra (11) 91234-5678:
 *   const NUMERO_WHATSAPP = "5511912345678";
 *
 * Assim que você tiver o número, edite só essa linha aqui — o botão
 * aparece automaticamente em todas as páginas do site.
 */
const NUMERO_WHATSAPP = "5500000000000"; // <-- troque pelo seu número
const MENSAGEM_PADRAO = "Olá! Vim pelo site da Frost Térmicas e tenho uma dúvida.";

function inserirBotaoWhatsapp() {
  const link = document.createElement("a");
  link.href = `https://wa.me/${NUMERO_WHATSAPP}?text=${encodeURIComponent(MENSAGEM_PADRAO)}`;
  link.className = "botao-whatsapp";
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  link.setAttribute("aria-label", "Falar no WhatsApp");
  link.textContent = "💬";
  document.body.appendChild(link);
}

document.addEventListener("DOMContentLoaded", inserirBotaoWhatsapp);
