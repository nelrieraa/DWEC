const checkbox = document.getElementById('terminos');
const boton = document.getElementById('enviar');

checkbox.addEventListener('change', () => {
  boton.disabled = !checkbox.checked;
});
