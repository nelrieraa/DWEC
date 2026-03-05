const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, '../data/artistas.json');

const Artista = {
    findAll: () => {
        const data = fs.readFileSync(filePath, 'utf-8');
        return JSON.parse(data);
    },
    findById: (id) => {
        const artistas = Artista.findAll();
        return artistas.find(a => a.id == id);
    },
    save: (artistas) => {
        fs.writeFileSync(filePath, JSON.stringify(artistas, null, 2));
    }
};

module.exports = Artista;