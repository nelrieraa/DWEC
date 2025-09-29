const numeros = [1, 2, 3, 4, 5,6]
const numerosDuplicados = numeros.map(numero => numero * 2)
const numerosPares = numeros.filter(numero => numero % 2 === 0)
numerosPares.forEach(numero => {
  console.log(`El número par es: ${numero}`)
})
