// public/js/products.js

document.addEventListener('DOMContentLoaded', () => {
    // Código JavaScript para cargar y mostrar productos en la vista
  
    // Realiza una solicitud para obtener los productos desde la API
    fetch('/api/products')
      .then((response) => response.json())
      .then((data) => {
        // Procesar los datos y mostrarlos en la página
        const productsContainer = document.getElementById('products-container');
  
        data.forEach((product) => {
          const productElement = document.createElement('div');
          productElement.innerHTML = `
            <h2>${product.nombre}</h2>
            <p>${product.descripcion}</p>
            <p>Precio: $${product.precio}</p>
            <p>Stock: ${product.stock}</p>
          `;
  
          productsContainer.appendChild(productElement);
        });
      })
      .catch((error) => {
        console.error('Error al obtener productos:', error);
      });
  });
  