document.addEventListener("DOMContentLoaded", () => {
  const footer = document.querySelector("footer");
  const contenedorAntesFooter = footer.previousElementSibling;
  if (contenedorAntesFooter) contenedorAntesFooter.style.border = "2px solid red";
});
