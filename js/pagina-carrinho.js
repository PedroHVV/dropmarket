/**
 * Renderiza o conteúdo da página do carrinho (carrinho.html)
 * e cuida do botão de finalizar compra (checkout).
 */

function renderizarCarrinho() {
  const container = document.getElementById("conteudo-carrinho");
  if (!container) return;

  const carrinho = obterCarrinho();

  if (carrinho.length === 0) {
    container.innerHTML = `
      <div class="carrinho-vazio">
        <p>Seu carrinho está vazio.</p>
        <a href="index.html" class="botao botao-primario">Ver produtos</a>
      </div>
    `;
    return;
  }

  const linhas = carrinho.map((item) => `
    <div class="item-carrinho" data-id="${item.id}">
      <img src="${item.imagem}" alt="${item.nome}" class="imagem-item" />
      <div class="detalhes-item">
        <h3>${item.nome}</h3>
        <p>${formatarPreco(item.preco)} cada</p>
      </div>
      <div class="controle-quantidade">
        <button class="botao-quantidade" data-diminuir="${item.id}">−</button>
        <span>${item.quantidade}</span>
        <button class="botao-quantidade" data-aumentar="${item.id}">+</button>
      </div>
      <p class="subtotal-item">${formatarPreco(item.preco * item.quantidade)}</p>
      <button class="botao-remover" data-remover="${item.id}" aria-label="Remover item">✕</button>
    </div>
  `).join("");

  container.innerHTML = `
    <div class="lista-carrinho">${linhas}</div>
    <div class="resumo-carrinho">
      <p class="total-carrinho">Total: <strong>${formatarPreco(calcularTotalCarrinho())}</strong></p>
      <button id="botao-checkout" class="botao botao-primario botao-checkout">
        Finalizar compra
      </button>
      <p id="mensagem-checkout" class="mensagem-checkout"></p>
    </div>
  `;

  container.querySelectorAll("[data-aumentar]").forEach((botao) => {
    botao.addEventListener("click", () => {
      const carrinhoAtual = obterCarrinho();
      const item = carrinhoAtual.find((i) => i.id === botao.dataset.aumentar);
      alterarQuantidade(item.id, item.quantidade + 1);
      renderizarCarrinho();
    });
  });

  container.querySelectorAll("[data-diminuir]").forEach((botao) => {
    botao.addEventListener("click", () => {
      const carrinhoAtual = obterCarrinho();
      const item = carrinhoAtual.find((i) => i.id === botao.dataset.diminuir);
      alterarQuantidade(item.id, item.quantidade - 1);
      renderizarCarrinho();
    });
  });

  container.querySelectorAll("[data-remover]").forEach((botao) => {
    botao.addEventListener("click", () => {
      removerDoCarrinho(botao.dataset.remover);
      renderizarCarrinho();
    });
  });

  document.getElementById("botao-checkout").addEventListener("click", iniciarCheckout);
}

async function iniciarCheckout() {
  const botao = document.getElementById("botao-checkout");
  const mensagem = document.getElementById("mensagem-checkout");
  const carrinho = obterCarrinho();

  if (carrinho.length === 0) return;

  botao.disabled = true;
  botao.textContent = "Processando...";
  mensagem.textContent = "";

  try {
    const resposta = await fetch("/api/criar-preferencia", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ itens: carrinho })
    });

    if (!resposta.ok) {
      throw new Error("Falha ao criar pagamento");
    }

    const dados = await resposta.json();

    if (dados.init_point) {
      // Redireciona o cliente para a página de pagamento do Mercado Pago
      window.location.href = dados.init_point;
    } else {
      throw new Error("Não recebemos o link de pagamento");
    }
  } catch (erro) {
    console.error(erro);
    mensagem.textContent =
      "Não foi possível iniciar o pagamento agora. Tente novamente em instantes.";
    botao.disabled = false;
    botao.textContent = "Finalizar compra";
  }
}

document.addEventListener("DOMContentLoaded", renderizarCarrinho);
