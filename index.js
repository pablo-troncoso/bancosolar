const express = require('express');
const bodyParser = require('body-parser');
const consultas = require('./consultas');

const app = express();

app.use(bodyParser.json());

// Ruta para obtener la Aplicación Cliente
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
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

// Ruta para actualizar un usuario existente
app.put('/usuario', async (req, res) => {
  const { id, nombre, balance } = req.body;
  try {
    await consultas.actualizarUsuario(id, nombre, balance);
    res.sendStatus(200);
  } catch (error) {
    console.error('Error al actualizar usuario:', error);
    res.sendStatus(500);
  }
});

// Ruta para eliminar un usuario existente
app.delete('/usuario', async (req, res) => {
  const { id } = req.body;
  try {
    await consultas.eliminarUsuario(id);
    res.sendStatus(200);
  } catch (error) {
    console.error('Error al eliminar usuario:', error);
    res.sendStatus(500);
  }
});

// Ruta para obtener todas las transferencias
app.get('/transferencias', async (req, res) => {
  try {
    const transferencias = await consultas.obtenerTransferencias();
    res.json(transferencias);
  } catch (error) {
    console.error('Error al obtener transferencias:', error);
    res.sendStatus(500);
  }
});

// Ruta para realizar una nueva transferencia
app.post('/transferencia', async (req, res) => {
  const { emisor, receptor, monto } = req.body;
  try {
    await consultas.realizarTransferencia(emisor, receptor, monto);
    res.sendStatus(200);
  } catch (error) {
    console.error('Error al realizar transferencia:', error);
    res.sendStatus(500);
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
