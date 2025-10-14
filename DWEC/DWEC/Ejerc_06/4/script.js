const contenedor = document.getElementById('contenedor');

contenedor.addEventListener('click', (e) => {
  if (e.target.classList.contains('color')) {
    document.body.style.backgroundColor = e.target.style.backgroundColor;
  }
});
