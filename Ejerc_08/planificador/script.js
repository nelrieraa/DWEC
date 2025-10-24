
document.addEventListener('DOMContentLoaded', () => {

  let itinerario = [];

  const destinoSelect = document.getElementById('destinoSelect');
  const tiposContainer = document.getElementById('tiposContainer');
  const precioRange = document.getElementById('precioRange');
  const precioValor = document.getElementById('precioValor');
  const actividadesGrid = document.getElementById('actividadesGrid');
  const itinerarioList = document.getElementById('itinerarioList');
  const costeTotalEl = document.getElementById('costeTotal');
  const duracionTotalEl = document.getElementById('duracionTotal');
  const numActividadesEl = document.getElementById('numActividades');
  const resetFiltrosBtn = document.getElementById('resetFiltros');

 
  const reservaForm = document.getElementById('reservaForm');
  const nombreInput = document.getElementById('nombre');
  const emailInput = document.getElementById('email');
  const fechaInput = document.getElementById('fechaInicio');
  const codigoInput = document.getElementById('codigo');
  const seguroWrapper = document.getElementById('seguroWrapper');
  const seguroInput = document.getElementById('seguro');
  const erroresGlobales = document.getElementById('erroresGlobales');

  const filtros = {
    destino: 'Todos',
    tipos: new Set(),
    precioMax: 0
  };

  
  function init() {
    if (!Array.isArray(actividades) || actividades.length === 0) {
      actividadesGrid.innerHTML = '<p>No hay actividades definidas.</p>';
      return;
    }

  
    const destinos = Array.from(new Set(actividades.map(a => a.destino))).sort();
    destinos.forEach(d => {
      const opt = document.createElement('option');
      opt.value = d;
      opt.textContent = d;
      destinoSelect.appendChild(opt);
    });

    
    const tipos = Array.from(new Set(actividades.map(a => a.tipo))).sort();
    tipos.forEach(t => {
      const id = 'tipo-' + t.replace(/\s+/g, '-');
      const wrapper = document.createElement('div');
      wrapper.className = 'form-check';
      wrapper.innerHTML = `
        <input class="form-check-input tipo-chk" type="checkbox" id="${id}" value="${t}">
        <label class="form-check-label" for="${id}">${t}</label>
      `;
      tiposContainer.appendChild(wrapper);
    });

    
    const precios = actividades.map(a => a.precio);
    const maxPrecio = Math.ceil(Math.max(...precios) * 1.2);
    precioRange.max = maxPrecio;
    precioRange.value = maxPrecio;
    filtros.precioMax = maxPrecio;
    precioValor.textContent = precioRange.value;

   
    destinoSelect.addEventListener('change', () => {
      filtros.destino = destinoSelect.value;
      aplicarFiltros();
    });

    precioRange.addEventListener('input', (e) => {
      filtros.precioMax = parseFloat(e.target.value);
      precioValor.textContent = e.target.value;
      aplicarFiltros();
    });

    tiposContainer.addEventListener('change', () => {
      const checks = tiposContainer.querySelectorAll('.tipo-chk:checked');
      filtros.tipos = new Set(Array.from(checks).map(c => c.value));
      aplicarFiltros();
    });

    resetFiltrosBtn.addEventListener('click', () => {
      destinoSelect.value = 'Todos';
      precioRange.value = precioRange.max;
      precioValor.textContent = precioRange.value;
      filtros.destino = 'Todos';
      filtros.precioMax = parseFloat(precioRange.value);
      tiposContainer.querySelectorAll('.tipo-chk').forEach(chk => chk.checked = false);
      filtros.tipos = new Set();
      aplicarFiltros();
    });

    
    aplicarFiltros();
    actualizarItinerarioDOM();
  }

  
  function aplicarFiltros() {
    let resultado = [...actividades];

    // Filtrar por destino
    if (filtros.destino && filtros.destino !== 'Todos') {
      resultado = resultado.filter(a => a.destino === filtros.destino);
    }

    
    if (filtros.tipos && filtros.tipos.size > 0) {
      resultado = resultado.filter(a => filtros.tipos.has(a.tipo));
    }

 
    resultado = resultado.filter(a => a.precio <= filtros.precioMax);

    renderActividades(resultado);
  }

  function renderActividades(lista) {
    actividadesGrid.innerHTML = '';
    if (lista.length === 0) {
      actividadesGrid.innerHTML = `<p class="text-muted">No se encontraron actividades.</p>`;
      return;
    }

    lista.forEach(a => {
      const col = document.createElement('div');
      col.className = 'col-12';
      col.innerHTML = `
        <div class="card activity-card">
          <div class="row g-0">
            <div class="col-5">
              <img src="${a.imagen}" alt="${a.nombre}" class="img-fluid rounded-start">
            </div>
            <div class="col-7">
              <div class="card-body">
                <h6 class="card-title">${a.nombre}</h6>
                <p class="card-text mb-1 small text-muted">${a.destino} • ${a.tipo}</p>
                <p class="card-text mb-2"><strong>${a.precio.toFixed(2)} €</strong> • ${a.duracionHoras} h</p>
                <button class="btn btn-sm btn-primary btn-add" data-id="${a.id}">Añadir al Itinerario</button>
              </div>
            </div>
          </div>
        </div>
      `;
      actividadesGrid.appendChild(col);
    });

   
    actividadesGrid.querySelectorAll('.btn-add').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = parseInt(e.currentTarget.dataset.id, 10);
        añadirActividad(id);
      });
    });
  }


  function añadirActividad(id) {
    const act = actividades.find(a => a.id === id);
    if (!act) return;
    if (itinerario.some(i => i.id === id)) {
      
      window.alert('Actividad ya añadida al itinerario.');
      return;
    }
    itinerario.push(act);
    actualizarItinerarioDOM();
  }

  function quitarActividad(id) {
    itinerario = itinerario.filter(i => i.id !== id);
    actualizarItinerarioDOM();
  }


  function actualizarItinerarioDOM() {
    itinerarioList.innerHTML = '';
    if (itinerario.length === 0) {
      itinerarioList.innerHTML = '<li class="list-group-item text-muted">No hay actividades en el itinerario.</li>';
    } else {
      itinerario.forEach(i => {
        const li = document.createElement('li');
        li.className = 'list-group-item d-flex justify-content-between align-items-center';
        li.innerHTML = `
          <div>
            <div class="fw-semibold">${i.nombre}</div>
            <small class="text-muted">${i.destino} • ${i.tipo}</small>
          </div>
          <div>
            <span class="me-2"><strong>${i.precio.toFixed(2)} €</strong></span>
            <button class="btn btn-sm btn-outline-danger btn-quit" data-id="${i.id}">Quitar</button>
          </div>
        `;
        itinerarioList.appendChild(li);
      });

   
      itinerarioList.querySelectorAll('.btn-quit').forEach(b => {
        b.addEventListener('click', (e) => {
          const id = parseInt(e.currentTarget.dataset.id, 10);
          quitarActividad(id);
        });
      });
    }


    const total = itinerario.reduce((s, x) => s + x.precio, 0);
    const dur = itinerario.reduce((s, x) => s + x.duracionHoras, 0);
    costeTotalEl.textContent = total.toFixed(2);
    duracionTotalEl.textContent = dur;
    numActividadesEl.textContent = itinerario.length;

    if (total > 1000) {
      seguroWrapper.style.display = 'block';
      seguroInput.required = true;
    } else {
      seguroWrapper.style.display = 'none';
      seguroInput.required = false;
      seguroInput.checked = false;
      document.getElementById('err-seguro').textContent = '';
    }
  }

 
  function limpiarErrores() {
    document.querySelectorAll('.invalid-feedback').forEach(el => el.textContent = '');
    erroresGlobales.innerHTML = '';
  }

  function esFechaNoPasada(fechaStr) {
    if (!fechaStr) return false;
   
    const f = new Date(fechaStr + 'T00:00:00');
    const hoy = new Date();
    hoy.setHours(0,0,0,0);
    return f >= hoy;
  }

  function validarCodigo(cod) {
    if (!cod) return true;
    return /^[A-Za-z]{4}\d{2}$/.test(cod);
  }

  reservaForm.addEventListener('submit', (e) => {
    e.preventDefault();
    limpiarErrores();

    let ok = true;

  
    if (itinerario.length === 0) {
      ok = false;
      erroresGlobales.innerHTML = '<div class="alert alert-danger py-2">El itinerario no puede estar vacío.</div>';
    }


    const nombre = nombreInput.value.trim();
    if (!nombre) {
      ok = false;
      document.getElementById('err-nombre').textContent = 'Introduce el nombre completo.';
    }

  
    const email = emailInput.value.trim();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      ok = false;
      document.getElementById('err-email').textContent = 'Introduce un email válido.';
    }


    const fecha = fechaInput.value;
    if (!esFechaNoPasada(fecha)) {
      ok = false;
      document.getElementById('err-fecha').textContent = 'La fecha de inicio no puede ser pasada y es obligatoria.';
    }


    const codigo = codigoInput.value.trim();
    if (!validarCodigo(codigo)) {
      ok = false;
      document.getElementById('err-codigo').textContent = 'El código debe tener 4 letras seguidas de 2 números (ej: ABCD25).';
    }


    const total = parseFloat(costeTotalEl.textContent) || 0;
    if (total > 1000 && !seguroInput.checked) {
      ok = false;
      document.getElementById('err-seguro').textContent = 'El seguro es obligatorio para reservas superiores a 1000 €.';
    }

    if (!ok) {
      
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const resumen = {
      nombre,
      email,
      fechaInicio: fecha,
      codigo: codigo || '—',
      seguro: seguroInput.checked ? 'Sí' : 'No',
      total: total.toFixed(2),
      actividades: itinerario.map(a => `${a.nombre} (${a.destino})`)
    };

    const resumenHTML = `
      <div class="alert alert-success">
        <h6>Reserva preparada</h6>
        <p><strong>Nombre:</strong> ${resumen.nombre}</p>
        <p><strong>Email:</strong> ${resumen.email}</p>
        <p><strong>Fecha inicio:</strong> ${resumen.fechaInicio}</p>
        <p><strong>Seguro:</strong> ${resumen.seguro}</p>
        <p><strong>Total:</strong> ${resumen.total} €</p>
        <p><strong>Actividades:</strong><br> ${resumen.actividades.join('<br>')}</p>
      </div>
    `;
    erroresGlobales.innerHTML = resumenHTML;

    
  });


  init();
});
