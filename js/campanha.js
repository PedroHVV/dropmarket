/**
 * CAMPANHA DE BLACK FRIDAY (Black November)
 * ------------------------------------------
 * Mostra os banners da campanha enquanto o cupom de CAMPANHA (js/produtos.js)
 * estiver válido. Quando o cupom vence, tudo some sozinho e a barra do topo
 * volta ao texto normal. Nada aqui precisa ser editado: valores, código e
 * data vêm de CUPONS e CAMPANHA em js/produtos.js.
 *
 * Também ativa o cupom automaticamente quando o cliente chega por um link
 * com ?cupom=CODIGO (ex: termicamarket.com.br/?cupom=BLACK10), útil nos anúncios.
 */
(function () {
  if (typeof CAMPANHA === "undefined" || !CAMPANHA.ativa) return;
  if (typeof buscarCupom !== "function") return;

  const cupom = buscarCupom(CAMPANHA.cupom);
  if (!cupom) return;

  const CHAVE = "loja_cupom";

  function escHtml(texto) {
    return String(texto == null ? "" : texto)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }

  function salvarCupom(codigo) {
    try { localStorage.setItem(CHAVE, codigo); } catch (e) { /* ignora */ }
  }

  function cupomJaAtivo() {
    try { return (localStorage.getItem(CHAVE) || "").toUpperCase() === cupom.codigo; } catch (e) { return false; }
  }

  // Cupom vindo do link do anúncio
  try {
    const doLink = new URLSearchParams(window.location.search).get("cupom");
    if (doLink && buscarCupom(doLink)) salvarCupom(doLink.trim().toUpperCase());
  } catch (e) { /* ignora */ }

  function textoPrazo() {
    const fim = Date.parse(CUPONS[cupom.codigo].validoAte);
    const dias = Math.ceil((fim - Date.now()) / 86400000);
    if (dias <= 1) return "Último dia!";
    return `Termina em ${dias} dias`;
  }

  const codigo = escHtml(cupom.codigo);
  const pct = cupom.percentual;
  const nome = escHtml(CAMPANHA.nome || "Black Friday");
  const fim = escHtml(CAMPANHA.fim || "");

  function textoBotao() {
    return cupomJaAtivo() ? "Cupom ativado ✓" : "Ativar cupom";
  }

  function avisar(mensagem) {
    let aviso = document.querySelector(".aviso-campanha");
    if (!aviso) {
      aviso = document.createElement("div");
      aviso.className = "aviso-campanha";
      aviso.setAttribute("role", "status");
      document.body.appendChild(aviso);
    }
    aviso.textContent = mensagem;
    aviso.classList.add("visivel");
    clearTimeout(avisar.t);
    avisar.t = setTimeout(() => aviso.classList.remove("visivel"), 3800);
  }

  function ativar() {
    salvarCupom(cupom.codigo);
    document.querySelectorAll("[data-ativar-cupom]").forEach((b) => {
      b.textContent = textoBotao();
      b.classList.add("ativado");
    });
    avisar(`Cupom ${cupom.codigo} ativado! O desconto de ${pct}% aparece no carrinho.`);
  }

  function lateralHtml(lado, imagem) {
    return `
      <aside class="banner-lateral banner-${lado}" aria-label="${nome}: ${pct}% de desconto">
        <p class="bl-selo">${nome.toUpperCase()}</p>
        <p class="bl-pct">${pct}%<span>OFF</span></p>
        <p class="bl-sub">em todo o site</p>
        <img src="${imagem}" alt="" class="bl-foto" loading="lazy" />
        <p class="bl-rotulo">use o cupom</p>
        <p class="bl-cupom">${codigo}</p>
        <button type="button" class="bl-botao" data-ativar-cupom>${textoBotao()}</button>
        <p class="bl-prazo">${textoPrazo()}<br>até ${fim}</p>
      </aside>`;
  }

  function faixaHtml() {
    return `
      <section class="faixa-black" aria-label="${nome}">
        <div class="fb-texto">
          <p class="fb-selo">🖤 ${nome.toUpperCase()}</p>
          <p class="fb-titulo"><strong>${pct}% OFF</strong> em todo o site com o cupom <span class="fb-cupom">${codigo}</span></p>
          <p class="fb-prazo">${textoPrazo()} · válido até ${fim}</p>
        </div>
        <button type="button" class="fb-botao" data-ativar-cupom>${textoBotao()}</button>
      </section>`;
  }

  document.addEventListener("DOMContentLoaded", () => {
    // Barra do topo
    const barra = document.querySelector(".barra-promo");
    if (barra) {
      barra.classList.add("barra-black");
      barra.innerHTML = `🖤 <strong>${nome.toUpperCase()}</strong> · ${pct}% OFF em tudo com o cupom <strong>${codigo}</strong> · até ${fim}`;
    }

    // Banners só nas páginas de produtos
    const grade = document.getElementById("grade-produtos");
    if (!grade) return;

    const hero = document.querySelector(".hero-carrossel");
    const ancora = hero || document.getElementById("nav-tamanhos") || grade;
    ancora.insertAdjacentHTML(hero ? "afterend" : "beforebegin", faixaHtml());

    document.body.insertAdjacentHTML("beforeend",
      lateralHtml("esquerda", "img/banner-lilas.jpg") +
      lateralHtml("direita", "img/banner-verde.jpg"));

    document.querySelectorAll("[data-ativar-cupom]").forEach((b) => {
      if (cupomJaAtivo()) b.classList.add("ativado");
      b.addEventListener("click", ativar);
    });
  });
})();
