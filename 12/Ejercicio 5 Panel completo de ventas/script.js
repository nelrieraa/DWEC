let detallesPedidos = [];
let pedidosGlobales = [];
let productosGlobales = [];
let usuariosGlobales = [];
const selector = document.getElementById('user-select');
const dashboard = document.getElementById('dashboard');
async function cargarDatosIniciales(){
   const [res1,res2,res3,res4] = await Promise.all([fetch("./data/detalles_pedido.json").then(res1 => res1.json()),fetch("./data/pedidos.json").then(res2 => res2.json()),fetch("./data/productos.json").then(res3 => res3.json()),fetch("./data/usuarios.json").then(res4 => res4.json())]);
    detallesPedidos = res1;
    pedidosGlobales = res2;
    productosGlobales = res3;
    usuariosGlobales = res4;
    poblarSelector();
    const loader = document.getElementById('loader');
    loader.classList.add('hidden');
    const main = document.getElementById('main-controls');
    main.classList.remove('hidden');
}
function poblarSelector(){
    usuariosGlobales.forEach(usuario => {
        const option = document.createElement('option');
        option.value = usuario.id;
        option.textContent = usuario.nombre;
        selector.appendChild(option);
    })
}
function mostrarDashboardUsuario(idSeleccionado){
    dashboard.classList.remove('hidden');
    const pedidosFiltrados = pedidosGlobales.filter(p => p.usuarioId === idSeleccionado);
    const usuario = usuariosGlobales.find(p => p.id === idSeleccionado);
    let gastoTotalGlobal = 0;
    let htmlPedidos = '';
    pedidosFiltrados.forEach(p => {
        const detallesDeEstePedido = detallesPedidos.filter(detalle => detalle.pedidoId === p.id);
        let totalEstePedido = 0;
        htmlPedidos += `
        <div>
        Pedido del ${p.fecha}`;
        detallesDeEstePedido.forEach(detalle => {
            const producto = productosGlobales.find(productos => productos.id === detalle.productoId);
            let subtotal = detalle.cantidad * producto.precio;
            totalEstePedido += subtotal;
            gastoTotalGlobal += subtotal;
            htmlPedidos += `<li>${producto.nombre} - Cantidad: ${detalle.cantidad} x ${producto.precio}€</li>`
        });
        htmlPedidos += `<strong>Total pedido: ${totalEstePedido.toFixed(2)}€</strong>`;
        htmlPedidos += `</div>`;
       

    })
    const contenedor = document.getElementById('orders-list');
    contenedor.innerHTML = htmlPedidos;
    document.getElementById('user-info').innerHTML = `
    <h2>${usuario.nombre}</h2>
    <p>Email: ${usuario.email}</p>
`;


document.getElementById('user-summary').innerHTML = `
    <h3>Gasto Total Acumulado</h3>
    <p class="total-amount">${gastoTotalGlobal.toFixed(2)}€</p>
`;
};
selector.addEventListener('change',function(e){
    const id = Number(e.target.value);
    if(id) mostrarDashboardUsuario(id);
});
cargarDatosIniciales();