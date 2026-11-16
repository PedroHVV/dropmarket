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
const NUMERO_WHATSAPP = "5512936328681"; // (12) 93632-8681
const MENSAGEM_PADRAO = "Olá! Vim pelo site da Térmica Market e tenho uma dúvida.";

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

const MENSAGEM_GRAVACAO = "Olá! Vim pelo site da Térmica Market e quero a gravação a laser (+R$ 15) em uma garrafa/copo.";

// Links "Quero personalizar" (qualquer elemento com data-whatsapp-gravacao)
function preencherLinksGravacao() {
  document.querySelectorAll("[data-whatsapp-gravacao]").forEach((a) => {
    a.href = `https://wa.me/${NUMERO_WHATSAPP}?text=${encodeURIComponent(MENSAGEM_GRAVACAO)}`;
  });
}

document.addEventListener("DOMContentLoaded", () => {
  inserirBotaoWhatsapp();
  preencherLinksGravacao();
});
