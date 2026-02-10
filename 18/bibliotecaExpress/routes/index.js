const express = require('express');
const router = express.Router();

const librosController = require('../controllers/librosController');


router.get('/', librosController.getCatalogo);
router.get('/prestados', librosController.getPrestados);
router.get('/prestamos/usuario', librosController.getPrestamosUsuario);
router.get('/libro/:id', librosController.getLibroDetalle);
router.get('/vencidos', librosController.getVencidos);


router.get('/prestamo/formulario/:libro_id', (req, res) => {
    res.render('formulario_prestamo', { libro_id: req.params.libro_id });
});

router.post('/prestamo/nuevo', librosController.prestarLibro);
router.get('/prestamo/devolver/:libro_id', librosController.devolverLibro);

module.exports = router;