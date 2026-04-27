let albumes = [
  { id: 1, titulo: 'A Night at the Opera', anio: 1975, artistaId: 1, foto: 'https://picsum.photos/id/100/150/150' },
  { id: 2, titulo: 'News of the World', anio: 1977, artistaId: 1, foto: 'https://picsum.photos/id/101/150/150' },
  { id: 3, titulo: 'Thriller', anio: 1982, artistaId: 2, foto: 'https://picsum.photos/id/102/150/150' },
  { id: 4, titulo: 'Bad', anio: 1987, artistaId: 2, foto: 'https://picsum.photos/id/103/150/150' },
  { id: 5, titulo: 'Abbey Road', anio: 1969, artistaId: 3, foto: 'https://picsum.photos/id/104/150/150' },
  { id: 6, titulo: "Sgt. Pepper's Lonely Hearts Club Band", anio: 1967, artistaId: 3, foto: 'https://picsum.photos/id/105/150/150' },
  { id: 7, titulo: 'Discovery', anio: 2001, artistaId: 4, foto: 'https://picsum.photos/id/106/150/150' },
  { id: 8, titulo: 'Random Access Memories', anio: 2013, artistaId: 4, foto: 'https://picsum.photos/id/107/150/150' },
  { id: 9, titulo: 'Master of Puppets', anio: 1986, artistaId: 5, foto: 'https://picsum.photos/id/108/150/150' },
  { id: 10, titulo: 'Metallica (The Black Album)', anio: 1991, artistaId: 5, foto: 'https://picsum.photos/id/109/150/150' }
];

let nextId = 11;

function getAll() { return albumes; }
function getById(id) { return albumes.find(a => a.id === parseInt(id)); }
function getByArtistaId(artistaId) { return albumes.filter(a => a.artistaId === parseInt(artistaId)); }
function create(data) {
  const nuevo = { id: nextId++, titulo: data.titulo, anio: parseInt(data.anio), artistaId: parseInt(data.artistaId), foto: data.foto || '' };
  albumes.push(nuevo);
  return nuevo;
}
function update(id, data) {
  const idx = albumes.findIndex(a => a.id === parseInt(id));
  if (idx === -1) return null;
  albumes[idx] = { ...albumes[idx], titulo: data.titulo, anio: parseInt(data.anio), artistaId: parseInt(data.artistaId), foto: data.foto || '' };
  return albumes[idx];
}
function remove(id) {
  const idx = albumes.findIndex(a => a.id === parseInt(id));
  if (idx === -1) return false;
  albumes.splice(idx, 1);
  return true;
}

module.exports = { getAll, getById, getByArtistaId, create, update, remove };