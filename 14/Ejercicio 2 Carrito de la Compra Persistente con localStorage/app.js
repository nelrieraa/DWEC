let listaProductos = [];
const selector = document.getElementById('category-select');
const botonAsc = document.getElementById('sort-asc');
const botonDesc = document.getElementById('sort-desc');
const botonClaro = document.getElementById('btn-light');
const botonOscuro = document.getElementById('btn-dark');
let favoritos = JSON.parse(localStorage.getItem('misFavoritos')) || [];
let carrito = JSON.parse(localStorage.getItem('carrito'))||[];
const contenedorCarrito = document.getElementById('resumen-carrito');
const vaciarCarrito = document.getElementById('btn-vaciar');
const buscador = document.getElementById('input-busqueda');
async function cargarDatos(){
const respuesta = await fetch('./data/productos.json');
listaProductos = await respuesta.json();
mostrarProductos(listaProductos);
obtenerCategorias();
renderizarCarrito();
};
const contenedor = document.getElementById('products-container');
function mostrarProductos(datos){
    contenedor.innerHTML = '';
    datos.forEach(producto => {
        const esFavorito = favoritos.includes(producto.id.toString());
        const textoBoton = esFavorito ? "En favoritos": "añadir a favoritos";
        const claseExtra = esFavorito ? "card-favorito" : "";
        contenedor.innerHTML += `<div class="product-card">
        <h3>${producto.nombre}</h3>
        <p class="id">${producto.id}</p>
        <p class"sku">${producto.sku}</p>
        <p class="price">${producto.precio} €</p>
        <p class="stock">${producto.stock}</p>
        <p class="category">${producto.categoria}</p>
        <button class='btn-fav ${claseExtra}' data-id="${producto.id}">${textoBoton}</button>
        <button class='btn-carrito' data-id=${producto.id}>añadir al carrito</button>
    </div>`
    });
    const botonFav = document.querySelectorAll('.btn-fav');
    botonFav.forEach(b =>{
        b.addEventListener('click',function(e){
            const idCapturado = e.target.getAttribute('data-id');
           
            if(favoritos.includes(idCapturado)){
            favoritos = favoritos.filter(id=> id!=idCapturado);
            
            }else {
                favoritos.push(idCapturado);
            }
            localStorage.setItem('misFavoritos',JSON.stringify(favoritos));
            mostrarProductos(listaProductos);
        });

    });
    const botonCarrito = document.querySelectorAll('.btn-carrito');
    botonCarrito.forEach(boton=>{
    boton.addEventListener('click',function(e){
    const idCapturado = e.target.getAttribute('data-id');
    const productoEnElCarrito = carrito.find(p => p.id === idCapturado);
    if(productoEnElCarrito){
        productoEnElCarrito.cantidad++;
    }else{
        const productoNuevo = {
            id: idCapturado,
            cantidad : 1
        }
        carrito.push(productoNuevo);
    }
    localStorage.setItem('carrito',JSON.stringify(carrito));
    renderizarCarrito();
    });
    })
};

function renderizarCarrito(){
    contenedorCarrito.innerHTML = '';
    carrito.forEach(carro =>{
    const productoOriginal = listaProductos.find(p=>p.id.toString()===carro.id);
        contenedorCarrito.innerHTML +=`
        <p>${productoOriginal.nombre}x${carro.cantidad}</p>;
        `
    })
   
}
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
const temaEscogido = sessionStorage.getItem('tema');
function aplicarTema(tema){
    if(tema === 'oscuro'){
        document.body.classList.add('dark-mode');
    sessionStorage.setItem('tema','oscuro');
    }else {
          document.body.classList.remove('dark-mode');
    sessionStorage.setItem('tema','claro');
    }
}
aplicarTema(temaEscogido);
botonClaro.addEventListener('click',function(){
    aplicarTema('claro');
});
botonOscuro.addEventListener('click',function(){
    aplicarTema('oscuro');
});
vaciarCarrito.addEventListener('click',function(){
    carrito = [];
    localStorage.setItem('carrito',JSON.stringify(carrito));
    renderizarCarrito();
});
buscador.addEventListener('input',function(e){
    const termino = e.target.value.toLowerCase();
    const listaFiltrada = listaProductos.filter(p => p.nombre.toLowerCase() .includes(termino));
    if(listaFiltrada.length === 0){
        contenedor.innerHTML = '';
        contenedor.innerHTML +=`<p> no se encontraron productos con ese nombre</p>`
    }else {
        mostrarProductos(listaFiltrada);
    }
});

