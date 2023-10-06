document.addEventListener('DOMContentLoaded', () => {
    // Código JavaScript para el punto de venta
    const saleForm = document.getElementById('sale-form');
    const productSelect = document.getElementById('product-select');
    const quantityInput = document.getElementById('quantity');
    const cartTable = document.getElementById('cart-table');
    const totalSpan = document.getElementById('total');
    const checkoutButton = document.getElementById('checkout-button');
  
    // Variable para mantener el carrito de compras
    const cart = [];
  
    // Función para cargar dinámicamente las opciones de productos desde la base de datos
    function loadProducts() {
        // Realiza una solicitud para obtener los productos desde la API
        fetch('/api/products')
            .then((response) => response.json())
            .then((data) => {
                data.forEach((product) => {
                    const option = document.createElement('option');
                    option.value = product.id;
                    option.textContent = product.nombre;
                    productSelect.appendChild(option);
                });
            })
            .catch((error) => {
                console.error('Error al cargar productos:', error);
            });
    }
  
    // Función para agregar un producto al carrito
    function addToCart(productId, productName, price, quantity) {
        const subtotal = price * quantity;
        cart.push({
            productId,
            productName,
            price,
            quantity,
            subtotal,
        });
        updateCartTable();
        updateTotal();
    }
  
    // Función para actualizar la tabla del carrito
    function updateCartTable() {
        cartTable.innerHTML = `
            <thead>
                <tr>
                    <th>Producto</th>
                    <th>Cantidad</th>
                    <th>Precio Unitario</th>
                    <th>Subtotal</th>
                </tr>
            </thead>
            <tbody>
                ${cart
                    .map(
                        (item) => `
                    <tr>
                        <td>${item.productName}</td>
                        <td>${item.quantity}</td>
                        <td>$${item.price.toFixed(2)}</td>
                        <td>$${item.subtotal.toFixed(2)}</td>
                    </tr>
                `
                    )
                    .join('')}
            </tbody>
        `;
    }
  
    // Función para calcular el total y mostrarlo en la página
    function updateTotal() {
        const total = cart.reduce((acc, item) => acc + item.subtotal, 0);
        totalSpan.textContent = `$${total.toFixed(2)}`;
    }
  
    // Función para manejar el evento de envío del formulario
    saleForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const productId = productSelect.value;
        const productName = productSelect.options[productSelect.selectedIndex].textContent;
        const price = parseFloat(productSelect.options[productSelect.selectedIndex].getAttribute('data-price'));
        const quantity = parseInt(quantityInput.value, 10);
  
        if (!productId || !quantity || isNaN(quantity) || quantity <= 0) {
            alert('Por favor, seleccione un producto y proporcione una cantidad válida.');
            return;
        }
  
        addToCart(productId, productName, price, quantity);
  
        // Restablece el formulario
        productSelect.value = '';
        quantityInput.value = '';
    });
  
    // Función para manejar el evento de finalizar compra
    checkoutButton.addEventListener('click', () => {
        // Agregar lógica para guardar la compra en la base de datos
        if (cart.length === 0) {
            alert('El carrito de compras está vacío. Agregue productos antes de finalizar la compra.');
        } else {
            // Enviar los datos del carrito al servidor y realizar la compra
            const dataToSend = JSON.stringify(cart);
            fetch('/api/checkout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: dataToSend,
            })
                .then((response) => response.json())
                .then((result) => {
                    if (result.success) {
                        alert('Compra realizada con éxito.');
                        // Limpiar el carrito después de la compra
                        cart.length = 0;
                        updateCartTable();
                        updateTotal();
                    } else {
                        alert('Error al procesar la compra. Por favor, inténtelo de nuevo más tarde.');
                    }
                })
                .catch((error) => {
                    console.error('Error al procesar la compra:', error);
                    alert('Error al procesar la compra. Por favor, inténtelo de nuevo más tarde.');
                });
        }
    });
  
    // Cargar las opciones de productos al cargar la página
    loadProducts();
});
