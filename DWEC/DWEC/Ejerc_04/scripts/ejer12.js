document.addEventListener("DOMContentLoaded", () => {
  const cursos = document.querySelectorAll(".tarjeta-curso");
  const enlaceContacto = document.querySelector("nav a[href='#contacto']");
  enlaceContacto.textContent = `Contacto (${cursos.length} Cursos)`;
});
