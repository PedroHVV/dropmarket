/**
 * CAMPANHA DE BLACK FRIDAY (Black November)
 * ------------------------------------------
 * Mostra os banners da campanha enquanto a promoção estiver valendo (até
 * PROMOCAO_ATE, em js/produtos.js). Passou a data, tudo some sozinho e a
 * barra do topo volta ao texto normal.
 *
 * Não usa cupom: os preços da promoção já aparecem direto nos produtos
 * (preço normal riscado e preço da promoção). O "até X% OFF" dos banners é
 * calculado sozinho a partir do maior desconto entre os produtos.
 */
(function () {
  if (typeof CAMPANHA === "undefined" || !CAMPANHA.ativa) return;
  if (typeof promocaoAtiva !== "function" || !promocaoAtiva()) return;

  function escHtml(texto) {
    return String(texto == null ? "" : texto)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }

  function maiorDesconto() {
    let maior = 0;
    PRODUTOS.forEach((p) => {
      if (p.precoDe && p.precoDe > p.preco) {
        maior = Math.max(maior, Math.round((1 - p.preco / p.precoDe) * 100));
      }
    });
    return maior;
  }

  function textoPrazo() {
    const fim = Date.parse(PROMOCAO_ATE);
    const dias = Math.ceil((fim - Date.now()) / 86400000);
    if (dias <= 1) return "Último dia!";
    return `Termina em ${dias} dias`;
  }

  const pct = maiorDesconto();
  if (pct <= 0) return;
  const nome = escHtml(CAMPANHA.nome || "Black Friday");
  const fim = escHtml(CAMPANHA.fim || "");

  function lateralHtml(lado) {
    return `
      <aside class="banner-lateral banner-${lado}" aria-label="${nome}: até ${pct}% de desconto">
        <p class="bl-selo">${nome.toUpperCase()}</p>
        <p class="bl-rotulo">até</p>
        <p class="bl-pct">${pct}%<span>OFF</span></p>
        <p class="bl-sub">em garrafas e copos</p>
        <span class="bl-divisor" aria-hidden="true"></span>
        <p class="bl-rotulo">preços especiais</p>
        <a class="bl-botao" href="#grade-produtos">Ver ofertas</a>
        <p class="bl-prazo">${textoPrazo()}<br>até ${fim}</p>
      </aside>`;
  }

  function faixaHtml() {
    return `
      <section class="faixa-black" aria-label="${nome}">
        <div class="fb-texto">
          <p class="fb-selo">🖤 ${nome.toUpperCase()}</p>
          <p class="fb-titulo"><strong>Até ${pct}% OFF</strong> em garrafas e copos térmicos</p>
          <p class="fb-prazo">${textoPrazo()} · válido até ${fim}</p>
        </div>
        <a class="fb-botao" href="#grade-produtos">Ver ofertas</a>
      </section>`;
  }

  document.addEventListener("DOMContentLoaded", () => {
    // Barra do topo
    const barra = document.querySelector(".barra-promo");
    if (barra) {
      barra.classList.add("barra-black");
      barra.innerHTML = `🖤 <strong>${nome.toUpperCase()}</strong> · até ${pct}% OFF em garrafas e copos · até ${fim}`;
    }

    // Banners só nas páginas de produtos
    const grade = document.getElementById("grade-produtos");
    if (!grade) return;

    const hero = document.querySelector(".hero-carrossel");
    const ancora = hero || document.getElementById("nav-tamanhos") || grade;
    ancora.insertAdjacentHTML(hero ? "afterend" : "beforebegin", faixaHtml());

    document.body.insertAdjacentHTML("beforeend",
      lateralHtml("esquerda") +
      lateralHtml("direita"));
  });
})();
