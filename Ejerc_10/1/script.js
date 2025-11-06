
document.addEventListener('DOMContentLoaded', () => {
  const svLoading = document.getElementById('sv-loading');
  const svError = document.getElementById('sv-error');
  const svContenido = document.getElementById('sv-contenido');
  const svTimestamp = document.getElementById('sv-timestamp');
  const svOxigeno = document.getElementById('sv-oxigeno');
  const svTemperatura = document.getElementById('sv-temperatura');
  const svPresion = document.getElementById('sv-presion');

  const invLoading = document.getElementById('inv-loading');
  const invError = document.getElementById('inv-error');
  const selectItem = document.getElementById('select-item');
  const disponible = document.getElementById('disponible');
  const inputCantidad = document.getElementById('input-cantidad');
  const btnCalcular = document.getElementById('btn-calcular');
  const resultadosDiv = document.getElementById('autonomia-resultados');

  let inventarioXML = null;

  
  function cargarSoporteVital() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'soporte_vital.xml', true);
    xhr.onreadystatechange = () => {
      if (xhr.readyState !== 4) return;
      svLoading.classList.add('d-none');

      if (xhr.status === 200) {
        const xml = xhr.responseXML;
        if (!xml) {
          svError.textContent = 'Error: el archivo soporte_vital.xml no es un XML válido.';
          svError.classList.remove('d-none');
          return;
        }
        const mediciones = xml.getElementsByTagName('medicion');
        if (mediciones.length === 0) {
          svError.textContent = 'No hay mediciones en soporte_vital.xml.';
          svError.classList.remove('d-none');
          return;
        }
      
        const ultima = mediciones[0];
        const ts = ultima.getAttribute('timestamp') || 'desconocido';
        const ox = ultima.getElementsByTagName('oxigeno')[0]?.textContent ?? 'N/A';
        const temp = ultima.getElementsByTagName('temperatura')[0]?.textContent ?? 'N/A';
        const pres = ultima.getElementsByTagName('presion')[0]?.textContent ?? 'N/A';

        svTimestamp.textContent = ts;
        svOxigeno.textContent = ox;
        svTemperatura.textContent = temp;
        svPresion.textContent = pres;

        svContenido.classList.remove('d-none');
        svError.classList.add('d-none');

      } else if (xhr.status === 404) {
        svError.textContent = 'Archivo soporte_vital.xml no encontrado (404).';
        svError.classList.remove('d-none');
      } else {
        svError.textContent = `Error al cargar soporte vital (status ${xhr.status}).`;
        svError.classList.remove('d-none');
      }
    };
    xhr.send();
  }

 
  function cargarInventario() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'inventario.xml', true);
    xhr.onreadystatechange = () => {
      if (xhr.readyState !== 4) return;
      invLoading.classList.add('d-none');

      if (xhr.status === 200) {
        inventarioXML = xhr.responseXML;
        if (!inventarioXML) {
          invError.textContent = 'Error: inventario.xml no es un XML válido.';
          invError.classList.remove('d-none');
          return;
        }

        const items = inventarioXML.getElementsByTagName('item');
        if (items.length === 0) {
          invError.textContent = 'No hay ítems en inventario.xml.';
          invError.classList.remove('d-none');
          return;
        }

       
        selectItem.innerHTML = '<option value="">-- Selecciona un ítem --</option>';
        Array.from(items).forEach((it, idx) => {
          const id = it.getAttribute('id') || `item${idx}`;
          const nombre = it.getElementsByTagName('nombre')[0]?.textContent ?? `Ítem ${idx}`;
          const option = document.createElement('option');
          option.value = id;
          option.textContent = `${nombre} (${id})`;
         
          option.dataset.index = idx; 
          selectItem.appendChild(option);
        });

        invError.classList.add('d-none');
      } else if (xhr.status === 404) {
        invError.textContent = 'Archivo inventario.xml no encontrado (404).';
        invError.classList.remove('d-none');
      } else {
        invError.textContent = `Error al cargar inventario (status ${xhr.status}).`;
        invError.classList.remove('d-none');
      }
    };
    xhr.send();
  }

  selectItem.addEventListener('change', () => {
    const idx = selectItem.selectedOptions[0]?.dataset?.index;
    if (idx === undefined || inventarioXML === null) {
      disponible.textContent = 'Seleccione un ítem para ver disponibilidad.';
      return;
    }
    const item = inventarioXML.getElementsByTagName('item')[idx];
    const cantidad = item.getElementsByTagName('cantidad')[0]?.textContent ?? '0';
    const unidad = item.getAttribute('unidad') ?? '';
    disponible.innerHTML = `<strong>Disponible:</strong> ${cantidad} ${unidad}`;
   
    inputCantidad.value = cantidad;
  });

  
  btnCalcular.addEventListener('click', () => {
    resultadosDiv.innerHTML = ''; // limpiar
    if (!inventarioXML) {
      resultadosDiv.innerHTML = `<div class="alert alert-warning">No hay datos de inventario cargados.</div>`;
      return;
    }
    const items = inventarioXML.getElementsByTagName('item');
    if (items.length === 0) {
      resultadosDiv.innerHTML = `<div class="alert alert-warning">Inventario vacío.</div>`;
      return;
    }

    const crew = 4;
    const ul = document.createElement('div');
    ul.className = 'list-group';

    Array.from(items).forEach((it) => {
      const nombre = it.getElementsByTagName('nombre')[0]?.textContent ?? 'Sin nombre';
      const cantidadStr = it.getElementsByTagName('cantidad')[0]?.textContent ?? '0';
      const consumoStr = it.getElementsByTagName('consumo')[0]?.textContent ?? '0';
      const unidad = it.getAttribute('unidad') ?? '';
      const cantidad = parseFloat(cantidadStr) || 0;
      const consumo = parseFloat(consumoStr) || 0;

      let dias = 'Indeterminado';
      if (consumo > 0) {
        const diariaTotal = consumo * crew; 
        dias = Math.floor(cantidad / diariaTotal);
      } else {
        dias = 'Consumo por persona = 0 (no calculable)';
      }

      const itemDiv = document.createElement('div');
      itemDiv.className = 'list-group-item';
      itemDiv.innerHTML = `<div class="d-flex w-100 justify-content-between">
          <h6 class="mb-1">${nombre}</h6>
          <small class="text-muted">${cantidad} ${unidad}</small>
        </div>
        <p class="mb-1">Consumo por persona: ${consumoStr} ${unidad}/día</p>
        <small>Autonomía estimada para ${crew} personas: <strong>${dias} días</strong></small>`;
      ul.appendChild(itemDiv);
    });

    resultadosDiv.appendChild(ul);
  });

  
  cargarSoporteVital();
  cargarInventario();

 
  inputCantidad.addEventListener('input', () => {
   
  });

  if (!selectItem.options.length) {
    selectItem.innerHTML = '<option>-- Cargando... --</option>';
  }
});
