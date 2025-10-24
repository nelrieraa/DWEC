document.addEventListener("DOMContentLoaded", () => {
  const reactCurso = document.querySelector(".tarjeta-curso.react");
  const parrafoOculto = reactCurso.querySelector(".oculto");
  parrafoOculto.textContent += " (¡Oferta especial!)";
});