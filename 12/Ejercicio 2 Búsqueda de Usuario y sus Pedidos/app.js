const formulario = document.getElementById('form-busqueda');
const inputEmail = document.getElementById('input-email');
const resultadoContainer = document.getElementById('resultado-container');
const mensajeError = document.getElementById('mensaje-error');
formulario.addEventListener('submit',function(e){
    e.preventDefault();
    const email = inputEmail.value.trim();
    buscarUsuarioYPedidos(email);
    
});
async function buscarUsuarioYPedidos(email) {
        const respuesta = await fetch('./data/usuarios.json');
        const usuarios = await respuesta.json();
        const usuariosEncontrados = usuarios.find(e => e.email === email);
        if(!usuariosEncontrados){
           const mensajeError = document.getElementById('mensaje-error');
           mensajeError.classList.remove('hidden');
           resultadoContainer.innerHTML = '';
           return mensajeError.innerHTML = `<p>Usuario no encontrado</p>`;
        }
        const respuestaPedidos = await fetch('./data/pedidos.json');
        const  pedidos = await respuestaPedidos.json();
        const pedidosFiltrados = pedidos.filter(p => p.usuarioId === usuariosEncontrados.id);
        mostrarResultados(usuariosEncontrados,pedidosFiltrados);
    }
function mostrarResultados(usuario,pedidos){
    resultadoContainer.innerHTML = '';
    mensajeError.classList.add('hidden');
    resultadoContainer.innerHTML += `<div>
        <h3 class="name">${usuario.nombre}</h3>
        <p class = "fechaRegistro">${usuario.fechaRegistro}</p>
    </div>`;
    if(pedidos.length === 0){
        mensajeError.innerHTML = `<p>este usuario no tiene pedidos</p>`
    }else{
        let listaHTML = '<ul class="order-list">';
    pedidos.forEach(p => { // ¡Con E mayúscula!
        listaHTML += `
            <li class="order-item">
                <span>ID: ${p.id} - ${p.fecha}</span>
                <span class="status">${p.estado}</span>
            </li>`;
    });
    listaHTML += '</ul>';
    resultadoContainer.innerHTML += listaHTML;
    }
}