document.addEventListener("DOMContentLoaded", () => {
  const botonPremium = document.querySelector(".tarjeta-curso.premium button");
  const contenedorInfo = botonPremium.closest(".info");
  console.log("Contenedor info del premium:", contenedorInfo);
});
