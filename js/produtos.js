/**
 * LISTA DE PRODUTOS
 * ------------------
 * Edite este arquivo para colocar as suas garrafas/copos térmicos de
 * verdade (os que vier escolher no fornecedor de dropshipping).
 * Cada produto precisa de:
 *   id        -> um código único (não repita entre produtos)
 *   nome      -> nome do produto
 *   tamanho   -> tamanho/capacidade, ex: "500ml" ou "1L" (agrupa os produtos
 *                nas páginas de tamanho; escreva igual nos produtos do mesmo tamanho)
 *   preco     -> preço de venda em reais, usando ponto para centavos (ex: 119.90)
 *   precoDe   -> (opcional) preço antigo, que aparece riscado com a etiqueta de
 *                desconto. Só use se for um preço real que você já praticou ou
 *                que dá para comprovar. Apague a linha para mostrar só o preço.
 *   imagem    -> caminho da imagem (coloque os arquivos na pasta /img)
 *   descricao -> texto curto explicando o produto
 *   estoque   -> quantidade disponível (opcional, deixe 999 se não for controlar)
 */

const PRODUTOS = [
  {
    id: "prod-001",
    tamanho: "500ml",
    nome: "Garrafa Térmica de Café 500ml – Verde",
    precoDe: 109.90,
    preco: 79.90,
    imagem: "img/garrafa-cafe-500ml-verde.jpg",
    descricao: "Garrafa térmica de café com 500ml, na cor verde. Mede 22 cm de altura e pesa 250 g.",
    estoque: 5
  },
  {
    id: "prod-002",
    tamanho: "1,2L",
    nome: "Garrafa Térmica com Alça 1,2L – Lilás",
    precoDe: 179.90,
    preco: 129.90,
    imagem: "img/garrafa-alca-1200ml-lilas.jpg",
    descricao: "Garrafa térmica de 1,2L na cor lilás, com alça para carregar. Mede 26 cm de altura e pesa 550 g.",
    estoque: 5
  },
  {
    id: "prod-003",
    tamanho: "400ml",
    nome: "Copo Porta Long Neck 400ml (2 tampas) – Rosa",
    precoDe: 99.90,
    preco: 79.90,
    imagem: "img/copo-long-neck-400ml-rosa.jpg",
    descricao: "Copo térmico de 400ml na cor rosa, com dois tipos de tampa. Mede 14 cm de altura e pesa 200 g.",
    estoque: 5
  },
  {
    id: "prod-005",
    tamanho: "750ml",
    nome: "Garrafa Térmica Inox 750ml – Branca",
    precoDe: 129.90,
    preco: 99.90,
    imagem: "img/garrafa-inox-750ml-branca.jpg",
    descricao: "Garrafa térmica de inox com 750ml, na cor branca. Mede 26 cm de altura e pesa 300 g.",
    estoque: 5
  }
];

/**
 * FRETE
 * -----
 * Valor fixo cobrado em todo pedido. Ajuste conforme o que o seu
 * fornecedor cobra de frete (ou embuta o frete no preço do produto e
 * deixe FRETE_FIXO = 0).
 *   FRETE_FIXO          -> valor do frete em reais (ex: 19.90)
 *   FRETE_GRATIS_ACIMA  -> pedidos a partir desse valor têm frete grátis
 *                          (use 0 para desativar o frete grátis)
 */
const FRETE_FIXO = 19.90;
const FRETE_GRATIS_ACIMA = 199.00;

// Permite que as funções em /api usem esta mesma lista (preços confiáveis).
// No navegador, "module" não existe e esta linha é ignorada.
if (typeof module !== "undefined" && module.exports) {
  module.exports = { PRODUTOS, FRETE_FIXO, FRETE_GRATIS_ACIMA };
}
