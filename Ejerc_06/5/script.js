const buscador = document.getElementById('buscador');
const lista = document.getElementById('lista');
const items = lista.getElementsByTagName('li');

buscador.addEventListener('input', () => {
  const texto = buscador.value.toLowerCase();
  for (let li of items) {
    const nombre = li.textContent.toLowerCase();
    li.style.display = nombre.includes(texto) ? '' : 'none';
  }
});
