const Artista = require('../models/artistaModel');
const Album = require('../models/albumModel');

const artistaController = {

    list: (req, res) => {
        const artistas = Artista.findAll();
        res.render('artistas/index', { artistas });
    },


    detail: (req, res) => {
        const artista = Artista.findById(req.params.id);
        const todosLosAlbumes = Album.findAll();
        const albumesArtista = todosLosAlbumes.filter(a => a.artistaId == req.params.id);
        
        if (artista) {
            res.render('artistas/detail', { artista, albumesArtista });
        } else {
            res.send("Artista no encontrado");
        }
    },

  
    showForm: (req, res) => {
        const id = req.params.id;
        let artista = {};
        if (id) {
            artista = Artista.findById(id);
        }
        res.render('artistas/form', { artista });
    },


    save: (req, res) => {
        let artistas = Artista.findAll();
        const { id, nombre, pais, genero, fecha_formacion, foto } = req.body;

        if (id) {
            // Editar
            artistas = artistas.map(a => a.id == id ? { ...a, nombre, pais, genero, fecha_formacion, foto } : a);
        } else {
            // Crear nuevo
            const nuevoId = artistas.length > 0 ? Math.max(...artistas.map(a => a.id)) + 1 : 1;
            artistas.push({ id: nuevoId, nombre, pais, genero, fecha_formacion, foto });
        }

        Artista.save(artistas);
        res.redirect('/artistas');
    },


    delete: (req, res) => {
        let artistas = Artista.findAll();
        artistas = artistas.filter(a => a.id != req.params.id);
        Artista.save(artistas);
        res.redirect('/artistas');
    }
};

module.exports = artistaController;