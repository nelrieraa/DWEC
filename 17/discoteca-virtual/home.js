const { layout } = require('./layout');

function home(req, res) {
  const content = `
    <div class="hero">
      <div class="hero-content">
        <h1 class="hero-title">🎵 Discoteca Virtual</h1>
        <p class="hero-subtitle">Gestiona tu colección de álbumes y artistas</p>
        <div class="hero-actions">
          <a href="/albumes" class="btn btn-primary btn-lg">🎵 Ver Álbumes</a>
          <a href="/artistas" class="btn btn-secondary btn-lg">🎤 Ver Artistas</a>
        </div>
      </div>
    </div>`;
  res.send(layout('Inicio', content));
}

module.exports = { home };