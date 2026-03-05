const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, '../data/albumes.json');

const Album = {
    findAll: () => {
        const data = fs.readFileSync(filePath, 'utf-8');
        return JSON.parse(data);
    },
    save: (albumes) => {
        fs.writeFileSync(filePath, JSON.stringify(albumes, null, 2));
    }
};

module.exports = Album;