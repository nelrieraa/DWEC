document.addEventListener("DOMContentLoaded", () => {
  const enlaces = document.querySelectorAll("nav a");
  enlaces.forEach(a => a.setAttribute("data-tipo", "enlace-nav"));
});