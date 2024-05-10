const { Pool } = require('pg');

// Configuración de la base de datos
const pool = new Pool({
  user: 'tu_usuario',
  host: 'localhost',
  database: 'bancosolar',
  password: 'tu_contraseña',
  port: 5432,
});

// Función para insertar un nuevo usuario en la base de datos
async function insertarUsuario(nombre, balance) {
  const client = await pool.connect();
  try {
    const query = 'INSERT INTO usuarios (nombre, balance) VALUES ($1, $2)';
    const values = [nombre, balance];
    await client.query(query, values);
  } finally {
    client.release();
  }
}

// Función para obtener todos los usuarios de la base de datos
async function obtenerUsuarios() {
  const client = await pool.connect();
  try {
    const result = await client.query('SELECT * FROM usuarios');
    return result.rows;
  } finally {
    client.release();
  }
}

// Otras funciones para realizar consultas a la base de datos

module.exports = {
  insertarUsuario,
  obtenerUsuarios,
  // Exporta otras funciones aquí si es necesario
};
