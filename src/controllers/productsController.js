const db = require('../db'); // Importa el módulo de conexión a la base de datos

// Manejador para la ruta '/api/products'
const getProducts = (req, res) => {
  // Realiza una consulta a la base de datos para obtener los productos
  db.query('SELECT * FROM productos', (error, results) => {
    if (error) {
      // Manejo de errores
      console.error('Error al obtener productos:', error);
      res.status(500).json({ error: 'Error al obtener productos' });
    } else {
      // Enviar los resultados como una respuesta JSON
      res.json(results.rows);
    }
  });
};

module.exports = {
  getProducts,
};
