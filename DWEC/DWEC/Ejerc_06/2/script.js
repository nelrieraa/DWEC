const formulario = document.getElementById('formulario');
const nombreInput = document.getElementById('nombre');
const apellidoInput = document.getElementById('apellido');
const tablaBody = document.getElementById('tablaBody');

formulario.addEventListener('submit', (e) => {
  e.preventDefault();
  const nombre = nombreInput.value.trim();
  const apellido = apellidoInput.value.trim();
  if (nombre && apellido) {
    const fila = document.createElement('tr');
    const celdaNombre = document.createElement('td');
    const celdaApellido = document.createElement('td');
    celdaNombre.textContent = nombre;
    celdaApellido.textContent = apellido;
    fila.appendChild(celdaNombre);
    fila.appendChild(celdaApellido);
    tablaBody.appendChild(fila);
    formulario.reset();
  }
});
