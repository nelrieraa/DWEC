const express = require('express');
const router = express.Router();
const albumController = require('../controllers/albumController');

router.get('/albumes', albumController.list);
router.get('/album/form', albumController.showForm);
router.get('/album/form/:id', albumController.showForm);
router.post('/album/save', albumController.save);
router.get('/album/delete/:id', albumController.delete);

module.exports = router;