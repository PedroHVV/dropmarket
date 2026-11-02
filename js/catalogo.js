/**
 * Catálogo da loja:
 *  - index.html: seção "Compre por tamanho" + grade com todos os produtos
 *  - tamanho.html?tamanho=500ml: só os produtos daquele tamanho
 *
 * Os tamanhos aparecem sozinhos a partir do campo "tamanho" de cada
 * produto em js/produtos.js. Não precisa criar página nova por tamanho.
 */

function esc(texto) {
  return String(texto == null ? "" : texto)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** "500ml" -> 500, "1L" -> 1000 (usado para ordenar do menor para o maior). */
function tamanhoEmMl(tamanho) {
  const m = String(tamanho || "").toLowerCase().replace(",", ".").match(/([\d.]+)\s*(ml|l)/);
  if (!m) return Number.MAX_SAFE_INTEGER;
  return m[2] === "l" ? parseFloat(m[1]) * 1000 : parseFloat(m[1]);
}

/** Lista de tamanhos existentes: [{ tamanho: "500ml", quantidade: 2 }, ...] */
function listarTamanhos() {
  const contagem = {};
  PRODUTOS.forEach((p) => {
    if (!p.tamanho) return;
    contagem[p.tamanho] = (contagem[p.tamanho] || 0) + 1;
  });
  return Object.keys(contagem)
    .sort((a, b) => tamanhoEmMl(a) - tamanhoEmMl(b))
    .map((tamanho) => ({ tamanho, quantidade: contagem[tamanho] }));
}

function linkTamanho(tamanho) {
  return `tamanho.html?tamanho=${encodeURIComponent(tamanho)}`;
}

/** Desconto em % entre o preço antigo (precoDe) e o preço de venda, ou 0. */
function descontoDoProduto(produto) {
  if (!produto.precoDe || produto.precoDe <= produto.preco) return 0;
  return Math.round((1 - produto.preco / produto.precoDe) * 100);
}

function cartaoProdutoHtml(produto) {
  const desconto = descontoDoProduto(produto);
  const etiqueta = desconto > 0
    ? `<span class="etiqueta-desconto">-${desconto}%</span>`
    : "";
  const poucas = typeof produto.estoque === "number" && produto.estoque > 0 && produto.estoque <= 5
    ? `<span class="etiqueta-estoque">Poucas unidades</span>`
    : "";
  const precoAntigo = desconto > 0
    ? `<span class="preco-antigo">${formatarPreco(produto.precoDe)}</span>`
    : "";

  return `
    <article class="cartao-produto">
      <div class="area-imagem">
        ${etiqueta}
        ${poucas}
        <img src="${esc(produto.imagem)}" alt="${esc(produto.nome)}" class="imagem-produto" loading="lazy" />
      </div>
      <div class="info-produto">
        <h3>${esc(produto.nome)}</h3>
        <p class="descricao-produto">${esc(produto.descricao)}</p>
        <p class="preco-produto">${precoAntigo}${formatarPreco(produto.preco)}</p>
        <p class="aviso-pix">Pix: aprovação na hora</p>
        <button class="botao botao-primario" data-adicionar="${esc(produto.id)}">
          Adicionar ao carrinho
        </button>
      </div>
    </article>
  `;
}

function renderizarGrade(lista) {
  const grade = document.getElementById("grade-produtos");
  if (!grade) return;

  grade.innerHTML = lista.map(cartaoProdutoHtml).join("");

  grade.querySelectorAll("[data-adicionar]").forEach((botao) => {
    botao.addEventListener("click", () => {
      adicionarAoCarrinho(botao.dataset.adicionar, 1);
      botao.textContent = "Adicionado! ✓";
      setTimeout(() => (botao.textContent = "Adicionar ao carrinho"), 1200);
    });
  });
}

/** Cartões "Compre por tamanho" da página inicial. */
function renderizarTamanhosHome() {
  const area = document.getElementById("grade-tamanhos");
  if (!area) return;

  const tamanhos = listarTamanhos();
  if (tamanhos.length === 0) {
    area.closest("section").hidden = true;
    return;
  }

  area.innerHTML = tamanhos.map((t) => `
    <a class="cartao-tamanho" href="${linkTamanho(t.tamanho)}">
      <span class="tamanho-valor">${esc(t.tamanho)}</span>
      <span class="tamanho-qtd">${t.quantidade} ${t.quantidade === 1 ? "modelo" : "modelos"}</span>
    </a>
  `).join("");
}

/** Página tamanho.html: filtra os produtos pelo tamanho pedido na URL. */
function renderizarPaginaTamanho() {
  const titulo = document.getElementById("titulo-tamanho");
  if (!titulo) return;

  const tamanhos = listarTamanhos();
  const pedido = (new URLSearchParams(window.location.search).get("tamanho") || "").toLowerCase();
  // Só aceita tamanhos que existem de verdade (evita texto estranho na página).
  const atual = tamanhos.find((t) => t.tamanho.toLowerCase() === pedido);

  const navegacao = document.getElementById("nav-tamanhos");
  if (navegacao) {
    navegacao.innerHTML =
      `<a class="chip-tamanho" href="index.html#grade-produtos">Todos</a>` +
      tamanhos.map((t) => `
        <a class="chip-tamanho ${atual && t.tamanho === atual.tamanho ? "ativo" : ""}"
           href="${linkTamanho(t.tamanho)}">${esc(t.tamanho)}</a>
      `).join("");
  }

  const grade = document.getElementById("grade-produtos");

  if (!atual) {
    titulo.textContent = "Tamanho não encontrado";
    document.title = "Tamanho não encontrado - Térmica Market";
    grade.innerHTML = `
      <div class="carrinho-vazio">
        <p>Não encontramos produtos nesse tamanho.</p>
        <a href="index.html#grade-produtos" class="botao botao-primario">Ver todos os produtos</a>
      </div>`;
    return;
  }

  titulo.textContent = `Térmicas de ${atual.tamanho}`;
  document.title = `Térmicas de ${atual.tamanho} - Térmica Market`;

  renderizarGrade(PRODUTOS.filter((p) => p.tamanho === atual.tamanho));
}

document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("titulo-tamanho")) {
    renderizarPaginaTamanho();
  } else {
    renderizarTamanhosHome();
    renderizarGrade(PRODUTOS);
  }
});
