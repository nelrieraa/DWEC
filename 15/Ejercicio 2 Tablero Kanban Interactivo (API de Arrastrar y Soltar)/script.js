const tarjetas = document.querySelectorAll('.task-card');
const columnas = document.querySelectorAll('.column');
tarjetas.forEach(tarjeta =>{
    tarjeta.addEventListener('dragstart',function(e){
        tarjeta.classList.add('dragging');
        const idTarjeta = tarjeta.id;
        const estado = tarjeta.closest('.column').dataset.status;
        const info = {
            id:idTarjeta,
            status : estado
        }
        e.dataTransfer.setData('application/json',JSON.stringify(info));
        
    });
    tarjeta.addEventListener('dragend',function(){
        tarjeta.classList.remove('dragging')
    })
});
columnas.forEach(columna =>{
columna.addEventListener('dragover',function(e){
    e.preventDefault();
    columna.classList.add('drag-over');
    const lista = columna.querySelector('.task-list');
    const tarjetaSiendoArrastrada = document.querySelector('.dragging');
    

    const elementoPosterior = obtenerElementoTrasCursor(lista, e.clientY);
    
    if (elementoPosterior == null) {
       
        lista.appendChild(tarjetaSiendoArrastrada);
    } else {
        
        lista.insertBefore(tarjetaSiendoArrastrada, elementoPosterior);
    }
});
columna.addEventListener('dragleave',function(){
    columna.classList.remove('drag-over');
});
columna.addEventListener('drop',function(e){
 const datos = JSON.parse(e.dataTransfer.getData('application/json'));
 const tarjeta = document.getElementById(datos.id);
 const lista = columna.querySelector('.task-list');
 lista.appendChild(tarjeta);
})
});
function obtenerElementoTrasCursor(lista, y) {

    const tarjetasNoArrastradas = [...lista.querySelectorAll('.task-card:not(.dragging)')];

    return tarjetasNoArrastradas.reduce((masCercano, hijo) => {
        const caja = hijo.getBoundingClientRect();
        
        const offset = y - caja.top - caja.height / 2;

       
        if (offset < 0 && offset > masCercano.offset) {
            return { offset: offset, element: hijo };
        } else {
            return masCercano;
        }
    }, { offset: Number.NEGATIVE_INFINITY }).element;
}

