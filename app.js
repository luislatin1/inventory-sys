const express = require('express');
const app = express();
const port = process.env.PORT || 3030;

// Configuración para servir archivos estáticos desde la carpeta "public"
app.use(express.static('public'));

// Configuración para servir archivos estáticos desde la carpeta "views"
app.use(express.static('views'));

app.get('/products.html', (req, res) => {
  // Utiliza el método `sendFile` para enviar el archivo HTML
  res.sendFile(__dirname + '/src/views/products.html');
});

app.get('/api/products', (req, res) => {
  // Lógica para obtener y enviar datos JSON de productos
  // Asegúrate de que esta lógica devuelva una respuesta JSON válida

  // Ejemplo de datos JSON de prueba
  const products = [
    { id: 1, nombre: 'Producto 1', precio: 10.99 },
    { id: 2, nombre: 'Producto 2', precio: 19.99 },
    { id: 3, nombre: 'Producto 3', precio: 8.49 },
  ];

  // Envía los datos como respuesta JSON
  res.json(products);
});

app.get('/products', (req, res) => {
  // Lógica para la ruta /products (por ejemplo, mostrar una lista de productos)
  // Puedes implementar esta lógica aquí si es necesario
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor en ejecución en http://localhost:${port}`);
});
