const artistaModel = require('./model');
const albumModel = require('../album/model');
const view = require('./view');

function listaArtistas(req, res) {
  res.send(view.listaArtistas(artistaModel.getAll()));
}

function fichaArtista(req, res) {
  const artista = artistaModel.getById(req.params.id);
  if (!artista) return res.status(404).send('Artista no encontrado');
  res.send(view.fichaArtista(artista, albumModel.getByArtistaId(artista.id)));
}

function formularioNuevo(req, res) {
  res.send(view.formularioArtista(null));
}

function formularioEditar(req, res) {
  const artista = artistaModel.getById(req.params.id);
  if (!artista) return res.status(404).send('Artista no encontrado');
  res.send(view.formularioArtista(artista));
}

function guardar(req, res) {
  const { id, nombre, pais, genero, fecha_formacion, foto } = req.body;
  if (!nombre || !nombre.trim() || !pais || !pais.trim()) {
    const artista = id ? artistaModel.getById(id) : null;
    return res.send(view.formularioArtista(artista, 'El nombre y el país son obligatorios.'));
  }
  const data = { nombre: nombre.trim(), pais: pais.trim(), genero: genero || '', fecha_formacion: fecha_formacion ? parseInt(fecha_formacion) : null, foto: foto || '' };
  if (id) { artistaModel.update(id, data); } else { artistaModel.create(data); }
  res.redirect('/artistas');
}

function eliminar(req, res) {
  artistaModel.remove(req.params.id);
  res.redirect('/artistas');
}

module.exports = { listaArtistas, fichaArtista, formularioNuevo, formularioEditar, guardar, eliminar };