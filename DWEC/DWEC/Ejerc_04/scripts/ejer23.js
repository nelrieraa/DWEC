document.addEventListener("DOMContentLoaded", () => {
  const reactCurso = document.querySelector(".tarjeta-curso.react");
  const titulo = reactCurso.querySelector("h2");
  const parrafo = reactCurso.querySelector(".oculto");
  titulo.addEventListener("click", () => {
    parrafo.style.display = "block";
  });
});