const express = require('express');
const router = express.Router();
const artistaController = require('../controllers/artistaController');

router.get('/artistas', artistaController.list);
router.get('/artista/form', artistaController.showForm);
router.get('/artista/form/:id', artistaController.showForm);
router.post('/artista/save', artistaController.save);
router.get('/artista/delete/:id', artistaController.delete);
router.get('/artista/:id', artistaController.detail);

module.exports = router;