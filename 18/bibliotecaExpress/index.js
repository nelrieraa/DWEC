const express = require('express');
const path = require('path');
const morgan = require('morgan');
require('dotenv').config();


const routes = require('./routes/index'); 

const app = express();

app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');


app.use('/', routes); 

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`✅ Servidor funcionando en: http://localhost:${PORT}`);
});