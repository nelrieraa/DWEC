const { agregarLibro, obtenerLibros, buscarLibro, eliminarLibro, calcularTotalPaginas, ordenarPorPaginas, hayLibrosLargos, todosSonLibrosCortos } = require('./biblioteca');

console.log('Colección inicial de libros:');
console.log(obtenerLibros());

const nuevoLibro = {
  id: 11,
  titulo: "El nombre del viento",
  autor: "Patrick Rothfuss",
  paginas: 662
};
agregarLibro(nuevoLibro);

console.log('Colección después de agregar un libro:');
console.log(obtenerLibros());


const libroBuscado = buscarLibro(3);
console.log('Libro buscado con id 3:');
console.log(libroBuscado);


const eliminado = eliminarLibro(2);
console.log(`¿Libro con id 2 eliminado?: ${eliminado}`);
console.log('Colección final de libros:');
console.log(obtenerLibros());



console.log('Colección antes de ordenar por páginas:');
console.log(obtenerLibros());

ordenarPorPaginas();
console.log('Colección después de ordenar por páginas:');
console.log(obtenerLibros());


const totalPaginas = calcularTotalPaginas();
console.log(`Total de páginas en la biblioteca: ${totalPaginas}`);


const limites = [100, 500, 1000];
limites.forEach(limite => {
  console.log(`¿Hay libros con más de ${limite} páginas?: ${hayLibrosLargos(limite)}`);
  console.log(`¿Todos los libros tienen menos de ${limite} páginas?: ${todosSonLibrosCortos(limite)}`);
});
