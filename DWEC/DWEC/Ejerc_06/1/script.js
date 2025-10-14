const botonMostrar = document.getElementById('mostrarModal');
const modal = document.getElementById('miModal');
const botonCerrar = document.querySelector('.cerrar');

botonMostrar.addEventListener('click', () => {
  modal.style.display = 'flex';
});

botonCerrar.addEventListener('click', () => {
  modal.style.display = 'none';
});

window.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.style.display = 'none';
  }
});
