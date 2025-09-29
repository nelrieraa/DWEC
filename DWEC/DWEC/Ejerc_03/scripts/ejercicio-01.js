const playlist = [
  { titulo: "Bohemian Rhapsody", artista: "Queen", duracion: 354 },
  { titulo: "Imagine", artista: "John Lennon", duracion: 183 },
  { titulo: "Billie Jean", artista: "Michael Jackson", duracion: 294 },
  { titulo: "Smells Like Teen Spirit", artista: "Nirvana", duracion: 301 },
  { titulo: "Hotel California", artista: "Eagles", duracion: 391 },
  { titulo: "Hey Jude", artista: "The Beatles", duracion: 431 },
  { titulo: "Like a Rolling Stone", artista: "Bob Dylan", duracion: 369 },
  { titulo: "Sweet Child O' Mine", artista: "Guns N' Roses", duracion: 356 },
  { titulo: "Wonderwall", artista: "Oasis", duracion: 258 },
  { titulo: "Stairway to Heaven", artista: "Led Zeppelin", duracion: 482 }
];

playlist.forEach(cancion => {
  console.log(`Título: ${cancion.titulo}, Artista: ${cancion.artista}`);
});
