const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'Biblioteca'
};

const pool = mysql.createPool(dbConfig);

// Registrar un nuevo usuario
app.post('/register', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).send({ message: 'El nombre de usuario y la contraseña son requeridos' });
  }

  try {
    pool.query('SELECT * FROM Usuario WHERE NombreUsuario = ?', [username], (err, results) => {
      if (err) {
        console.error('Error durante la consulta:', err);
        return res.status(500).send({ message: 'Error interno del servidor' });
      }

      if (results.length > 0) {
        return res.status(409).send({ message: 'El nombre de usuario ya está en uso' });
      }

      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(password, salt);

      pool.query('INSERT INTO Usuario (NombreUsuario, contrasenaHash) VALUES (?, ?)', [username, hash], (err) => {
        if (err) {
          console.error('Error durante la inserción:', err);
          return res.status(500).send({ message: 'Error interno del servidor' });
        }

        res.status(201).send({ message: 'Usuario registrado exitosamente' });
      });
    });
  } catch (err) {
    console.error('Error durante el registro:', err);
    res.status(500).send({ message: 'Error interno del servidor' });
  }
});

// Iniciar sesión
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).send({ message: 'El nombre de usuario y la contraseña son requeridos' });
  }

  try {
    pool.query('SELECT * FROM Usuario WHERE NombreUsuario = ?', [username], (err, results) => {
      if (err) {
        console.error('Error durante la consulta:', err);
        return res.status(500).send({ message: 'Error interno del servidor' });
      }

      if (results.length === 0) {
        return res.status(401).send({ message: 'Credenciales inválidas' });
      }

      const user = results[0];
      const contrasenaHash = user.contrasenaHash;

      if (bcrypt.compareSync(password, contrasenaHash)) {
        res.status(200).send({ message: 'Login realizado exitosamente' });
      } else {
        res.status(401).send({ message: 'Credenciales inválidas' });
      }
    });
  } catch (err) {
    console.error('Error durante el login:', err);
    res.status(500).send({ message: 'Error interno del servidor' });
  }
});

// Obtener todas las tablas de la base de datos
app.get('/tables/:table', (req, res) => {
  const tableName = req.params.table;
  const validTables = ['Lector', 'Bibliotecario', 'Libro', 'Prestamo', 'Multas'];

  if (!validTables.includes(tableName)) {
    return res.status(400).send({ message: 'Nombre de tabla no válido' });
  }

  pool.query(`SELECT * FROM ??`, [tableName], (err, results) => {
    if (err) {
      console.error('Error durante la consulta:', err);
      return res.status(500).send({ message: 'Error interno del servidor' });
    }
    res.status(200).send(results);
  });
});

// Añadir un nuevo libro
app.post('/addBook', (req, res) => {
  const { isbn, titulo, autor, tema, categoria, descripcion, numeroEjemplares } = req.body;

  if (!isbn || !titulo || !autor || !tema || !categoria || !numeroEjemplares) {
    return res.status(400).send({ message: 'Todos los campos son obligatorios' });
  }

  const query = 'INSERT INTO Libro (ISBN, Titulo, Autor, Tema, Categoria, Descripcion, NumeroEjemplares) VALUES (?, ?, ?, ?, ?, ?, ?)';
  const values = [isbn, titulo, autor, tema, categoria, descripcion, numeroEjemplares];

  pool.query(query, values, (err) => {
    if (err) {
      console.error('Error durante la inserción:', err);
      return res.status(500).send({ message: 'Error interno del servidor' });
    }

    res.status(201).send({ message: 'Libro registrado exitosamente' });
  });
});

// Actualizar un libro
app.put('/updateBook/:isbn', (req, res) => {
  const { isbn } = req.params;
  const { titulo, autor, tema, categoria, descripcion, numeroEjemplares } = req.body;

  if (!titulo || !autor || !tema || !categoria || !numeroEjemplares) {
    return res.status(400).send({ message: 'Todos los campos son obligatorios' });
  }

  const query = 'UPDATE Libro SET Titulo = ?, Autor = ?, Tema = ?, Categoria = ?, Descripcion = ?, NumeroEjemplares = ? WHERE ISBN = ?';
  const values = [titulo, autor, tema, categoria, descripcion, numeroEjemplares, isbn];

  pool.query(query, values, (err) => {
    if (err) {
      console.error('Error durante la actualización:', err);
      return res.status(500).send({ message: 'Error interno del servidor' });
    }

    res.status(200).send({ message: 'Libro actualizado exitosamente' });
  });
});

// Eliminar un libro
app.delete('/deleteBook/:isbn', (req, res) => {
  const { isbn } = req.params;

  pool.query('DELETE FROM Libro WHERE ISBN = ?', [isbn], (err) => {
    if (err) {
      console.error('Error durante la eliminación:', err);
      return res.status(500).send({ message: 'Error interno del servidor' });
    }

    res.status(200).send({ message: 'Libro eliminado exitosamente' });
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
