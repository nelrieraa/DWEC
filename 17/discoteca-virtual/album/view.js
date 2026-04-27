const { layout } = require('../layout');

function listaAlbumes(albumes, artistas) {
  const filas = albumes.map(album => {
    const artista = artistas.find(a => a.id === album.artistaId);
    return `
      <tr>
        <td><img src="${album.foto || 'https://picsum.photos/id/1/60/60'}" class="thumb"></td>
        <td>${album.titulo}</td>
        <td>${album.anio}</td>
        <td>${artista ? artista.nombre : 'Desconocido'}</td>
        <td class="actions">
          <a href="/album/form/${album.id}" class="btn btn-edit">✏️ Editar</a>
          <a href="/album/delete/${album.id}" class="btn btn-delete" onclick="return confirm('¿Eliminar?')">🗑️ Eliminar</a>
        </td>
      </tr>`;
  }).join('');

  return layout('Álbumes', `
    <div class="page-header">
      <h1>Álbumes</h1>
      <a href="/album/form" class="btn btn-primary">＋ Nuevo Álbum</a>
    </div>
    <div class="card">
      <table class="table">
        <thead><tr><th>Foto</th><th>Título</th><th>Año</th><th>Artista</th><th>Acciones</th></tr></thead>
        <tbody>${filas || '<tr><td colspan="5" class="empty">No hay álbumes.</td></tr>'}</tbody>
      </table>
    </div>`);
}

function formularioAlbum(album, artistas, error = '') {
  const isEdit = !!album;
  const v = (field) => isEdit ? (album[field] || '') : '';
  const opciones = artistas.map(a =>
    `<option value="${a.id}" ${a.id === parseInt(v('artistaId')) ? 'selected' : ''}>${a.nombre}</option>`
  ).join('');

  return layout(isEdit ? 'Editar Álbum' : 'Nuevo Álbum', `
    <div class="page-header">
      <h1>${isEdit ? 'Editar Álbum' : 'Nuevo Álbum'}</h1>
      <a href="/albumes" class="btn btn-secondary">← Volver</a>
    </div>
    <div class="card form-card">
      ${error ? `<div class="alert alert-error">${error}</div>` : ''}
      <div class="form-layout">
        <div class="form-preview">
          <img id="preview-img" src="${v('foto') || 'https://via.placeholder.com/150x150?text=Sin+foto'}" class="preview-img">
        </div>
        <form action="/album/save" method="POST" class="form">
          <input type="hidden" name="id" value="${v('id')}">
          <div class="form-group">
            <label>Título *</label>
            <input type="text" name="titulo" value="${v('titulo')}" required placeholder="Nombre del álbum">
          </div>
          <div class="form-group">
            <label>Año *</label>
            <input type="number" name="anio" value="${v('anio')}" required min="1900" max="2099">
          </div>
          <div class="form-group">
            <label>Artista *</label>
            <select name="artistaId" required>
              <option value="">— Selecciona —</option>
              ${opciones}
            </select>
          </div>
          <div class="form-group">
            <label>URL de la Foto</label>
            <input type="url" name="foto" value="${v('foto')}" placeholder="https://..." oninput="document.getElementById('preview-img').src=this.value||'https://via.placeholder.com/150'">
          </div>
          <div class="form-actions">
            <button type="submit" class="btn btn-primary">💾 Guardar</button>
            <a href="/albumes" class="btn btn-secondary">Cancelar</a>
          </div>
        </form>
      </div>
    </div>`);
}

module.exports = { listaAlbumes, formularioAlbum };