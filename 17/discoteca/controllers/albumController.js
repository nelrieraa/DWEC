const Album = require('../models/albumModel');
const Artista = require('../models/artistaModel');

const albumController = {
   
    list: (req, res) => {
        const albumes = Album.findAll();
        const artistas = Artista.findAll();

        const albumesConArtista = albumes.map(album => {
            const artista = artistas.find(a => a.id == album.artistaId);
            return { ...album, nombreArtista: artista ? artista.nombre : 'Desconocido' };
        });

        res.render('albumes/index', { albumes: albumesConArtista });
    },

  
    showForm: (req, res) => {
        const id = req.params.id;
        const artistas = Artista.findAll();
        let album = {};
        
        if (id) {
            const albumes = Album.findAll();
            album = albumes.find(a => a.id == id);
        }
        res.render('albumes/form', { album, artistas });
    },

    
    save: (req, res) => {
        let albumes = Album.findAll();
        const { id, titulo, anio, artistaId, foto } = req.body;

    
        if (!titulo || !anio) {
            const artistas = Artista.findAll();
            return res.render('albumes/form', { 
                album: req.body, 
                artistas, 
                error: "El título y el año son obligatorios" 
            });
        }

        if (id) {
            
            albumes = albumes.map(a => a.id == id ? { ...a, titulo, anio: parseInt(anio), artistaId: parseInt(artistaId), foto } : a);
        } else {

            const nuevoId = albumes.length > 0 ? Math.max(...albumes.map(a => a.id)) + 1 : 1;
            albumes.push({ id: nuevoId, titulo, anio: parseInt(anio), artistaId: parseInt(artistaId), foto });
        }

        Album.save(albumes);
        res.redirect('/albumes');
    },


    delete: (req, res) => {
        let albumes = Album.findAll();
        albumes = albumes.filter(a => a.id != req.params.id);
        Album.save(albumes);
        res.redirect('/albumes');
    }
};

module.exports = albumController;