const tabla = document.getElementById('events-grid');
function normalizar(fechaInput){
    if (typeof fechaInput === 'object') {
        
        return new Date(fechaInput.año, fechaInput.mes, fechaInput.dia);
    }
    return new Date(fechaInput);
}
async function cargarDatos() {
    const respuesta = await fetch('evento.json');
    const datos = await respuesta.json();
    datos.sort((a,b)=>{
        return normalizar(a.fecha) - normalizar(b.fecha);
    });
    datos.forEach(e => {
        let fechaFinal = normalizar(e.fecha);
        if(typeof e.fecha === 'object'){
            fechaFinal = new Date(e.fecha.año,e.fecha.mes,e.fecha.dia);
        }else{
            fechaFinal = new Date(e.fecha);
        }
        
        
        const tarjeta = document.createElement('div');
        tarjeta.className = 'event-card';
        tabla.appendChild(tarjeta);
        const actualizar = () => {
            const ahora = Date.now();
            const diff = fechaFinal-ahora;
            if(diff<0){
                tarjeta.classList.add('expired');
                tarjeta.innerHTML = `<p> Evento Finalizado</p>`
                return;
            }
            const dias = Math.floor(diff/(1000*60*60*24));
            const horas = Math.floor((diff/(1000*60*60))%24);
            const minutos = Math.floor((diff/(1000*60))%60);
            const segundos = Math.floor((diff/1000)%60);
            tarjeta.innerHTML = `
                <div class="event-name">${e.nombre}</div>
                <div class="event-desc">${e.descripcion}</div>
                <div class="countdown">
                    <div class="time-unit">
                        <span>${String(dias).padStart(2, '0')}</span>
                        <label>Días</label>
                    </div>
                    <div class="time-unit">
                        <span>${String(horas).padStart(2, '0')}</span>
                        <label>Horas</label>
                    </div>
                    <div class="time-unit">
                        <span>${String(minutos).padStart(2, '0')}</span>
                        <label>Mins</label>
                    </div>
                    <div class="time-unit">
                        <span>${String(segundos).padStart(2, '0')}</span>
                        <label>Segs</label>
                    </div>
                </div>
            `;
        };
        actualizar();
        setInterval(actualizar,1000);
    });
}
document.addEventListener('DOMContentLoaded',cargarDatos);
