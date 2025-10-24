document.addEventListener('DOMContentLoaded', () => {
    console.log('%cDocumento listo.', 'color: green; font-size: 16px; font-weight: bold;');
    console.log('%cEscribe las soluciones en main.js', 'color: red; font-size: 18px; font-weight: bold;');


    // --- Solución Ejercicio 1 y 4 ---
const outer = document.getElementById('outer-box');
outer.addEventListener('click', (event) => {
  event.target.style.backgroundColor = 'coral';
  console.log('target:', event.target.id);
  console.log('currentTarget:', event.currentTarget.id);
});
const middle = document.getElementById('middle-box');
middle.addEventListener('click', (event) => {
  event.target.style.backgroundColor = 'coral';
  event.stopPropagation(); // evita que el evento suba al outer
  console.log('Propagación detenida en:', event.target.id);
});


    // --- Solución Ejercicio 2 ---
document.getElementById('test-link').addEventListener('click', (event) => {
  event.preventDefault(); // evita que navegue
  console.log('Navegación prevenida');
});


    // --- Solución Ejercicio 3 ---
const topBtn = document.getElementById('topBtn');
window.addEventListener('scroll', () => {
  if (window.scrollY > 250) {
    topBtn.style.display = 'block';
  } else {
    topBtn.style.display = 'none';
  }
});

topBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});


    // --- Solución Ejercicio 5 ---
document.addEventListener("DOMContentLoaded", () => {
  const notifyBtn = document.getElementById('notifyBtn');
  const messageBox = document.getElementById('message-box');

  
  document.body.addEventListener('notification', (event) => {
    console.log("Evento 'notification' recibido");
    const { mensaje, fecha } = event.detail;
    messageBox.textContent = `${mensaje} (${fecha})`;
  });

  
  notifyBtn.addEventListener('click', () => {
    const customEvent = new CustomEvent('notification', {
      detail: {
        mensaje: '¡Notificación enviada correctamente!',
        fecha: new Date().toLocaleString()
      }
    });

   
    document.body.dispatchEvent(customEvent);
})})});
