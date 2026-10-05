/**
 * LISTA DE PRODUTOS
 * ------------------
 * Edite este arquivo para colocar as suas garrafas/copos térmicos de
 * verdade (os que vier escolher no fornecedor de dropshipping).
 * Cada produto precisa de:
 *   id        -> um código único (não repita entre produtos)
 *   nome      -> nome do produto
 *   preco     -> preço em reais, usando ponto para centavos (ex: 119.90)
 *   imagem    -> caminho da imagem (coloque os arquivos na pasta /img)
 *   descricao -> texto curto explicando o produto
 *   estoque   -> quantidade disponível (opcional, deixe 999 se não for controlar)
 */

const PRODUTOS = [
  {
    id: "prod-001",
    nome: "Garrafa Térmica 1L",
    preco: 119.90,
    imagem: "img/garrafa-1l.svg",
    descricao: "Mantém a temperatura por horas. Aço inox, à prova de vazamento.",
    estoque: 30
  },
  {
    id: "prod-002",
    nome: "Copo Térmico com Alça 890ml",
    preco: 99.90,
    imagem: "img/copo-alca-890ml.svg",
    descricao: "Com alça e canudo, ideal pra levar pra qualquer lugar.",
    estoque: 30
  },
  {
    id: "prod-003",
    nome: "Garrafa Térmica 500ml",
    preco: 79.90,
    imagem: "img/garrafa-500ml.svg",
    descricao: "Tamanho compacto, perfeita pra bolsa ou mochila do dia a dia.",
    estoque: 30
  },
  {
    id: "prod-004",
    nome: "Garrafa Infantil 350ml",
    preco: 69.90,
    imagem: "img/garrafa-infantil-350ml.svg",
    descricao: "Leve, com mosquetão, pensada pras crianças.",
    estoque: 30
  }
];
