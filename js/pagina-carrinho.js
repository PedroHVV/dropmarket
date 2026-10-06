/**
 * Renderiza o conteúdo da página do carrinho (carrinho.html),
 * o formulário de entrega e o botão de finalizar compra (checkout).
 *
 * Requer produtos.js (FRETE_FIXO, FRETE_GRATIS_ACIMA) e carrinho.js.
 */

const CHAVE_DADOS_CLIENTE = "loja_dados_cliente";

const CAMPOS_CLIENTE = [
  "nome", "email", "telefone", "cep",
  "rua", "numero", "complemento", "bairro", "cidade", "uf"
];

let dadosCliente = carregarDadosCliente();

function carregarDadosCliente() {
  const vazio = {};
  CAMPOS_CLIENTE.forEach((c) => { vazio[c] = ""; });
  try {
    const salvo = JSON.parse(localStorage.getItem(CHAVE_DADOS_CLIENTE) || "{}");
    CAMPOS_CLIENTE.forEach((c) => {
      if (typeof salvo[c] === "string") vazio[c] = salvo[c];
    });
  } catch (e) {
    // sem localStorage: segue com o formulário vazio
  }
  return vazio;
}

function salvarDadosCliente() {
  try {
    localStorage.setItem(CHAVE_DADOS_CLIENTE, JSON.stringify(dadosCliente));
  } catch (e) {
    // ignora
  }
}

function esc(texto) {
  return String(texto == null ? "" : texto)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function somenteDigitos(texto) {
  return String(texto || "").replace(/\D/g, "");
}

/** Calcula o frete a partir do subtotal (mesma regra usada no servidor). */
function calcularFrete(subtotal) {
  if (FRETE_GRATIS_ACIMA > 0 && subtotal >= FRETE_GRATIS_ACIMA) return 0;
  return FRETE_FIXO;
}

function campoHtml(id, rotulo, opcoes) {
  const o = opcoes || {};
  return `
    <div class="campo ${o.classe || ""}">
      <label for="campo-${id}">${rotulo}</label>
      <input
        id="campo-${id}" name="${id}" type="${o.tipo || "text"}"
        value="${esc(dadosCliente[id])}"
        autocomplete="${o.autocomplete || "on"}"
        ${o.inputmode ? `inputmode="${o.inputmode}"` : ""}
        ${o.maxlength ? `maxlength="${o.maxlength}"` : ""}
        ${o.placeholder ? `placeholder="${o.placeholder}"` : ""}
      />
    </div>`;
}

function formularioEntregaHtml() {
  return `
    <form id="form-entrega" class="form-entrega" novalidate>
      <h2>Dados para entrega</h2>
      <div class="grade-campos">
        ${campoHtml("nome", "Nome completo", { classe: "campo-largo", autocomplete: "name" })}
        ${campoHtml("email", "E-mail", { tipo: "email", autocomplete: "email" })}
        ${campoHtml("telefone", "Telefone / WhatsApp (com DDD)", { tipo: "tel", autocomplete: "tel", inputmode: "numeric", placeholder: "(62) 91234-5678" })}
        ${campoHtml("cep", "CEP", { autocomplete: "postal-code", inputmode: "numeric", maxlength: 9, placeholder: "00000-000" })}
        ${campoHtml("rua", "Rua / Avenida", { classe: "campo-largo", autocomplete: "address-line1" })}
        ${campoHtml("numero", "Número", { autocomplete: "off" })}
        ${campoHtml("complemento", "Complemento (opcional)", { autocomplete: "address-line2" })}
        ${campoHtml("bairro", "Bairro", { autocomplete: "off" })}
        ${campoHtml("cidade", "Cidade", { autocomplete: "address-level2" })}
        ${campoHtml("uf", "Estado (UF)", { autocomplete: "address-level1", maxlength: 2, placeholder: "GO" })}
      </div>
      <p class="aviso-form">Usamos esses dados apenas para entregar o seu pedido.</p>
    </form>`;
}

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

  const subtotal = calcularTotalCarrinho();
  const frete = calcularFrete(subtotal);
  const total = subtotal + frete;

  const linhas = carrinho.map((item) => `
    <div class="item-carrinho" data-id="${esc(item.id)}">
      <img src="${esc(item.imagem)}" alt="${esc(item.nome)}" class="imagem-item" />
      <div class="detalhes-item">
        <h3>${esc(item.nome)}</h3>
        <p>${formatarPreco(item.preco)} cada</p>
      </div>
      <div class="controle-quantidade">
        <button class="botao-quantidade" data-diminuir="${esc(item.id)}">−</button>
        <span>${item.quantidade}</span>
        <button class="botao-quantidade" data-aumentar="${esc(item.id)}">+</button>
      </div>
      <p class="subtotal-item">${formatarPreco(item.preco * item.quantidade)}</p>
      <button class="botao-remover" data-remover="${esc(item.id)}" aria-label="Remover item">✕</button>
    </div>
  `).join("");

  const textoFrete = frete === 0 ? "Grátis" : formatarPreco(frete);
  const dicaFrete =
    frete > 0 && FRETE_GRATIS_ACIMA > 0
      ? `<p class="dica-frete">Faltam ${formatarPreco(FRETE_GRATIS_ACIMA - subtotal)} para ganhar frete grátis.</p>`
      : "";

  container.innerHTML = `
    <div class="lista-carrinho">${linhas}</div>
    ${formularioEntregaHtml()}
    <div class="resumo-carrinho">
      <p class="linha-resumo">Subtotal: <span>${formatarPreco(subtotal)}</span></p>
      <p class="linha-resumo">Frete: <span>${textoFrete}</span></p>
      ${dicaFrete}
      <p class="total-carrinho">Total: <strong>${formatarPreco(total)}</strong></p>
      <button id="botao-checkout" class="botao botao-primario botao-checkout">
        Ir para o pagamento
      </button>
      <p id="mensagem-checkout" class="mensagem-checkout" role="alert"></p>
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

  ligarFormulario();
  document.getElementById("botao-checkout").addEventListener("click", iniciarCheckout);
}

function ligarFormulario() {
  const form = document.getElementById("form-entrega");
  if (!form) return;

  CAMPOS_CLIENTE.forEach((nome) => {
    const input = form.elements[nome];
    if (!input) return;

    input.addEventListener("input", () => {
      let valor = input.value;

      if (nome === "cep") {
        const d = somenteDigitos(valor).slice(0, 8);
        valor = d.length > 5 ? `${d.slice(0, 5)}-${d.slice(5)}` : d;
        input.value = valor;
      }
      if (nome === "uf") {
        valor = valor.toUpperCase().replace(/[^A-Z]/g, "").slice(0, 2);
        input.value = valor;
      }

      dadosCliente[nome] = valor;
      input.classList.remove("campo-invalido");
      salvarDadosCliente();

      if (nome === "cep" && somenteDigitos(valor).length === 8) {
        buscarCep(somenteDigitos(valor), form);
      }
    });
  });
}

/** Preenche rua, bairro, cidade e UF automaticamente pelo CEP (ViaCEP). */
async function buscarCep(cep, form) {
  try {
    const resposta = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    if (!resposta.ok) return;
    const dados = await resposta.json();
    if (dados.erro) return;

    const mapa = {
      rua: dados.logradouro,
      bairro: dados.bairro,
      cidade: dados.localidade,
      uf: dados.uf
    };
    Object.keys(mapa).forEach((campo) => {
      if (mapa[campo] && form.elements[campo]) {
        form.elements[campo].value = mapa[campo];
        form.elements[campo].classList.remove("campo-invalido");
        dadosCliente[campo] = mapa[campo];
      }
    });
    salvarDadosCliente();

    // Leva o cursor direto para o número (o que o cliente ainda precisa digitar)
    if (form.elements.numero && !dadosCliente.numero) {
      form.elements.numero.focus();
    }
  } catch (erro) {
    // Se o ViaCEP estiver fora do ar, o cliente preenche à mão.
  }
}

/** Confere os dados do formulário. Devolve a lista de campos com problema. */
function validarDadosCliente() {
  const d = dadosCliente;
  const invalidos = [];

  if (d.nome.trim().split(/\s+/).filter(Boolean).length < 2) {
    invalidos.push({ campo: "nome", msg: "Informe nome e sobrenome." });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email.trim())) {
    invalidos.push({ campo: "email", msg: "Informe um e-mail válido." });
  }
  const tel = somenteDigitos(d.telefone);
  if (tel.length < 10 || tel.length > 11) {
    invalidos.push({ campo: "telefone", msg: "Informe o telefone com DDD." });
  }
  if (somenteDigitos(d.cep).length !== 8) {
    invalidos.push({ campo: "cep", msg: "Informe um CEP válido (8 números)." });
  }
  if (!d.rua.trim()) invalidos.push({ campo: "rua", msg: "Informe a rua." });
  if (!d.numero.trim()) invalidos.push({ campo: "numero", msg: "Informe o número (ou S/N)." });
  if (!d.bairro.trim()) invalidos.push({ campo: "bairro", msg: "Informe o bairro." });
  if (!d.cidade.trim()) invalidos.push({ campo: "cidade", msg: "Informe a cidade." });
  if (!/^[A-Za-z]{2}$/.test(d.uf.trim())) {
    invalidos.push({ campo: "uf", msg: "Informe a sigla do estado (ex: GO)." });
  }
  return invalidos;
}

async function iniciarCheckout() {
  const botao = document.getElementById("botao-checkout");
  const mensagem = document.getElementById("mensagem-checkout");
  const form = document.getElementById("form-entrega");
  const carrinho = obterCarrinho();

  if (carrinho.length === 0) return;

  document.querySelectorAll(".campo-invalido").forEach((el) =>
    el.classList.remove("campo-invalido")
  );

  const problemas = validarDadosCliente();
  if (problemas.length > 0) {
    problemas.forEach((p) => {
      if (form.elements[p.campo]) form.elements[p.campo].classList.add("campo-invalido");
    });
    mensagem.textContent = problemas[0].msg;
    form.elements[problemas[0].campo].focus();
    return;
  }

  botao.disabled = true;
  botao.textContent = "Processando...";
  mensagem.textContent = "";

  try {
    // Só enviamos id e quantidade: o servidor busca os preços no catálogo.
    const resposta = await fetch("/api/criar-preferencia", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        itens: carrinho.map((i) => ({ id: i.id, quantidade: i.quantidade })),
        cliente: {
          nome: dadosCliente.nome.trim(),
          email: dadosCliente.email.trim(),
          telefone: somenteDigitos(dadosCliente.telefone),
          cep: somenteDigitos(dadosCliente.cep),
          rua: dadosCliente.rua.trim(),
          numero: dadosCliente.numero.trim(),
          complemento: dadosCliente.complemento.trim(),
          bairro: dadosCliente.bairro.trim(),
          cidade: dadosCliente.cidade.trim(),
          uf: dadosCliente.uf.trim().toUpperCase()
        }
      })
    });

    if (!resposta.ok) {
      const erro = await resposta.json().catch(() => ({}));
      throw new Error(erro.erro || "Falha ao criar pagamento");
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
    botao.textContent = "Ir para o pagamento";
  }
}

document.addEventListener("DOMContentLoaded", renderizarCarrinho);
