let listaProductos = [];
const selector = document.getElementById('category-select');
const botonAsc = document.getElementById('sort-asc');
const botonDesc = document.getElementById('sort-desc');
const botonClaro = document.getElementById('btn-light');
const botonOscuro = document.getElementById('btn-dark');
const contenedor = document.getElementById('products-container');


let favoritos = JSON.parse(localStorage.getItem('misFavoritos')) || [];

async function cargarDatos() {
    const respuesta = await fetch('./data/productos.json');
    listaProductos = await respuesta.json();
    mostrarProductos(listaProductos);
    obtenerCategorias();
}

function mostrarProductos(datos) {
    contenedor.innerHTML = '';
    datos.forEach(producto => {
        const esFavorito = favoritos.includes(producto.id.toString());
        const textoBoton = esFavorito ? "En favoritos" : "Añadir a favoritos";
        const claseExtra = esFavorito ? "card-favorito" : "";

        contenedor.innerHTML += `
            <div class="product-card ${claseExtra}">
                <h3>${producto.nombre}</h3>
                <p class="price">${producto.precio} €</p>
                <p class="category">${producto.categoria}</p>
                <button class='btn-fav' data-id="${producto.id}">${textoBoton}</button>
            </div>`;
    });


    const botonesFav = document.querySelectorAll('.btn-fav');
    botonesFav.forEach(btn => {
        btn.addEventListener('click', function(e) {
            const idCapturado = e.target.getAttribute('data-id');
            if (favoritos.includes(idCapturado)) {
                favoritos = favoritos.filter(id => id !== idCapturado);
            } else {
                favoritos.push(idCapturado);
            }
            localStorage.setItem('misFavoritos', JSON.stringify(favoritos));
            mostrarProductos(listaProductos);
        });
    });
}

function obtenerCategorias() {
    const todasLasCategorias = listaProductos.map(p => p.categoria);
    const categoriasUnicas = [...new Set(todasLasCategorias)];
    categoriasUnicas.forEach(cat => {
        selector.innerHTML += `<option value="${cat}">${cat}</option>`;
    });
}


selector.addEventListener('change', (e) => {
    const categoria = e.target.value;
    if (categoria === 'todas') {
        mostrarProductos(listaProductos);
    } else {
        const filtrados = listaProductos.filter(p => p.categoria === categoria);
        mostrarProductos(filtrados);
    }
});


botonAsc.addEventListener('click', () => {
    const ordenados = [...listaProductos].sort((a, b) => a.precio - b.precio);
    mostrarProductos(ordenados);
});

botonDesc.addEventListener('click', () => {
    const ordenados = [...listaProductos].sort((a, b) => b.precio - a.precio);
    mostrarProductos(ordenados);
});


const temaEscogido = sessionStorage.getItem('tema');

function aplicarTema(tema) {
    if (tema === 'oscuro') {
        document.body.classList.add('dark-mode');
        sessionStorage.setItem('tema', 'oscuro');
    } else {
        document.body.classList.remove('dark-mode');
        sessionStorage.setItem('tema', 'claro');
    }
}

aplicarTema(temaEscogido);

botonClaro.addEventListener('click', () => aplicarTema('claro'));
botonOscuro.addEventListener('click', () => aplicarTema('oscuro'));

cargarDatos();