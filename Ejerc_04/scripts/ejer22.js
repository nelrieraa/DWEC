document.addEventListener("DOMContentLoaded", () => {
  const formulario = document.getElementById("formulario-contacto");
  formulario.addEventListener("submit", (e) => {
    e.preventDefault();
    const nombre = formulario.querySelector("input[name='nombre']").value;
    const mensaje = formulario.querySelector("textarea[name='mensaje']").value;
    console.log(`Nombre: ${nombre}, Mensaje: ${mensaje}`);
  });
});