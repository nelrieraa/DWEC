const base = 5;
const altura = 10;
function calculanAreaRectangulo(base, altura) {
  return base * altura;
}

function calculadoraAreaTriangulo(base, altura) {
  return (base * altura) / 2;
}   

const calculadoraAreaTriangulo2 = (base, altura) => (base * altura) / 2;

console.log(`El área del rectángulo es: ${calculanAreaRectangulo(base, altura)}`);
console.log(`El área del triángulo es: ${calculadoraAreaTriangulo(base, altura)}`);