document.addEventListener("DOMContentLoaded", () => {
  const primeraTarjeta = document.querySelector(".tarjeta-curso");
  const siguienteTarjeta = primeraTarjeta.nextElementSibling;
  console.log("Tarjeta vecina:", siguienteTarjeta);
});
