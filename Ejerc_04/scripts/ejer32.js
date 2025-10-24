document.addEventListener("DOMContentLoaded", () => {
  const imagenes = document.querySelectorAll(".tarjeta-curso img");
  imagenes.forEach(img => img.classList.add("imagen-curso"));
});