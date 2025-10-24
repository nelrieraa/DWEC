document.addEventListener("DOMContentLoaded", () => {
  const precio = document.querySelector("[data-precio]");
  if (precio) console.log("Precio:", precio.textContent);
});
