let artistas = [
  { id: 1, nombre: 'Queen', pais: 'Reino Unido', genero: 'Rock', fecha_formacion: 1970, foto: 'https://picsum.photos/id/10/150/150' },
  { id: 2, nombre: 'Michael Jackson', pais: 'Estados Unidos', genero: 'Pop', fecha_formacion: 1964, foto: 'https://picsum.photos/id/20/150/150' },
  { id: 3, nombre: 'The Beatles', pais: 'Reino Unido', genero: 'Rock', fecha_formacion: 1960, foto: 'https://picsum.photos/id/30/150/150' },
  { id: 4, nombre: 'Daft Punk', pais: 'Francia', genero: 'Electronic', fecha_formacion: 1993, foto: 'https://picsum.photos/id/40/150/150' },
  { id: 5, nombre: 'Metallica', pais: 'Estados Unidos', genero: 'Heavy Metal', fecha_formacion: 1981, foto: 'https://picsum.photos/id/50/150/150' }
];

let nextId = 6;

function getAll() { return artistas; }
function getById(id) { return artistas.find(a => a.id === parseInt(id)); }
function create(data) { const nuevo = { id: nextId++, ...data }; artistas.push(nuevo); return nuevo; }
function update(id, data) {
  const idx = artistas.findIndex(a => a.id === parseInt(id));
  if (idx === -1) return null;
  artistas[idx] = { ...artistas[idx], ...data };
  return artistas[idx];
}
function remove(id) {
  const idx = artistas.findIndex(a => a.id === parseInt(id));
  if (idx === -1) return false;
  artistas.splice(idx, 1);
  return true;
}

module.exports = { getAll, getById, create, update, remove };