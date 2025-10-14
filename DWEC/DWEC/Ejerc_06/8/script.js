const miniaturas = document.querySelectorAll('.miniaturas img');
const imagenPrincipal = document.getElementById('imagenPrincipal');

miniaturas.forEach(img => {
  img.addEventListener('click', () => {
    imagenPrincipal.src = img.src.replace('100/100', '600/400');
  });
});
