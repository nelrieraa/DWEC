let listaProductos = [];
const selector = document.getElementById('category-select');
const botonAsc = document.getElementById('sort-asc');
const botonDesc = document.getElementById('sort-desc');
async function cargarDatos(){
const respuesta = await fetch('./data/productos.json');
listaProductos = await respuesta.json();

mostrarProductos(listaProductos);
obtenerCategorias();
};
const contenedor = document.getElementById('products-container');
function mostrarProductos(datos){
    contenedor.innerHTML = '';
    datos.forEach(producto => {
        contenedor.innerHTML += `<div class="product-card">
        <h3>${producto.nombre}</h3>
        <p class="id">${producto.id}</p>
        <p class"sku">${producto.sku}</p>
        <p class="price">${producto.precio} €</p>
        <p class="stock">${producto.stock}</p>
        <p class="category">${producto.categoria}</p>
    </div>`
    });
};
cargarDatos();
function obtenerCategorias(){
    const todasLasCategorias = listaProductos.map(p => p.categoria);
    const categoriasUnicas = [... new Set(todasLasCategorias)];
    categoriasUnicas.forEach(cat =>{
    selector.innerHTML += `<option value ="${cat}">${cat}</option>`
    });
};
selector.addEventListener('change',function(e){
    const categoria = e.target.value;
    if(categoria === 'todas'){
        mostrarProductos(listaProductos);
        
    }else {
        const filtrados = listaProductos.filter(p => p.categoria === categoria);
        mostrarProductos(filtrados);
    }
});
botonAsc.addEventListener('click',function(){
    const ordenados = [...listaProductos].sort((a,b) => a.precio - b.precio);
    mostrarProductos(ordenados);
});
botonDesc.addEventListener('click',function(){
    const ordenadosDesc = [...listaProductos].sort((a,b)=> b.precio - a.precio);
    mostrarProductos(ordenadosDesc);
})