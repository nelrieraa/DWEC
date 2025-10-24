const tabla = document.getElementById('tabla');

tabla.addEventListener('dblclick', (e) => {
  const celda = e.target;
  if (celda.tagName === 'TD' && !celda.querySelector('input')) {
    const valor = celda.textContent;
    const input = document.createElement('input');
    input.value = valor;
    celda.textContent = '';
    celda.appendChild(input);
    input.focus();
    input.addEventListener('blur', () => {
      celda.textContent = input.value;
    });
  }
});
