document.addEventListener("DOMContentLoaded", () => {
  const categorias = document.querySelectorAll(".tarjeta-curso .categoria");
  const nombres = Array.from(categorias).map(cat => cat.textContent);
  console.log("Categorías:", nombres);
});