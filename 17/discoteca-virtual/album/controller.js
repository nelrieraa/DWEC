const albumModel = require('./model');
const artistaModel = require('../artista/model');
const view = require('./view');

function listaAlbumes(req, res) {
  res.send(view.listaAlbumes(albumModel.getAll(), artistaModel.getAll()));
}

function formularioNuevo(req, res) {
  res.send(view.formularioAlbum(null, artistaModel.getAll()));
}

function formularioEditar(req, res) {
  const album = albumModel.getById(req.params.id);
  if (!album) return res.status(404).send('Álbum no encontrado');
  res.send(view.formularioAlbum(album, artistaModel.getAll()));
}

function guardar(req, res) {
  const { id, titulo, anio, artistaId, foto } = req.body;
  if (!titulo || !titulo.trim() || !anio || !anio.trim()) {
    const album = id ? albumModel.getById(id) : null;
    return res.send(view.formularioAlbum(album, artistaModel.getAll(), 'El título y el año son obligatorios.'));
  }
  const data = { titulo: titulo.trim(), anio, artistaId, foto: foto || '' };
  if (id) { albumModel.update(id, data); } else { albumModel.create(data); }
  res.redirect('/albumes');
}

function eliminar(req, res) {
  albumModel.remove(req.params.id);
  res.redirect('/albumes');
}

module.exports = { listaAlbumes, formularioNuevo, formularioEditar, guardar, eliminar };