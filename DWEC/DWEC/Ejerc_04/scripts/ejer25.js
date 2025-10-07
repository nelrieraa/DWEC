document.addEventListener("DOMContentLoaded", () => {
  const devWebCursos = document.querySelectorAll(".tarjeta-curso .categoria");
  devWebCursos.forEach(cat => {
    if (cat.textContent.includes("Desarrollo Web")) {
      cat.closest(".tarjeta-curso").style.backgroundColor = "#f0f0f0";
    }
  });
});
