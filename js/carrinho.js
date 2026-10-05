/**
 * LÓGICA DO CARRINHO
 * -------------------
 * O carrinho fica salvo no navegador do cliente (localStorage),
 * então cada visitante tem o seu próprio carrinho.
 */

const CHAVE_CARRINHO = "loja_carrinho";

function obterCarrinho() {
  const dados = localStorage.getItem(CHAVE_CARRINHO);
  return dados ? JSON.parse(dados) : [];
}

function salvarCarrinho(carrinho) {
  localStorage.setItem(CHAVE_CARRINHO, JSON.stringify(carrinho));
  atualizarContadorCarrinho();
}

function adicionarAoCarrinho(idProduto, quantidade = 1) {
  const produto = PRODUTOS.find((p) => p.id === idProduto);
  if (!produto) return;

  const carrinho = obterCarrinho();
  const itemExistente = carrinho.find((item) => item.id === idProduto);

  if (itemExistente) {
    itemExistente.quantidade += quantidade;
  } else {
    carrinho.push({
      id: produto.id,
      nome: produto.nome,
      preco: produto.preco,
      imagem: produto.imagem,
      quantidade: quantidade
    });
  }

  salvarCarrinho(carrinho);
}

function removerDoCarrinho(idProduto) {
  let carrinho = obterCarrinho();
  carrinho = carrinho.filter((item) => item.id !== idProduto);
  salvarCarrinho(carrinho);
}

function alterarQuantidade(idProduto, novaQuantidade) {
  const carrinho = obterCarrinho();
  const item = carrinho.find((i) => i.id === idProduto);
  if (!item) return;

  if (novaQuantidade <= 0) {
    removerDoCarrinho(idProduto);
    return;
  }

  item.quantidade = novaQuantidade;
  salvarCarrinho(carrinho);
}

function esvaziarCarrinho() {
  localStorage.removeItem(CHAVE_CARRINHO);
  atualizarContadorCarrinho();
}

function calcularTotalCarrinho() {
  return obterCarrinho().reduce((total, item) => total + item.preco * item.quantidade, 0);
}

function contarItensCarrinho() {
  return obterCarrinho().reduce((total, item) => total + item.quantidade, 0);
}

function formatarPreco(valor) {
  return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function atualizarContadorCarrinho() {
  const contador = document.querySelector("[data-contador-carrinho]");
  if (contador) {
    contador.textContent = contarItensCarrinho();
  }
}

document.addEventListener("DOMContentLoaded", atualizarContadorCarrinho);
