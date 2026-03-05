const express = require('express');
const path = require('path');
const fs = require('fs');
const morgan = require('morgan');

const app = express();


const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });
app.use(morgan('combined', { stream: accessLogStream }));


app.use(express.urlencoded({ extended: true })); 
app.use(express.static(path.join(__dirname, 'public'))); 


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'view'));


const artistaRoutes = require('./routes/artistaRoutes');
const albumRoutes = require('./routes/albumRoutes');


app.get('/', (req, res) => res.render('index')); 
app.use(artistaRoutes);
app.use(albumRoutes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});