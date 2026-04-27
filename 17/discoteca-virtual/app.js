const express = require('express');
const morgan = require('morgan');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Logging → access.log
const logStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });
app.use(morgan('combined', { stream: logStream }));
app.use(morgan('dev'));

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Controladores
const home = require('./home');
const albumController = require('./album/controller');
const artistaController = require('./artista/controller');

// Rutas
app.get('/', home.home);

app.get('/albumes', albumController.listaAlbumes);
app.get('/album/form', albumController.formularioNuevo);
app.get('/album/form/:id', albumController.formularioEditar);
app.post('/album/save', albumController.guardar);
app.get('/album/delete/:id', albumController.eliminar);

app.get('/artistas', artistaController.listaArtistas);
app.get('/artista/form', artistaController.formularioNuevo);
app.get('/artista/form/:id', artistaController.formularioEditar);
app.post('/artista/save', artistaController.guardar);
app.get('/artista/delete/:id', artistaController.eliminar);
app.get('/artista/:id', artistaController.fichaArtista);

// 404
app.use((req, res) => {
  res.status(404).send('<h1>404 — Página no encontrada</h1><a href="/">Volver al inicio</a>');
});

app.listen(PORT, () => {
  console.log(`🎵 Servidor corriendo en http://localhost:${PORT}`);
});

module.exports = app;