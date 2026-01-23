async function procesarAuditoria() {
    const tableBody = document.getElementById('logTableBody');
    const totalDisplay = document.getElementById('totalConsumo');
    let consumoTotalMB = 0;

    try {
        
        const response = await fetch('logs.txt');
        if (!response.ok) throw new Error('No se pudo encontrar el archivo de logs.');
        
        const data = await response.text();
        const lineas = data.split('\n');

        lineas.forEach(linea => {
            
            const cleanLine = linea.trim();
            if (cleanLine === "") return; 

            const partes = cleanLine.split('|');

           
            const rawID = partes[0].trim();
            const idSesion = rawID.slice(rawID.indexOf('-') + 1);

            
            const rawUser = partes[1].trim().replace('user:', '').trim();
            const userLower = rawUser.toLowerCase();

        
            const rawStatus = partes[3].trim();
            const isError = rawStatus.includes('ERROR');

        
            const rawConsumo = partes[2].replace('consumo:', '').replace('bytes', '').trim();
            const bytes = parseFloat(rawConsumo); 
            const megabytes = bytes / (1024 * 1024);
            
            consumoTotalMB += megabytes;

 
            const row = document.createElement('tr');
            if (isError) row.classList.add('row-error');

            row.innerHTML = `
                <td>#${idSesion}</td>
                <td>${userLower}</td>
                <td>${megabytes.toFixed(2)} MB</td>
                <td><span class="${isError ? 'status-badge badge-error' : ''}">${rawStatus.replace('status:', '')}</span></td>
            `;

            tableBody.appendChild(row);
        });

        
        totalDisplay.innerText = `Consumo Total Acumulado: ${consumoTotalMB.toFixed(2)} MB`;

    } catch (error) {
        console.error("Error al procesar logs:", error);
        totalDisplay.innerHTML = `<span style="color:red">Error de Sistema: ${error.message}</span>`;
    }
}


procesarAuditoria();