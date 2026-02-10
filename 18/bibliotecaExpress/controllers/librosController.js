const db = require('../config/db');


exports.getCatalogo = async (req, res) => {
    try {
        const [libros] = await db.query('SELECT * FROM libros');
        res.render('catalogo', { libros });
    } catch (err) { 
        res.status(500).send("Error en el catálogo: " + err.message); 
    }
};


exports.getPrestados = async (req, res) => {
    try {
        const query = `
            SELECT l.titulo, l.autor, p.nombre_prestatario, p.fecha_devolucion 
            FROM libros l 
            JOIN prestamos p ON l.id = p.libro_id 
            WHERE l.estado = 'Prestado' AND p.fecha_entrega IS NULL`;
        const [prestados] = await db.query(query);
        res.render('prestados', { prestados });
    } catch (err) { res.status(500).send(err.message); }
};


exports.getPrestamosUsuario = async (req, res) => {
    try {
        const { nombre } = req.query;
        const query = `
            SELECT l.titulo, l.autor, p.fecha_devolucion 
            FROM prestamos p 
            JOIN libros l ON p.libro_id = l.id 
            WHERE p.nombre_prestatario = ? AND p.fecha_entrega IS NULL`;
        const [libros] = await db.query(query, [nombre]);
        res.render('usuario_prestamos', { nombre, libros });
    } catch (err) { res.status(500).send(err.message); }
};


exports.getLibroDetalle = async (req, res) => {
    try {
        const { id } = req.params;
        const [[libro]] = await db.query('SELECT * FROM libros WHERE id = ?', [id]);
        const [historial] = await db.query('SELECT * FROM prestamos WHERE libro_id = ? ORDER BY fecha_prestamo DESC', [id]);
        const prestamoActivo = historial.find(p => p.fecha_entrega === null);
        res.render('detalle', { libro, historial, prestamoActivo });
    } catch (err) { res.status(500).send(err.message); }
};


exports.prestarLibro = async (req, res) => {
    try {
        const { libro_id, nombre_prestatario, fecha_devolucion } = req.body;
        const fecha_prestamo = new Date().toISOString().split('T')[0];
        await db.query('INSERT INTO prestamos (libro_id, nombre_prestatario, fecha_prestamo, fecha_devolucion) VALUES (?, ?, ?, ?)', 
            [libro_id, nombre_prestatario, fecha_prestamo, fecha_devolucion]);
        await db.query('UPDATE libros SET estado = "Prestado" WHERE id = ?', [libro_id]);
        res.redirect(`/libro/${libro_id}`);
    } catch (err) { res.status(500).send(err.message); }
};


exports.devolverLibro = async (req, res) => {
    try {
        const { libro_id } = req.params;
        const fecha_hoy = new Date().toISOString().split('T')[0];
        await db.query('UPDATE prestamos SET fecha_entrega = ? WHERE libro_id = ? AND fecha_entrega IS NULL', [fecha_hoy, libro_id]);
        await db.query('UPDATE libros SET estado = "Disponible" WHERE id = ?', [libro_id]);
        res.redirect(`/libro/${libro_id}`);
    } catch (err) { res.status(500).send(err.message); }
};


exports.getVencidos = async (req, res) => {
    try {
        const hoy = new Date().toISOString().split('T')[0];
        const query = `
            SELECT l.titulo, p.nombre_prestatario, p.fecha_devolucion 
            FROM prestamos p 
            JOIN libros l ON p.libro_id = l.id 
            WHERE p.fecha_devolucion < ? AND p.fecha_entrega IS NULL`;
        const [vencidos] = await db.query(query, [hoy]);
        res.render('vencidos', { vencidos });
    } catch (err) { res.status(500).send(err.message); }
};