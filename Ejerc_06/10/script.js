const longitud = document.getElementById('longitud');
const resultado = document.getElementById('resultado');
const generar = document.getElementById('generar');
const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=';

generar.addEventListener('click', () => {
  const n = parseInt(longitud.value);
  if (isNaN(n) || n < 4) return alert('Introduce una longitud válida (mínimo 4)');
  let pass = '';
  for (let i = 0; i < n; i++) {
    pass += caracteres[Math.floor(Math.random() * caracteres.length)];
  }
  resultado.value = pass;
});
