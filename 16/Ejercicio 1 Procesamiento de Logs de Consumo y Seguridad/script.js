const tabla = document.getElementById('log-body');
let lista = [];
let total = 0;
async function cargarDatos() {
   const respuesta = await fetch('logs.txt');
    const respuestaArray = (await respuesta.text()).split('\n');
    respuestaArray.forEach(e => {
        const fila = document.createElement('tr');
        const linea =  e.trim();
        const esError = linea.includes('ERROR');
        let posGuion = linea.indexOf('-');
        let posBarra = linea.indexOf('|');
        const idExtraido = linea.slice(posGuion+1,posBarra).trim();
        let partes = linea.split('|');
        const usuarioMinusculas = partes[1].replace('USER:','').trim().toLowerCase();
        const consumo = partes[2].split(':');
        const valorLimpio = consumo[1].replace('bytes','').trim();
        const valorNumerico = Number(valorLimpio);
        const consumoMB = (valorNumerico / (1024*1024)).toFixed(2);
        total += Number(consumoMB);
        if(esError){
            fila.classList.add('row-error');
        }
            fila.innerHTML = `
    <td>${idExtraido}</td>
    <td>${usuarioMinusculas}</td>
    <td>${consumoMB}</td>
    <td>${esError ? 'ERROR' : 'OK'}</td>
`;
        
        tabla.appendChild(fila);
        
    });
    document.getElementById('total-consumption').textContent = total.toFixed(2);
        

}

document.addEventListener('DOMContentLoaded',cargarDatos);