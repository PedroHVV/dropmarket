/**
 * Renderiza a grade de produtos na página inicial (index.html)
 */

function renderizarCatalogo() {
  const grade = document.getElementById("grade-produtos");
  if (!grade) return;

  grade.innerHTML = PRODUTOS.map((produto) => `
    <article class="cartao-produto">
      <img src="${produto.imagem}" alt="${produto.nome}" class="imagem-produto" loading="lazy" />
      <div class="info-produto">
        <h3>${produto.nome}</h3>
        <p class="descricao-produto">${produto.descricao}</p>
        <p class="preco-produto">${formatarPreco(produto.preco)}</p>
        <button class="botao botao-primario" data-adicionar="${produto.id}">
          Adicionar ao carrinho
        </button>
      </div>
    </article>
  `).join("");

  grade.querySelectorAll("[data-adicionar]").forEach((botao) => {
    botao.addEventListener("click", () => {
      adicionarAoCarrinho(botao.dataset.adicionar, 1);
      botao.textContent = "Adicionado! ✓";
      setTimeout(() => (botao.textContent = "Adicionar ao carrinho"), 1200);
    });
  });
}

document.addEventListener("DOMContentLoaded", renderizarCatalogo);
