let segundos = 0;
let minutos = 0;
let horas = 0;
let intervalo;
let activo = false;
const cronometro = document.getElementById('cronometro');

function actualizar() {
  segundos++;
  if (segundos === 60) {
    segundos = 0;
    minutos++;
  }
  if (minutos === 60) {
    minutos = 0;
    horas++;
  }
  cronometro.textContent = 
    `${horas.toString().padStart(2, '0')}:${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`;
}

document.getElementById('iniciar').addEventListener('click', () => {
  if (!activo) {
    intervalo = setInterval(actualizar, 1000);
    activo = true;
  }
});

document.getElementById('detener').addEventListener('click', () => {
  clearInterval(intervalo);
  activo = false;
});

document.getElementById('reiniciar').addEventListener('click', () => {
  clearInterval(intervalo);
  segundos = 0;
  minutos = 0;
  horas = 0;
  activo = false;
  cronometro.textContent = '00:00:00';
});
