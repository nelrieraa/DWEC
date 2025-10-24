const arrastrable = document.getElementById('arrastrable');
const contenedor = document.getElementById('contenedor');
let arrastrando = false;
let offsetX, offsetY;

arrastrable.addEventListener('mousedown', (e) => {
  arrastrando = true;
  offsetX = e.offsetX;
  offsetY = e.offsetY;
});

window.addEventListener('mouseup', () => arrastrando = false);

window.addEventListener('mousemove', (e) => {
  if (arrastrando) {
    const rect = contenedor.getBoundingClientRect();
    let x = e.clientX - rect.left - offsetX;
    let y = e.clientY - rect.top - offsetY;
    x = Math.max(0, Math.min(x, rect.width - arrastrable.offsetWidth));
    y = Math.max(0, Math.min(y, rect.height - arrastrable.offsetHeight));
    arrastrable.style.left = `${x}px`;
    arrastrable.style.top = `${y}px`;
  }
});
