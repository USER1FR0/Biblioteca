const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const dbConfig = {
  host: '127.0.0.1', // Puede ser localhost
  user: 'root',
  password: '',
  database: 'Biblioteca'
};

app.get('/', (req, res) => {
    res.send('Servidor funcionando correctamente');
});

// Crear conexión a la base de datos
const pool = mysql.createPool(dbConfig);

// Probar la conexión a la base de datos
pool.getConnection((err, connection) => {
  if (err) {
    console.error('Error al conectar con la base de datos:', err);
  } else {
    console.log('Conexión exitosa a la base de datos');
    connection.release();
  }
});

// Inicio de sesión
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  
  if (!username || !password) {
    return res.status(400).send({ message: 'El nombre de usuario y la contraseña son requeridos' });
  }

  try {
    // Consulta específica para obtener el usuario por nombre de usuario
    pool.query(
      'SELECT NomrbreUsuario, Contrasena FROM Bibliotecario WHERE NomrbreUsuario = ?',
      [username],
      (err, results) => {
        if (err) {
          console.error('Error durante el login:', err);
          return res.status(500).send({ message: 'Error interno del servidor' });
        }

        if (results.length === 0) {
          return res.status(401).send({ message: 'Credenciales inválidas' });
        }

        const user = results[0];
        const contrasenaHash = user.Contrasena;

        // Validación de hash de contraseña
        if (bcrypt.compareSync(password, contrasenaHash)) {
          res.status(200).send({ message: 'Login realizado exitosamente' });
        } else {
          res.status(401).send({ message: 'Credenciales inválidas' });
        }
      }
    );
  } catch (err) {
    console.error('Error durante el login:', err);
    res.status(500).send({ message: 'Error interno del servidor' });
  }
});

// Ruta para obtener todos los registros de la tabla Lector
app.get('/lector', (req, res) => {
  pool.query('SELECT * FROM Lector', (err, results) => {
    if (err) {
      console.error('Error al obtener los registros de Lector:', err);
      return res.status(500).send({ message: 'Error interno del servidor' });
    }
    res.json(results);
  });
});

// Ruta para obtener todos los registros de la tabla Bibliotecario
app.get('/bibliotecario', (req, res) => {
  pool.query('SELECT * FROM Bibliotecario', (err, results) => {
    if (err) {
      console.error('Error al obtener los registros de Bibliotecario:', err);
      return res.status(500).send({ message: 'Error interno del servidor' });
    }
    res.json(results);
  });
});

// Ruta para obtener todos los registros de la tabla Libro
app.get('/libro', (req, res) => {
  pool.query('SELECT * FROM Libro', (err, results) => {
    if (err) {
      console.error('Error al obtener los registros de Libro:', err);
      return res.status(500).send({ message: 'Error interno del servidor' });
    }
    res.json(results);
  });
});

// Ruta para obtener todos los registros de la tabla Prestamo
app.get('/prestamo', (req, res) => {
  pool.query('SELECT * FROM Prestamo', (err, results) => {
    if (err) {
      console.error('Error al obtener los registros de Prestamo:', err);
      return res.status(500).send({ message: 'Error interno del servidor' });
    }
    res.json(results);
  });
});

// Ruta para obtener todos los registros de la tabla Multas
app.get('/multas', (req, res) => {
  pool.query('SELECT * FROM Multas', (err, results) => {
    if (err) {
      console.error('Error al obtener los registros de Multas:', err);
      return res.status(500).send({ message: 'Error interno del servidor' });
    }
    res.json(results);
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
