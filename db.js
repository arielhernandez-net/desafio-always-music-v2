require('dotenv').config();
const { Client } = require('pg');

const pool = new Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,

});

async function conectarBD() {
  try {
    await pool.connect();
    console.log('Conectado a la base de datos exitosamente.');
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error);
    throw error;
  }

  return pool;
}

async function desconectarBD() {
  try {
    await pool.end();
    console.log('Desconectado de la base de datos.');
  } catch (error) {
    console.error('Error al desconectar de la base de datos:', error);
  }
}

module.exports = {
  conectarBD,
  desconectarBD,
};
