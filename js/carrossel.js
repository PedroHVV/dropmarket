/**
 * Carrossel de banners da página inicial.
 * Troca de slide automaticamente a cada 5 segundos, com bolinhas
 * clicáveis pra navegar manualmente. Pausa a troca automática
 * enquanto o mouse está em cima do banner.
 *
 * Pra adicionar um 3º (ou mais) banner: copie um bloco <div class="slide">
 * inteiro no index.html com a nova imagem/texto, e copie um <button
 * class="ponto"> a mais dentro de .pontos-carrossel. Não precisa mexer
 * neste arquivo.
 */

function iniciarCarrossel() {
  const carrossel = document.querySelector(".hero-carrossel");
  if (!carrossel) return;

  const slides = carrossel.querySelectorAll(".slide");
  const pontos = carrossel.querySelectorAll(".ponto");
  let atual = 0;
  let temporizador;

  function mostrarSlide(indice) {
    slides.forEach((slide) => slide.classList.remove("ativo"));
    pontos.forEach((ponto) => ponto.classList.remove("ativo"));
    slides[indice].classList.add("ativo");
    pontos[indice].classList.add("ativo");
    atual = indice;
  }

  function proximoSlide() {
    mostrarSlide((atual + 1) % slides.length);
  }

  function iniciarAutoplay() {
    temporizador = setInterval(proximoSlide, 5000);
  }

  function pararAutoplay() {
    clearInterval(temporizador);
  }

  pontos.forEach((ponto, indice) => {
    ponto.addEventListener("click", () => {
      mostrarSlide(indice);
      pararAutoplay();
      iniciarAutoplay();
    });
  });

  carrossel.addEventListener("mouseenter", pararAutoplay);
  carrossel.addEventListener("mouseleave", iniciarAutoplay);

  if (slides.length > 1) {
    iniciarAutoplay();
  }
}

document.addEventListener("DOMContentLoaded", iniciarCarrossel);
