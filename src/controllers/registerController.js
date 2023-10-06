// En el controlador de registro de usuarios (registerController.js)
const { query } = require('../db'); // Importa el objeto 'query' para realizar consultas a la base de datos

const registerUser = async (req, res) => {
  try {
    const { nombre, contrasena, correo } = req.body;

    // Verifica si los datos obligatorios están presentes
    if (!nombre || !contrasena || !correo) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    // Verifica si el nombre de usuario ya existe en la base de datos
    const checkUserQuery = 'SELECT * FROM usuarios WHERE nombre = $1';
    const userExists = await query(checkUserQuery, [nombre]);

    if (userExists.rows.length > 0) {
      return res.status(400).json({ error: 'El nombre de usuario ya está en uso' });
    }

    // Verifica si el correo electrónico ya existe en la base de datos
    const checkEmailQuery = 'SELECT * FROM usuarios WHERE correo = $1';
    const emailExists = await query(checkEmailQuery, [correo]);

    if (emailExists.rows.length > 0) {
      return res.status(400).json({ error: 'El correo electrónico ya está en uso' });
    }

    // Si el nombre de usuario y el correo electrónico son únicos, realiza el registro
    const insertUserQuery = 'INSERT INTO usuarios (nombre, contrasena, correo) VALUES ($1, $2, $3) RETURNING *';
    const newUser = await query(insertUserQuery, [nombre, contrasena, correo]);

    // Registro exitoso, envía una respuesta con el nuevo usuario registrado
    res.status(200).json({ success: true, message: 'Registro exitoso' });
} catch (error) {
  console.error('Error en el controlador de registro:', error);
  res.status(500).json({ success: false, error: 'Error interno del servidor' });
}
};

module.exports = {
  registerUser,
};
