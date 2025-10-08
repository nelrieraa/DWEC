document.addEventListener("DOMContentLoaded", () => {
  const parrafo = document.querySelector("[data-precio]");
  console.log("Precio del curso:", parrafo.dataset.precio);
});
