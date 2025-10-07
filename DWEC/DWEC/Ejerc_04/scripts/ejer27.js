document.addEventListener("DOMContentLoaded", () => {
  const tarjetas = document.querySelectorAll(".tarjeta-curso:not(.premium)");
  tarjetas.forEach(tarjeta => {
    tarjeta.style.border = "2px dotted black";
  });
});