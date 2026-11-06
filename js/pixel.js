/**
 * PIXEL DA META (Facebook/Instagram)
 * -----------------------------------
 * Registra visitas, itens adicionados ao carrinho, início do pagamento e
 * compras, para os anúncios saberem quem compra. Para trocar de pixel,
 * mude só o número abaixo.
 */
const META_PIXEL_ID = "1934196300894855";

/* Código oficial da Meta (base do pixel) */
!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
document,'script','https://connect.facebook.net/en_US/fbevents.js');

fbq("init", META_PIXEL_ID);
fbq("track", "PageView");

/** Envia um evento ao pixel sem quebrar o site se ele não carregar. */
function rastrearMeta(evento, dados, opcoes) {
  try {
    if (typeof fbq === "function") fbq("track", evento, dados || {}, opcoes || {});
  } catch (e) {
    // bloqueadores de anúncio podem impedir o pixel; o site segue normal
  }
}
