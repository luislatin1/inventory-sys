const { Pool } = require('pg');

// Configura la conexión a la base de datos
const pool = new Pool({
  user: 'lflg1admon',
  host: 'lflg1.c43ciqm2hy6y.us-east-1.rds.amazonaws.com',
  database: 'inventory',
  password: 'sslKzDIaSo5CoOxvvWXn',
  port: 5432, // Puerto por defecto de PostgreSQL
});

// Intenta conectarte a la base de datos
pool.connect((err, client, done) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err);
  } else {
    console.log('Conexión exitosa a la base de datos');
    // Libera la conexión
    done();
  }
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};
