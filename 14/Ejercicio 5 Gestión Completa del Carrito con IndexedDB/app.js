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
let db;
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
    const transaccion = db.transaction(["carrito"],"readwrite");
    const store = transaccion.objectStore("carrito");
    const request = store.get(idCapturado);
    request.onsuccess = function(e){
        const resultado = e.target.result;
        if(resultado === undefined){
            store.add({productoId : idCapturado,cantidad:1});
        }else {
            resultado.cantidad++;
            store.put(resultado);
        }
        transaccion.oncomplete = () => { renderizarCarrito(); };
    }
    renderizarCarrito();
    });
    })
};
 const almacen = window.indexedDB.open("tiendaDB",2);
    almacen.onupgradeneeded = function(e){
         db = e.target.result;
         let carrito = db.createObjectStore("carrito",{keyPath : "productoId"})
    }
    almacen.onsuccess = function(e){
        db = e.target.result;
        renderizarCarrito();
    }
function renderizarCarrito(){
    const transaccion = db.transaction(["carrito"],"readonly");
    const store = transaccion.objectStore("carrito");
    const pedido = store.getAll();
    pedido.onsuccess = function(item){
        const objeto = item.target.result;
        contenedorCarrito.innerHTML = '';
        objeto.forEach(e =>{
            const objetoCarrito = listaProductos.find(n => e.productoId == n.id);
            contenedorCarrito.innerHTML += `<span>${objetoCarrito.nombre}
             x ${e.cantidad}
             </span> <button class="btn-mas" data-id="${e.productoId}"> 
             + </button> <button class="btn-menos" data-id="${e.productoId}"> 
             - </button> <button class="btn-eliminar" data-id="${e.productoId}">
              x </button>`;

        });
    const sumarBoton = document.querySelectorAll('.btn-mas');
    const restarBoton = document.querySelectorAll('.btn-menos');
    sumarBoton.forEach(e => {
    e.addEventListener('click',function(e){
    const id = e.target.getAttribute('data-id');
    const transaccionSumar = db.transaction(["carrito"],"readwrite");
    const store = transaccionSumar.objectStore("carrito");
    const objeto = store.get(id);
    objeto.onsuccess = function(e){
        const datos = e.target.result;
        datos.cantidad++;
        store.put(datos);
    }
    
    transaccionSumar.oncomplete = () =>{renderizarCarrito();};
    });
    });
   restarBoton.forEach(e =>{
    e.addEventListener('click',function(e){
        const id = e.target.getAttribute('data-id');
        const transaccionRestar = db.transaction(["carrito"],"readwrite");
        const store = transaccionRestar.objectStore("carrito");
        const objeto = store.get(id);
        objeto.onsuccess = function(e){
            const datos = e.target.result;
            if(datos.cantidad >1){
            datos.cantidad--;
            store.put(datos);
        }else{
            store.delete(id);
        }
        }
        transaccionRestar.oncomplete = () =>{renderizarCarrito();};
    });
   });
   
    const eliminarBoton = document.querySelectorAll('.btn-eliminar');
    eliminarBoton.forEach(e =>{
        e.addEventListener('click',function(e){
        const id = e.target.getAttribute('data-id');
        const transaccion = db.transaction(["carrito"],"readwrite");
        const store = transaccion.objectStore("carrito");
        store.delete(id);
        transaccion.oncomplete = () =>{renderizarCarrito();};
    });

    })
   
    };

   
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
   const transaccion = db.transaction(["carrito"],"readwrite");
   const store = transaccion.objectStore("carrito");
   store.clear();
   transaccion.oncomplete = () =>{renderizarCarrito();};
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

