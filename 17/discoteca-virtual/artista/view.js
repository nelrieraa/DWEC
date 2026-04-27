const { layout } = require('../layout');

function listaArtistas(artistas) {
  const tarjetas = artistas.map(a => `
    <a href="/artista/${a.id}" class="artista-card">
      <img src="${a.foto || 'https://picsum.photos/id/1/150/150'}" alt="${a.nombre}" class="artista-foto">
      <div class="artista-info">
        <h3>${a.nombre}</h3>
        <span class="tag">${a.genero}</span>
        <span class="muted">${a.pais}</span>
      </div>
    </a>`).join('');

  return layout('Artistas', `
    <div class="page-header">
      <h1>Artistas</h1>
      <a href="/artista/form" class="btn btn-primary">＋ Nuevo Artista</a>
    </div>
    <div class="artistas-grid">${tarjetas || '<p class="empty">No hay artistas.</p>'}</div>`);
}

function fichaArtista(artista, albumes) {
  const albumList = albumes.map(a => `
    <div class="album-mini">
      <img src="${a.foto || 'https://picsum.photos/id/1/80/80'}" alt="${a.titulo}" class="album-mini-foto">
      <div><strong>${a.titulo}</strong><span class="muted">${a.anio}</span></div>
    </div>`).join('');

  return layout(artista.nombre, `
    <div class="page-header">
      <h1>Ficha del Artista</h1>
      <div class="header-actions">
        <a href="/artista/form/${artista.id}" class="btn btn-edit">✏️ Editar</a>
        <a href="/artistas" class="btn btn-secondary">← Volver</a>
      </div>
    </div>
    <div class="ficha-layout">
      <div class="card ficha-card">
        <img src="${artista.foto || 'https://via.placeholder.com/200x200'}" alt="${artista.nombre}" class="ficha-foto">
        <div class="ficha-info">
          <h2>${artista.nombre}</h2>
          <table class="ficha-table">
            <tr><th>País</th><td>${artista.pais}</td></tr>
            <tr><th>Género</th><td>${artista.genero}</td></tr>
            <tr><th>Formación</th><td>${artista.fecha_formacion}</td></tr>
          </table>
          <div class="ficha-actions">
            <a href="/artista/delete/${artista.id}" class="btn btn-delete" onclick="return confirm('¿Eliminar este artista?')">🗑️ Eliminar</a>
          </div>
        </div>
      </div>
      <div class="card">
        <h3>Discografía (${albumes.length} álbumes)</h3>
        <div class="album-list">${albumList || '<p class="empty">Sin álbumes.</p>'}</div>
      </div>
    </div>`);
}

function formularioArtista(artista, error = '') {
  const isEdit = !!artista;
  const v = (field) => isEdit ? (artista[field] || '') : '';

  return layout(isEdit ? 'Editar Artista' : 'Nuevo Artista', `
    <div class="page-header">
      <h1>${isEdit ? 'Editar Artista' : 'Nuevo Artista'}</h1>
      <a href="/artistas" class="btn btn-secondary">← Volver</a>
    </div>
    <div class="card form-card">
      ${error ? `<div class="alert alert-error">${error}</div>` : ''}
      <div class="form-layout">
        <div class="form-preview">
          <img id="preview-img" src="${v('foto') || 'https://via.placeholder.com/150x150?text=Sin+foto'}" class="preview-img">
        </div>
        <form action="/artista/save" method="POST" class="form">
          <input type="hidden" name="id" value="${v('id')}">
          <div class="form-group">
            <label>Nombre *</label>
            <input type="text" name="nombre" value="${v('nombre')}" required placeholder="Nombre del artista">
          </div>
          <div class="form-group">
            <label>País *</label>
            <input type="text" name="pais" value="${v('pais')}" required placeholder="Ej: Estados Unidos">
          </div>
          <div class="form-group">
            <label>Género</label>
            <input type="text" name="genero" value="${v('genero')}" placeholder="Ej: Rock, Pop...">
          </div>
          <div class="form-group">
            <label>Año de Formación</label>
            <input type="number" name="fecha_formacion" value="${v('fecha_formacion')}" min="1900" max="2099">
          </div>
          <div class="form-group">
            <label>URL de la Foto</label>
            <input type="url" name="foto" value="${v('foto')}" placeholder="https://..." oninput="document.getElementById('preview-img').src=this.value||'https://via.placeholder.com/150'">
          </div>
          <div class="form-actions">
            <button type="submit" class="btn btn-primary">💾 Guardar</button>
            <a href="/artistas" class="btn btn-secondary">Cancelar</a>
          </div>
        </form>
      </div>
    </div>`);
}

module.exports = { listaArtistas, fichaArtista, formularioArtista };