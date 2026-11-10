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
  const modelos = {};
  PRODUTOS.forEach((p) => {
    if (!p.tamanho) return;
    if (!modelos[p.tamanho]) modelos[p.tamanho] = new Set();
    modelos[p.tamanho].add(p.grupo || p.id);
  });
  return Object.keys(modelos)
    .sort((a, b) => tamanhoEmMl(a) - tamanhoEmMl(b))
    .map((tamanho) => ({ tamanho, quantidade: modelos[tamanho].size }));
}

function linkTamanho(tamanho) {
  return `tamanho.html?tamanho=${encodeURIComponent(tamanho)}`;
}

/** Linha "R$ X com o cupom" enquanto a campanha estiver ativa. */
function linhaCupomHtml(produto) {
  if (typeof CAMPANHA === "undefined" || !CAMPANHA.ativa || typeof buscarCupom !== "function") return "";
  const cupom = buscarCupom(CAMPANHA.cupom);
  if (!cupom) return "";
  return `<p class="preco-cupom"><strong>${formatarPreco(precoComCupom(produto.preco, cupom))}</strong> com o cupom <span class="tag-cupom">${esc(cupom.codigo)}</span></p>`;
}

/** Desconto em % entre o preço antigo (precoDe) e o preço de venda, ou 0. */
function descontoDoProduto(produto) {
  if (!produto.precoDe || produto.precoDe <= produto.preco) return 0;
  return Math.round((1 - produto.preco / produto.precoDe) * 100);
}

/** Miniaturas clicáveis (só aparecem se o produto tiver mais de uma foto). */
function miniaturasHtml(produto) {
  const fotos = Array.isArray(produto.imagens) ? produto.imagens : [];
  if (fotos.length < 2) return "";
  return `<div class="miniaturas">` + fotos.map((foto, i) => `
    <button type="button" class="miniatura ${i === 0 ? "ativa" : ""}" data-foto="${esc(foto)}"
            aria-label="Ver foto ${i + 1} de ${fotos.length}">
      <img src="${esc(foto)}" alt="" loading="lazy" />
    </button>`).join("") + `</div>`;
}

/** Junta num só grupo os produtos que são o mesmo modelo em cores diferentes. */
function agruparProdutos(lista) {
  const mapa = new Map();
  lista.forEach((p) => {
    const chave = p.grupo || p.id;
    if (!mapa.has(chave)) mapa.set(chave, []);
    mapa.get(chave).push(p);
  });
  return [...mapa.values()];
}

/** Bolinhas de cor (só aparecem quando o modelo tem mais de uma cor). */
function coresHtml(produto, variantes) {
  if (variantes.length < 2) return "";
  return `
    <div class="seletor-cores">
      <span class="cor-nome">Cor: <strong>${esc(produto.cor || "")}</strong></span>
      <div class="cores">` + variantes.map((v) => {
        const esgotada = typeof v.estoque === "number" && v.estoque <= 0;
        return `<button type="button" class="cor-bolinha ${v.id === produto.id ? "ativa" : ""} ${esgotada ? "esgotada" : ""}"
                  style="--cor: ${esc(v.corHex || "#ccc")}" data-variante="${esc(v.id)}"
                  title="${esc(v.cor || "")}${esgotada ? " (esgotada)" : ""}"
                  aria-label="Cor ${esc(v.cor || "")}${esgotada ? ", esgotada" : ""}" ${esgotada ? "disabled" : ""}></button>`;
      }).join("") + `</div>
    </div>`;
}

function cartaoProdutoHtml(produto, variantes = [produto]) {
  const desconto = descontoDoProduto(produto);
  const etiqueta = desconto > 0
    ? `<span class="etiqueta-desconto">-${desconto}%</span>`
    : "";
  const esgotado = typeof produto.estoque === "number" && produto.estoque <= 0;
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
      ${miniaturasHtml(produto)}
      <div class="info-produto">
        ${coresHtml(produto, variantes)}
        <h3>${esc(produto.nome)}</h3>
        <p class="descricao-produto">${esc(produto.descricao)}</p>
        <p class="preco-produto">${precoAntigo}${formatarPreco(produto.preco)}</p>
        ${linhaCupomHtml(produto)}
        <p class="aviso-pix">Pix: aprovação na hora</p>
        <button class="botao botao-primario" data-adicionar="${esc(produto.id)}" ${esgotado ? "disabled" : ""}>
          ${esgotado ? "Esgotado" : "Adicionar ao carrinho"}
        </button>
      </div>
    </article>
  `;
}

/** Liga os cliques de um cartão: miniaturas, bolinhas de cor e botão de comprar. */
function vincularCartao(cartao, variantes) {
  cartao.querySelectorAll(".miniatura").forEach((mini) => {
    mini.addEventListener("click", () => {
      cartao.querySelector(".imagem-produto").src = mini.dataset.foto;
      cartao.querySelectorAll(".miniatura").forEach((m) => m.classList.toggle("ativa", m === mini));
    });
  });

  cartao.querySelectorAll(".cor-bolinha").forEach((bolinha) => {
    bolinha.addEventListener("click", () => {
      const nova = variantes.find((v) => v.id === bolinha.dataset.variante);
      if (!nova) return;
      const molde = document.createElement("div");
      molde.innerHTML = cartaoProdutoHtml(nova, variantes).trim();
      const novoCartao = molde.firstElementChild;
      cartao.replaceWith(novoCartao);
      vincularCartao(novoCartao, variantes);
    });
  });

  const botao = cartao.querySelector("[data-adicionar]");
  if (botao) {
    botao.addEventListener("click", () => {
      adicionarAoCarrinho(botao.dataset.adicionar, 1);
      botao.textContent = "Adicionado! ✓";
      setTimeout(() => (botao.textContent = "Adicionar ao carrinho"), 1200);
    });
  }
}

function renderizarGrade(lista) {
  const grade = document.getElementById("grade-produtos");
  if (!grade) return;

  const grupos = agruparProdutos(lista).map((variantes) => ({
    variantes,
    // abre na primeira cor que ainda tem estoque
    inicial: variantes.find((v) => !(typeof v.estoque === "number" && v.estoque <= 0)) || variantes[0]
  }));

  grade.innerHTML = grupos.map((g) => cartaoProdutoHtml(g.inicial, g.variantes)).join("");
  grade.querySelectorAll(".cartao-produto").forEach((cartao, i) => vincularCartao(cartao, grupos[i].variantes));
}

/**
 * Banner da página inicial: um slide para cada produto que tenha o campo
 * "banner" em produtos.js, com nome, preço e botão para a página do tamanho.
 */
function renderizarBanner() {
  const carrossel = document.querySelector(".hero-carrossel");
  if (!carrossel) return;
  const lista = PRODUTOS.filter((p) => p.banner);
  if (lista.length === 0) return;

  const slides = lista.map((p, i) => {
    const desconto = descontoDoProduto(p);
    const antigo = desconto > 0 ? `<span class="slide-preco-antigo">${formatarPreco(p.precoDe)}</span>` : "";
    return `
      <div class="slide slide-produtos ${i === 0 ? "ativo" : ""}">
        <div class="slide-conteudo">
          <h1>${esc(p.nome)}</h1>
          <p>${esc(p.descricao)}</p>
          <p class="slide-preco">${antigo}<strong>${formatarPreco(p.preco)}</strong></p>
          <a href="${linkTamanho(p.tamanho)}" class="botao-hero">Ver ${esc(p.tamanho)}</a>
        </div>
        <div class="slide-fotos foto-unica">
          <img src="${esc(p.banner)}" alt="${esc(p.nome)}" ${i === 0 ? "" : 'loading="lazy"'} />
        </div>
      </div>`;
  }).join("");

  const pontos = lista.map((p, i) =>
    `<button class="ponto ${i === 0 ? "ativo" : ""}" aria-label="Ir para ${esc(p.nome)}"></button>`
  ).join("");

  carrossel.innerHTML = slides + `<div class="pontos-carrossel">${pontos}</div>`;
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
    renderizarBanner();
    renderizarTamanhosHome();
    renderizarGrade(PRODUTOS);
  }
});
