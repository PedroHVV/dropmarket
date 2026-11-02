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
 *   imagem    -> caminho da imagem principal (coloque os arquivos na pasta /img)
 *   grupo     -> (opcional) produtos com o mesmo "grupo" aparecem num único cartão,
 *                com bolinhas para escolher a cor. Cada cor é um produto próprio
 *                (id, estoque e fotos próprios) e usa também "cor" e "corHex".
 *   banner    -> (opcional) foto do produto no banner da página inicial. Cada produto
 *                com este campo ganha o seu próprio banner, com nome, preço e botão.
 *   imagens   -> (opcional) lista com todas as fotos do produto, a primeira é a
 *                principal. Quando tem mais de uma, aparecem miniaturas no cartão.
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
    banner: "img/banner-verde.jpg",
    imagens: ["img/garrafa-cafe-500ml-verde.jpg", "img/garrafa-cafe-500ml-verde-2.jpg", "img/garrafa-cafe-500ml-verde-3.jpg"],
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
    banner: "img/banner-lilas.jpg",
    imagens: ["img/garrafa-alca-1200ml-lilas.jpg", "img/garrafa-alca-1200ml-lilas-2.jpg", "img/garrafa-alca-1200ml-lilas-3.jpg"],
    descricao: "Garrafa térmica de 1,2L na cor lilás, com alça para carregar. Mede 26 cm de altura e pesa 550 g.",
    estoque: 5
  },
  {
    id: "prod-003-vermelho",
    grupo: "long-neck-400",
    cor: "Vermelho",
    corHex: "#c03645",
    tamanho: "400ml",
    nome: "Copo Porta Long Neck 400ml (2 tampas) – Vermelho",
    precoDe: 99.90,
    preco: 79.90,
    imagem: "img/copo-long-neck-400ml-vermelho.jpg",
    banner: "img/banner-copo.jpg",
    imagens: ["img/copo-long-neck-400ml-vermelho.jpg", "img/copo-long-neck-400ml-vermelho-2.jpg"],
    descricao: "Copo térmico de 400ml com dois tipos de tampa. Cor: Vermelho. Mede 14 cm de altura e pesa 200 g.",
    estoque: 5
  },
  {
    id: "prod-003-pink",
    grupo: "long-neck-400",
    cor: "Pink",
    corHex: "#e7567f",
    tamanho: "400ml",
    nome: "Copo Porta Long Neck 400ml (2 tampas) – Pink",
    precoDe: 99.90,
    preco: 79.90,
    imagem: "img/copo-long-neck-400ml-pink.jpg",
    imagens: ["img/copo-long-neck-400ml-pink.jpg", "img/copo-long-neck-400ml-pink-2.jpg"],
    descricao: "Copo térmico de 400ml com dois tipos de tampa. Cor: Pink. Mede 14 cm de altura e pesa 200 g.",
    estoque: 5
  },
  {
    id: "prod-003-verde-militar",
    grupo: "long-neck-400",
    cor: "Verde militar",
    corHex: "#616241",
    tamanho: "400ml",
    nome: "Copo Porta Long Neck 400ml (2 tampas) – Verde militar",
    precoDe: 99.90,
    preco: 79.90,
    imagem: "img/copo-long-neck-400ml-verde-militar.jpg",
    imagens: ["img/copo-long-neck-400ml-verde-militar.jpg", "img/copo-long-neck-400ml-verde-militar-2.jpg"],
    descricao: "Copo térmico de 400ml com dois tipos de tampa. Cor: Verde militar. Mede 14 cm de altura e pesa 200 g.",
    estoque: 5
  },
  {
    id: "prod-003-laranja",
    grupo: "long-neck-400",
    cor: "Laranja",
    corHex: "#e97325",
    tamanho: "400ml",
    nome: "Copo Porta Long Neck 400ml (2 tampas) – Laranja",
    precoDe: 99.90,
    preco: 79.90,
    imagem: "img/copo-long-neck-400ml-laranja.jpg",
    imagens: ["img/copo-long-neck-400ml-laranja.jpg", "img/copo-long-neck-400ml-laranja-2.jpg"],
    descricao: "Copo térmico de 400ml com dois tipos de tampa. Cor: Laranja. Mede 14 cm de altura e pesa 200 g.",
    estoque: 5
  },
  {
    id: "prod-003-rosa-claro",
    grupo: "long-neck-400",
    cor: "Rosa claro",
    corHex: "#e59fc0",
    tamanho: "400ml",
    nome: "Copo Porta Long Neck 400ml (2 tampas) – Rosa claro",
    precoDe: 99.90,
    preco: 79.90,
    imagem: "img/copo-long-neck-400ml-rosa-claro.jpg",
    imagens: ["img/copo-long-neck-400ml-rosa-claro.jpg", "img/copo-long-neck-400ml-rosa-claro-2.jpg"],
    descricao: "Copo térmico de 400ml com dois tipos de tampa. Cor: Rosa claro. Mede 14 cm de altura e pesa 200 g.",
    estoque: 5
  },
  {
    id: "prod-003-azul-royal",
    grupo: "long-neck-400",
    cor: "Azul royal",
    corHex: "#2451b7",
    tamanho: "400ml",
    nome: "Copo Porta Long Neck 400ml (2 tampas) – Azul royal",
    precoDe: 99.90,
    preco: 79.90,
    imagem: "img/copo-long-neck-400ml-azul-royal.jpg",
    imagens: ["img/copo-long-neck-400ml-azul-royal.jpg", "img/copo-long-neck-400ml-azul-royal-2.jpg"],
    descricao: "Copo térmico de 400ml com dois tipos de tampa. Cor: Azul royal. Mede 14 cm de altura e pesa 200 g.",
    estoque: 5
  },
  {
    id: "prod-003-verde",
    grupo: "long-neck-400",
    cor: "Verde",
    corHex: "#327754",
    tamanho: "400ml",
    nome: "Copo Porta Long Neck 400ml (2 tampas) – Verde",
    precoDe: 99.90,
    preco: 79.90,
    imagem: "img/copo-long-neck-400ml-verde.jpg",
    imagens: ["img/copo-long-neck-400ml-verde.jpg", "img/copo-long-neck-400ml-verde-2.jpg"],
    descricao: "Copo térmico de 400ml com dois tipos de tampa. Cor: Verde. Mede 14 cm de altura e pesa 200 g.",
    estoque: 5
  },
  {
    id: "prod-005-branca",
    grupo: "inox-750",
    cor: "Branca",
    corHex: "#f2f3f5",
    tamanho: "750ml",
    nome: "Garrafa Térmica Inox 750ml – Branca",
    precoDe: 129.90,
    preco: 99.90,
    imagem: "img/garrafa-inox-750ml-branca.jpg",
    banner: "img/banner-inox.jpg",
    descricao: "Garrafa térmica de inox com 750ml. Cor: Branca. Mede 26 cm de altura e pesa 300 g.",
    estoque: 5
  },
  {
    id: "prod-005-preta",
    grupo: "inox-750",
    cor: "Preta",
    corHex: "#1f2024",
    tamanho: "750ml",
    nome: "Garrafa Térmica Inox 750ml – Preta",
    precoDe: 129.90,
    preco: 99.90,
    imagem: "img/garrafa-inox-750ml-preta.jpg",
    descricao: "Garrafa térmica de inox com 750ml. Cor: Preta. Mede 26 cm de altura e pesa 300 g.",
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
