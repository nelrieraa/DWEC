export function crearProducto(nombre, categoria, precio, stock) {
  return { nombre, categoria, precio, stock };
}

export function filtrarPorCategoria(inventario, categoria) {
  return inventario.filter(producto => producto.categoria === categoria);
}

export function listarProductosAgotados(inventario) {
  return inventario.filter(producto => producto.stock === 0);
}

export function calcularValorTotalInventario(inventario) {
  return inventario.reduce((total, producto) => total + producto.precio * producto.stock, 0);
}
function resumenInventario(inventario) {
  const totalProductos = inventario.length;
  const categorias = [...new Set(inventario.map(p => p.categoria))];
  const valorTotal = calcularValorTotalInventario(inventario);
  console.log(`Resumen del inventario:`);
  console.log(`- Total de productos: ${totalProductos}`);
  console.log(`- Categorías distintas: ${categorias.length}`);
  console.log(`- Valor total: ${valorTotal}`);
}
export default resumenInventario;