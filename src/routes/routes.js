// src/routes/routes.js
const express = require('express');
const router = express.Router();

// Ruta para mostrar la lista de productos
router.get('/products', (req, res) => {
  res.sendFile('products.html', { root: './src/views' });
});

module.exports = router;
