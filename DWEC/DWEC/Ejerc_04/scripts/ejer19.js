document.addEventListener("DOMContentLoaded", () => {
  const infoDiv = document.querySelector(".info");
  const tarjeta = infoDiv.closest(".tarjeta-curso");
  const primeraImagen = tarjeta.querySelector("img");
  console.log("Imagen del primer div.info:", primeraImagen);
});
