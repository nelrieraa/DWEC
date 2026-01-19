const div = document.getElementById('loading');
const container = document.getElementById('panel-pedidos');
async function cargarDatos() {
    try {
       
        const [res1, res2, res3] = await Promise.all([
            fetch('./data/detalles_pedido.json'),
            fetch('./data/pedidos.json'),
            fetch('./data/productos.json')
        ]);

        
        const [detallesPedidos, pedidos, productos] = await Promise.all([
            res1.json(),
            res2.json(),
            res3.json()
        ]);

       
        const pedidosEnriquecidos = pedidos.map(pedido => {
            
          
            const misDetallesFiltrados = detallesPedidos.filter(detP => detP.pedidoId === pedido.id);

          
            const detallesConNombre = misDetallesFiltrados.map(det => {
                const productoEncontrado = productos.find(p => p.id === det.productoId);
                return {
                    ...det,
                    nombreProducto: productoEncontrado ? productoEncontrado.nombre : 'Producto no encontrado'
                };
            });

            
            const total = misDetallesFiltrados.reduce((acc, det) => acc + (det.cantidad * det.precioUnitario), 0);

          
            return {
                ...pedido,
                detalles: detallesConNombre,
                totalPedido: total
            };
        }); 

       
        console.log("Datos listos:", pedidosEnriquecidos);
        mostrarPanel(pedidosEnriquecidos);

    } catch (error) {
        console.error("Error en la carga:", error);
    }
};
function mostrarPanel(pedidos){
    container.innerHTML = '';
    div.style.display ='none';
    pedidos.forEach(p =>{
        const listaHTML = p.detalles.map(det => 
    `<li>${det.cantidad} x ${det.nombreProducto} - ${det.precioUnitario} €</li>`
).join('');
container.innerHTML += `
        <div class="pedido-card">
            <div class="pedido-header">
                <h2>Pedido #${p.id}</h2>
                <p>Fecha: ${p.fecha}</p>
                <span class="estado">${p.estado}</span>
            </div>
            
            <ul>
                ${listaHTML}
            </ul>

            <div class="total">
                Total: ${p.totalPedido.toFixed(2)} €
            </div>
        </div>`
    });
   
}
cargarDatos();