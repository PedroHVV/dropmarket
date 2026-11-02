/**
 * DADOS DA EMPRESA
 * ----------------
 * Quando você definir a empresa que vai vender, preencha os campos abaixo.
 * Enquanto estiverem vazios, nada aparece no site.
 * Depois de preencher, a identificação aparece sozinha no rodapé de todas as
 * páginas e nos Termos, na Política de privacidade e no Sobre nós.
 *
 * Exemplo:
 *   razaoSocial: "Minha Empresa LTDA",
 *   cnpj: "00.000.000/0001-00",
 *   endereco: "Rua Exemplo, 123, Setor Central, Goiânia - GO, CEP 74000-000",
 *   telefone: "(62) 90000-0000"
 */
const EMPRESA = {
  razaoSocial: "",
  cnpj: "",
  endereco: "",
  telefone: ""
};

function dadosDaEmpresaTexto() {
  const partes = [];
  if (EMPRESA.razaoSocial) partes.push(EMPRESA.razaoSocial);
  if (EMPRESA.cnpj) partes.push("CNPJ " + EMPRESA.cnpj);
  if (EMPRESA.endereco) partes.push(EMPRESA.endereco);
  if (EMPRESA.telefone) partes.push("Tel. " + EMPRESA.telefone);
  return partes.join(" · ");
}

document.addEventListener("DOMContentLoaded", () => {
  const texto = dadosDaEmpresaTexto();
  if (!texto) return;
  document.querySelectorAll("[data-dados-empresa]").forEach((el) => {
    el.textContent = texto;
    el.hidden = false;
  });
});
