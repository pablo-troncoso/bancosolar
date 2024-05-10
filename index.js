const express = require('express');
const bodyParser = require('body-parser');
const consultas = require('./consultas');

const app = express();

app.use(bodyParser.json());

// Ruta para obtener la aplicación cliente
app.get('/', (req, res) => {
  // Coloca aquí el contenido del index.html
});

// Ruta para registrar un nuevo usuario
app.post('/usuario', async (req, res) => {
  const { nombre, balance } = req.body;
  try {
    await consultas.insertarUsuario(nombre, balance);
    res.sendStatus(200);
  } catch (error) {
    console.error('Error al insertar usuario:', error);
    res.sendStatus(500);
  }
});

// Ruta para obtener todos los usuarios
app.get('/usuarios', async (req, res) => {
  try {
    const usuarios = await consultas.obtenerUsuarios();
    res.json(usuarios);
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    res.sendStatus(500);
  }
});

// Otras rutas y manejo de errores aquí

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
