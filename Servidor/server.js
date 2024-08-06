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
  console.log('ISBN recibido:', isbn);
  console.log('Datos recibidos en el servidor:', JSON.stringify(req.body, null, 2));

  const { Titulo, Autor, Tema, Categoria, Descripcion, NumeroEjemplares } = req.body;

  // Verificar cada campo individualmente
  if (!Titulo) console.log('Falta Titulo');
  if (!Autor) console.log('Falta Autor');
  if (!Tema) console.log('Falta Tema');
  if (!Categoria) console.log('Falta Categoria');
  if (NumeroEjemplares === undefined) console.log('Falta NumeroEjemplares');

  if (!Titulo || !Autor || !Tema || !Categoria || NumeroEjemplares === undefined) {
    console.log('Campos faltantes:', { Titulo, Autor, Tema, Categoria, NumeroEjemplares });
    return res.status(400).json({ message: 'Todos los campos son obligatorios', camposFaltantes: { Titulo, Autor, Tema, Categoria, NumeroEjemplares } });
  }

  const query = 'UPDATE Libro SET Titulo = ?, Autor = ?, Tema = ?, Categoria = ?, Descripcion = ?, NumeroEjemplares = ? WHERE ISBN = ?';
  const values = [Titulo, Autor, Tema, Categoria, Descripcion, NumeroEjemplares, isbn];

  console.log('Query:', query);
  console.log('Values:', values);

  pool.query(query, values, (err, result) => {
    if (err) {
      console.error('Error al actualizar el libro:', err);
      return res.status(500).json({ message: 'Error interno del servidor', error: err.message });
    }

    console.log('Resultado de la actualización:', result);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Libro no encontrado' });
    }

    res.status(200).json({ message: 'Libro actualizado exitosamente' });
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

// Nueva ruta para buscar libros
app.get('/searchBooks', (req, res) => {
  const { busqueda, autor, categoria, titulo } = req.query;
  let query = 'SELECT * FROM Libro WHERE 1=1';
  const params = [];

  if (busqueda) {
    query += ' AND (Titulo LIKE ? OR Autor LIKE ? OR ISBN LIKE ?)';
    params.push(`%${busqueda}%`, `%${busqueda}%`, `%${busqueda}%`);
  }
  if (autor) {
    query += ' AND Autor = ?';
    params.push(autor);
  }
  if (categoria) {
    query += ' AND Categoria = ?';
    params.push(categoria);
  }
  if (titulo) {
    query += ' AND Titulo = ?';
    params.push(titulo);
  }

  pool.query(query, params, (err, results) => {
    if (err) {
      console.error('Error durante la búsqueda de libros:', err);
      return res.status(500).send({ message: 'Error interno del servidor' });
    }
    res.status(200).send(results);
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});