// loginController.js

const { query } = require('../db'); // Importa el objeto 'query' para realizar consultas a la base de datos

const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Verifica si el usuario y la contraseña son proporcionados
    if (!username || !password) {
      return res.status(400).json({ error: 'Debe proporcionar un nombre de usuario y contraseña' });
    }

    // Realiza una consulta para verificar las credenciales en la base de datos
    const queryString = 'SELECT * FROM users WHERE username = $1 AND password = $2';
    const values = [username, password];

    const result = await query(queryString, values);

    // Verifica si se encontró un usuario con las credenciales proporcionadas
    if (result.rows.length === 1) {
      // Inicio de sesión exitoso, redirige al usuario a la página principal
      res.redirect('/'); // Cambia esto a la ruta deseada después del inicio de sesión exitoso
    } else {
      // Credenciales incorrectas, muestra un mensaje de error
      res.status(401).json({ error: 'Credenciales incorrectas' });
    }
  } catch (error) {
    console.error('Error en el controlador de inicio de sesión:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
};

module.exports = {
  loginUser,
};
