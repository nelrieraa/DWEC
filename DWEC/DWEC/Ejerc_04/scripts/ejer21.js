document.addEventListener("DOMContentLoaded", () => {
  const botonPremium = document.querySelector(".tarjeta-curso.premium button");
  botonPremium.addEventListener("click", () => {
    alert("Accediendo a información exclusiva para miembros premium");
  });
});