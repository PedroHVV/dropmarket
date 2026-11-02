/**
 * AVALIAÇÕES DE CLIENTES
 * ----------------------
 * Só coloque aqui avaliações REAIS, de clientes que compraram, e com a
 * autorização deles. Não invente nem altere comentários.
 * Enquanto a lista estiver vazia, a seção não aparece no site.
 *
 * Para adicionar, copie o modelo abaixo para dentro da lista, separando
 * cada avaliação com vírgula:
 *
 *   {
 *     nome: "Maria S.",
 *     cidade: "Goiânia - GO",
 *     nota: 5,                                  // de 1 a 5
 *     produto: "Garrafa Térmica com Alça 1,2L", // opcional
 *     comentario: "Texto que o cliente escreveu.",
 *     foto: "img/avaliacoes/maria.jpg"          // opcional
 *   }
 */
const AVALIACOES = [];

function escAval(t) {
  return String(t == null ? "" : t).replace(/&/g, "&amp;").replace(/</g, "&lt;")
    .replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

document.addEventListener("DOMContentLoaded", () => {
  const secao = document.getElementById("secao-avaliacoes");
  const lista = document.getElementById("lista-avaliacoes");
  if (!secao || !lista || AVALIACOES.length === 0) return;

  lista.innerHTML = AVALIACOES.map((a) => {
    const nota = Math.max(1, Math.min(5, Number(a.nota) || 5));
    const estrelas = "★".repeat(nota) + "☆".repeat(5 - nota);
    return `
      <article class="avaliacao">
        ${a.foto ? `<img class="avaliacao-foto" src="${escAval(a.foto)}" alt="Foto enviada por ${escAval(a.nome)}" loading="lazy" />` : ""}
        <div class="avaliacao-texto">
          <p class="avaliacao-estrelas" aria-label="Nota ${nota} de 5">${estrelas}</p>
          <p>${escAval(a.comentario)}</p>
          <p class="avaliacao-autor"><strong>${escAval(a.nome)}</strong>${a.cidade ? " · " + escAval(a.cidade) : ""}${a.produto ? "<br>" + escAval(a.produto) : ""}</p>
        </div>
      </article>`;
  }).join("");
  secao.hidden = false;
});
