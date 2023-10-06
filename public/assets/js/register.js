document.addEventListener('DOMContentLoaded', () => {
    // Código JavaScript para la página de registro

    const registerForm = document.getElementById('register-form');
    const messageElement = document.getElementById('message');

    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const nombre = document.getElementById('nombre').value;
        const correo = document.getElementById('correo').value;
        const contrasena = document.getElementById('contrasena').value;

        // Envía los datos al servidor para el registro
        fetch('/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ nombre, correo, contrasena }),
        })
        .then((response) => response.json())
        .then((data) => {
            // Maneja la respuesta del servidor aquí
            if (data.error) {
                messageElement.textContent = data.error;
            } else {
                messageElement.textContent = 'Registro exitoso. Inicia sesión con tus credenciales.';
                // Redirige al usuario a la página de inicio de sesión (login.html)
                window.location.href = '/login.html';
            }
        })
        .catch((error) => {
            // Maneja errores de conexión o del servidor
            console.error('Error en el registro:', error);
            messageElement.textContent = 'Error en el servidor. Por favor, inténtalo de nuevo más tarde.';
        });
    });
});
