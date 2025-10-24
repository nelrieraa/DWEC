document.addEventListener("DOMContentLoaded", () => {
  const h2Cursos = document.querySelectorAll(".tarjeta-curso h2");
  h2Cursos.forEach(h2 => {
    h2.textContent = `[CURSO] ${h2.textContent}`;
  });
});