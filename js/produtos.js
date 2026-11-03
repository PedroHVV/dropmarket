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
 *   pesoEnvio -> peso em gramas do produto JÁ EMBALADO para envio (usado no frete)
 */

const PRODUTOS = [
  {
    id: "prod-001",
    grupo: "cafe-500",
    cor: "Verde",
    corHex: "#869990",
    tamanho: "500ml",
    nome: "Kit Garrafa Térmica de Café 500ml + 2 Xícaras – Verde",
    precoDe: 109.90,
    preco: 79.90,
    imagem: "img/garrafa-cafe-500ml-verde.jpg",
    banner: "img/banner-verde.jpg",
    imagens: ["img/garrafa-cafe-500ml-verde.jpg", "img/garrafa-cafe-500ml-verde-2.jpg", "img/garrafa-cafe-500ml-verde-3.jpg"],
    descricao: "Garrafa térmica de café com 500ml e 2 xícaras de inox que encaixam na tampa. Cor: Verde. A garrafa mede 22 cm de altura e pesa 250 g.",
    pesoEnvio: 500,
    estoque: 5
  },
  {
    id: "prod-001-preta",
    grupo: "cafe-500",
    cor: "Preta",
    corHex: "#1f2024",
    tamanho: "500ml",
    nome: "Kit Garrafa Térmica de Café 500ml + 2 Xícaras – Preta",
    precoDe: 109.90,
    preco: 79.90,
    imagem: "img/garrafa-cafe-500ml-preta.jpg",
    imagens: ["img/garrafa-cafe-500ml-preta.jpg", "img/garrafa-cafe-500ml-preta-2.jpg"],
    descricao: "Garrafa térmica de café com 500ml e 2 xícaras de inox que encaixam na tampa. Cor: Preta. A garrafa mede 22 cm de altura e pesa 250 g.",
    pesoEnvio: 500,
    estoque: 5
  },
  {
    id: "prod-001-rosa",
    grupo: "cafe-500",
    cor: "Rosa",
    corHex: "#e8a59a",
    tamanho: "500ml",
    nome: "Kit Garrafa Térmica de Café 500ml + 2 Xícaras – Rosa",
    precoDe: 109.90,
    preco: 79.90,
    imagem: "img/garrafa-cafe-500ml-rosa.jpg",
    imagens: ["img/garrafa-cafe-500ml-rosa.jpg", "img/garrafa-cafe-500ml-rosa-2.jpg"],
    descricao: "Garrafa térmica de café com 500ml e 2 xícaras de inox que encaixam na tampa. Cor: Rosa. A garrafa mede 22 cm de altura e pesa 250 g.",
    pesoEnvio: 500,
    estoque: 5
  },
  {
    id: "prod-001-cinza",
    grupo: "cafe-500",
    cor: "Cinza",
    corHex: "#7d8286",
    tamanho: "500ml",
    nome: "Kit Garrafa Térmica de Café 500ml + 2 Xícaras – Cinza",
    precoDe: 109.90,
    preco: 79.90,
    imagem: "img/garrafa-cafe-500ml-cinza.jpg",
    imagens: ["img/garrafa-cafe-500ml-cinza.jpg", "img/garrafa-cafe-500ml-cinza-2.jpg"],
    descricao: "Garrafa térmica de café com 500ml e 2 xícaras de inox que encaixam na tampa. Cor: Cinza. A garrafa mede 22 cm de altura e pesa 250 g.",
    pesoEnvio: 500,
    estoque: 5
  },
  {
    id: "prod-002",
    grupo: "alca-1200",
    cor: "Lilás",
    corHex: "#b4abc9",
    tamanho: "1,2L",
    nome: "Garrafa Térmica com Alça 1,2L – Lilás",
    precoDe: 179.90,
    preco: 129.90,
    imagem: "img/garrafa-alca-1200ml-lilas.jpg",
    banner: "img/banner-lilas.jpg",
    imagens: ["img/garrafa-alca-1200ml-lilas.jpg", "img/garrafa-alca-1200ml-lilas-2.jpg", "img/garrafa-alca-1200ml-lilas-3.jpg"],
    descricao: "Garrafa térmica de 1,2L com alça para carregar. Cor: Lilás. Mede 26 cm de altura e pesa 550 g.",
    pesoEnvio: 800,
    estoque: 5
  },
  {
    id: "prod-002-preta",
    grupo: "alca-1200",
    cor: "Preta",
    corHex: "#1f2024",
    tamanho: "1,2L",
    nome: "Garrafa Térmica com Alça 1,2L – Preta",
    precoDe: 179.90,
    preco: 129.90,
    imagem: "img/garrafa-alca-1200ml-preta.jpg",
    imagens: ["img/garrafa-alca-1200ml-preta.jpg", "img/garrafa-alca-1200ml-preta-2.jpg", "img/garrafa-alca-1200ml-preta-3.jpg"],
    descricao: "Garrafa térmica de 1,2L com alça para carregar. Cor: Preta. Mede 26 cm de altura e pesa 550 g.",
    pesoEnvio: 800,
    estoque: 5
  },
  {
    id: "prod-002-azul-claro",
    grupo: "alca-1200",
    cor: "Azul claro",
    corHex: "#a9cbe0",
    tamanho: "1,2L",
    nome: "Garrafa Térmica com Alça 1,2L – Azul claro",
    precoDe: 179.90,
    preco: 129.90,
    imagem: "img/garrafa-alca-1200ml-azul-claro.jpg",
    imagens: ["img/garrafa-alca-1200ml-azul-claro.jpg", "img/garrafa-alca-1200ml-azul-claro-2.jpg", "img/garrafa-alca-1200ml-azul-claro-3.jpg"],
    descricao: "Garrafa térmica de 1,2L com alça para carregar. Cor: Azul claro. Mede 26 cm de altura e pesa 550 g.",
    pesoEnvio: 800,
    estoque: 5
  },
  {
    id: "prod-002-bege",
    grupo: "alca-1200",
    cor: "Bege",
    corHex: "#e9d49a",
    tamanho: "1,2L",
    nome: "Garrafa Térmica com Alça 1,2L – Bege",
    precoDe: 179.90,
    preco: 129.90,
    imagem: "img/garrafa-alca-1200ml-bege.jpg",
    imagens: ["img/garrafa-alca-1200ml-bege.jpg", "img/garrafa-alca-1200ml-bege-2.jpg", "img/garrafa-alca-1200ml-bege-3.jpg"],
    descricao: "Garrafa térmica de 1,2L com alça para carregar. Cor: Bege. Mede 26 cm de altura e pesa 550 g.",
    pesoEnvio: 800,
    estoque: 5
  },
  {
    id: "prod-002-rosa",
    grupo: "alca-1200",
    cor: "Rosa",
    corHex: "#ec7f8a",
    tamanho: "1,2L",
    nome: "Garrafa Térmica com Alça 1,2L – Rosa",
    precoDe: 179.90,
    preco: 129.90,
    imagem: "img/garrafa-alca-1200ml-rosa.jpg",
    imagens: ["img/garrafa-alca-1200ml-rosa.jpg", "img/garrafa-alca-1200ml-rosa-2.jpg", "img/garrafa-alca-1200ml-rosa-3.jpg"],
    descricao: "Garrafa térmica de 1,2L com alça para carregar. Cor: Rosa. Mede 26 cm de altura e pesa 550 g.",
    pesoEnvio: 800,
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
    pesoEnvio: 450,
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
    pesoEnvio: 450,
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
    pesoEnvio: 450,
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
    pesoEnvio: 450,
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
    pesoEnvio: 450,
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
    pesoEnvio: 450,
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
    pesoEnvio: 450,
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
    pesoEnvio: 550,
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
    imagens: ["img/garrafa-inox-750ml-preta.jpg", "img/garrafa-inox-750ml-preta-2.jpg"],
    descricao: "Garrafa térmica de inox com 750ml. Cor: Preta. Mede 26 cm de altura e pesa 300 g.",
    pesoEnvio: 550,
    estoque: 5
  },
  {
    id: "prod-005-prata",
    grupo: "inox-750",
    cor: "Prata",
    corHex: "#c9ccd0",
    tamanho: "750ml",
    nome: "Garrafa Térmica Inox 750ml – Prata",
    precoDe: 129.90,
    preco: 99.90,
    imagem: "img/garrafa-inox-750ml-prata.jpg",
    imagens: ["img/garrafa-inox-750ml-prata.jpg", "img/garrafa-inox-750ml-prata-2.jpg"],
    descricao: "Garrafa térmica de inox com 750ml. Cor: Prata. Mede 26 cm de altura e pesa 300 g.",
    pesoEnvio: 550,
    estoque: 5
  }
];

/**
 * FRETE POR REGIÃO E PESO
 * ------------------------
 * O frete depende do CEP do cliente (que define a região) e do peso total
 * do pedido (soma de pesoEnvio de cada item). O mesmo código roda no
 * carrinho e no servidor, então os dois sempre chegam no mesmo valor.
 *
 * ATENÇÃO: os valores abaixo são ESTIMATIVAS, ainda não conferidas.
 * Antes de vender, simule no Melhor Envio (saindo de Goiânia) o envio de uma
 * caixa para um CEP de cada região e ajuste a tabela com o que você pagaria.
 *
 *   FRETE_GRATIS_ACIMA  -> pedidos a partir desse valor têm frete grátis
 *                          (use 0 para desativar)
 *   FRETE_GRATIS_REGIOES-> em quais regiões o frete grátis vale
 *   FRETE_FAIXAS_G      -> limites de peso (gramas) das colunas da tabela
 *   FRETE_TABELA        -> preço de cada região para cada faixa de peso;
 *                          "kgExtra" é o valor de cada kg acima da última faixa
 */
const FRETE_GRATIS_ACIMA = 199.00;
const FRETE_GRATIS_REGIOES = ["goias", "centroOeste", "sudeste", "sul"];

const FRETE_FAIXAS_G = [1000, 2000, 3000, 5000];

const FRETE_TABELA = {
  goias:       { nome: "Goiás",        precos: [22.00, 26.00, 30.00, 36.00], kgExtra: 5.00 },
  centroOeste: { nome: "Centro-Oeste", precos: [28.00, 33.00, 38.00, 46.00], kgExtra: 6.00 },
  sudeste:     { nome: "Sudeste",      precos: [30.00, 36.00, 42.00, 52.00], kgExtra: 7.00 },
  sul:         { nome: "Sul",          precos: [36.00, 43.00, 50.00, 62.00], kgExtra: 8.00 },
  nordeste:    { nome: "Nordeste",     precos: [42.00, 52.00, 62.00, 78.00], kgExtra: 10.00 },
  norte:       { nome: "Norte",        precos: [48.00, 60.00, 72.00, 92.00], kgExtra: 12.00 }
};

// Região de cada estado (Goiás tem tabela própria, pois é de onde enviamos).
const FRETE_REGIAO_DA_UF = {
  GO: "goias",
  DF: "centroOeste", MT: "centroOeste", MS: "centroOeste",
  SP: "sudeste", RJ: "sudeste", MG: "sudeste", ES: "sudeste",
  PR: "sul", SC: "sul", RS: "sul",
  BA: "nordeste", SE: "nordeste", AL: "nordeste", PE: "nordeste", PB: "nordeste",
  RN: "nordeste", CE: "nordeste", PI: "nordeste", MA: "nordeste",
  AC: "norte", AM: "norte", AP: "norte", PA: "norte", RO: "norte", RR: "norte", TO: "norte"
};

// Faixas de CEP de cada estado (tabela pública dos Correios).
const FRETE_CEP_UF = [
  [1000000, 19999999, "SP"], [20000000, 28999999, "RJ"], [29000000, 29999999, "ES"],
  [30000000, 39999999, "MG"], [40000000, 48999999, "BA"], [49000000, 49999999, "SE"],
  [50000000, 56999999, "PE"], [57000000, 57999999, "AL"], [58000000, 58999999, "PB"],
  [59000000, 59999999, "RN"], [60000000, 63999999, "CE"], [64000000, 64999999, "PI"],
  [65000000, 65999999, "MA"], [66000000, 68899999, "PA"], [68900000, 68999999, "AP"],
  [69000000, 69299999, "AM"], [69300000, 69399999, "RR"], [69400000, 69899999, "AM"],
  [69900000, 69999999, "AC"], [70000000, 72799999, "DF"], [72800000, 72999999, "GO"],
  [73000000, 73699999, "DF"], [73700000, 76799999, "GO"], [76800000, 76999999, "RO"],
  [77000000, 77999999, "TO"], [78000000, 78899999, "MT"], [78900000, 78999999, "RO"],
  [79000000, 79999999, "MS"], [80000000, 87999999, "PR"], [88000000, 89999999, "SC"],
  [90000000, 99999999, "RS"]
];

/** Descobre o estado (UF) pelo CEP. Devolve "" se o CEP não for válido. */
function ufDoCep(cep) {
  const d = String(cep == null ? "" : cep).replace(/\D/g, "");
  if (d.length !== 8) return "";
  const n = Number(d);
  const faixa = FRETE_CEP_UF.find((f) => n >= f[0] && n <= f[1]);
  return faixa ? faixa[2] : "";
}

/** Peso total do pedido em gramas. itens = [{ id, quantidade }]. */
function pesoDoPedido(itens) {
  return (itens || []).reduce((total, item) => {
    const produto = PRODUTOS.find((p) => p.id === item.id);
    const peso = produto && produto.pesoEnvio ? produto.pesoEnvio : 500;
    return total + peso * Number(item.quantidade || 0);
  }, 0);
}

/**
 * Calcula o frete de um pedido.
 * Devolve { valor, gratis, regiao, regiaoNome, uf, pesoG }, ou
 * { valor: null } quando o CEP ainda não é válido.
 */
function calcularFretePedido(itens, subtotal, cep) {
  const uf = ufDoCep(cep);
  const regiao = FRETE_REGIAO_DA_UF[uf];
  if (!regiao) return { valor: null, gratis: false, regiao: "", regiaoNome: "", uf: "", pesoG: 0 };

  const tabela = FRETE_TABELA[regiao];
  const pesoG = pesoDoPedido(itens);
  const idx = FRETE_FAIXAS_G.findIndex((limite) => pesoG <= limite);

  let valor;
  if (idx >= 0) {
    valor = tabela.precos[idx];
  } else {
    const ultimo = FRETE_FAIXAS_G[FRETE_FAIXAS_G.length - 1];
    const kgAcima = Math.ceil((pesoG - ultimo) / 1000);
    valor = tabela.precos[tabela.precos.length - 1] + kgAcima * tabela.kgExtra;
  }

  const gratis =
    FRETE_GRATIS_ACIMA > 0 &&
    subtotal >= FRETE_GRATIS_ACIMA &&
    FRETE_GRATIS_REGIOES.includes(regiao);

  return {
    valor: gratis ? 0 : Math.round(valor * 100) / 100,
    gratis,
    regiao,
    regiaoNome: tabela.nome,
    uf,
    pesoG
  };
}

// Permite que as funções em /api usem esta mesma lista (preços confiáveis).
// No navegador, "module" não existe e esta linha é ignorada.
if (typeof module !== "undefined" && module.exports) {
  module.exports = { PRODUTOS, FRETE_GRATIS_ACIMA, ufDoCep, pesoDoPedido, calcularFretePedido };
}
