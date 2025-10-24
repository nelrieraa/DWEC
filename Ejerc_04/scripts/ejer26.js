document.addEventListener("DOMContentLoaded", () => {
  const tarjetas = document.querySelectorAll(".tarjeta-curso");
  tarjetas.forEach(tarjeta => {
    const info = tarjeta.querySelector(".info");
    const duracion = document.createElement("p");
    duracion.className = "duracion";
    duracion.textContent = "Duración: 20 horas";
    info.appendChild(duracion);
  });
});