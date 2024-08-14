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

// Inicia el servidor después de probar la conexión a la base de datos
pool.getConnection((err, connection) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err.stack);
    return;
  }

  console.log('Conectado a la base de datos ');
  connection.release(); 

  // Inicia el servidor solo después de una conexión exitosa
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
  });
});

// Iniciar sesión
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).send({ message: 'El nombre de usuario y la contraseña son requeridos' });
  }

  try {
    pool.query('SELECT * FROM Bibliotecario WHERE NombreUsuario = ?', [username], (err, results) => {
      if (err) {
        console.error('Error durante la consulta:', err);
        return res.status(500).send({ message: 'Error interno del servidor' });
      }

      if (results.length === 0) {
        return res.status(401).send({ message: 'Credenciales inválidas' });
      }

      const user = results[0];
      const Contrasena = user.Contrasena;

      if (bcrypt.compareSync(password, Contrasena)) {
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

// Nueva ruta para préstamo de libros
app.post('/loanBook', (req, res) => {
  const { numeroControl, isbn, fechaPrestamo, fechaDevolucion, idBibliotecario } = req.body;

  // Verificar si las fechas son válidas
  if (!fechaPrestamo || !fechaDevolucion) {
      return res.status(400).send({ message: 'Las fechas de préstamo y devolución son requeridas' });
  }

  const sql = 'INSERT INTO Prestamo (NumeroControl, ISBN, FechaPrestamo, FechaDevolucion, IdBibliotecario) VALUES (?, ?, ?, ?, ?)';
  const values = [numeroControl, isbn, fechaPrestamo, fechaDevolucion, idBibliotecario];

  pool.query(sql, values, (err, results) => {
      if (err) {
          console.error('Error durante la inserción del préstamo:', err);
          return res.status(500).send({ message: 'Error interno del servidor' });
      }
      res.status(201).send({ message: 'Préstamo registrado exitosamente' });
  });
});

// Añadir un nuevo lector
app.post('/lector', (req, res) => {
  const { NombreCompleto, NumeroControl, Correo } = req.body;
  console.log('Hola');
  if (!NombreCompleto || !NumeroControl || !Correo) {
    return res.status(400).send({ message: 'Todos los campos son obligatorios' });
  }

  const query = 'INSERT INTO Lector (NombreCompleto, NumeroControl, Correo) VALUES (?, ?, ?)';
  const values = [NombreCompleto, NumeroControl, Correo];

  pool.query(query, values, (err) => {
    if (err) {
      console.error('Error durante la inserción:', err);
      return res.status(500).send({ message: 'Error interno del servidor' });
    }

    res.status(201).send({ message: 'Lector registrado exitosamente' });
  });
});


// Actualizar un lector
app.put('/lector/:id', (req, res) => {
  const { id } = req.params;
  const { NombreCompleto, NumeroControl, Correo } = req.body;

  if (!NombreCompleto || !NumeroControl || !Correo) {
    return res.status(400).json({ message: 'Todos los campos son obligatorios' });
  }

  const query = 'UPDATE Lector SET NombreCompleto = ?, NumeroControl = ?, Correo = ? WHERE id = ?';
  const values = [NombreCompleto, NumeroControl, Correo, id];

  pool.query(query, values, (err, result) => {
    if (err) {
      console.error('Error al actualizar el lector:', err);
      return res.status(500).json({ message: 'Error interno del servidor' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Lector no encontrado' });
    }

    res.status(200).json({ message: 'Lector actualizado exitosamente' });
  });
});


// Eliminar un lector
app.delete('/lector/:id', (req, res) => {
  const { id } = req.params;

  pool.query('DELETE FROM Lector WHERE id = ?', [Id], (err) => {
    if (err) {
      console.error('Error durante la eliminación:', err);
      return res.status(500).send({ message: 'Error interno del servidor' });
    }

    res.status(200).send({ message: 'Lector eliminado exitosamente' });
  });
});

// Buscar lectores
app.get('/lector', (req, res) => {
  const { busqueda, NumeroControl, Correo, NombreCompleto } = req.query;
  let query = 'SELECT * FROM Lector WHERE 1=1';
  const params = [];

  if (busqueda) {
    query += ' AND (nombreCompleto LIKE ? OR numeroControl LIKE ? OR correo LIKE ?)';
    params.push(`%${busqueda}%`, `%${busqueda}%`, `%${busqueda}%`);
  }
  if (NumeroControl) {
    query += ' AND numeroControl = ?';
    params.push(NumeroControl);
  }
  if(Correo) {
    query += ' AND correo = ?';
    params.push(Correo);
  }
  if (NombreCompleto) {
    query += ' AND nombreCompleto = ?';
    params.push(NombreCompleto);
  }

  pool.query(query, params, (err, results) => {
    if (err) {
      console.error('Error durante la búsqueda de lectores:', err);
      return res.status(500).send({ message: 'Error interno del servidor' });
    }
    res.status(200).send(results);
  });
});



// Añadir un nuevo bibliotecario
app.post('/bibliotecarios', (req, res) => {
  const { NombreCompleto, Correo, Telefono, IdAdmin, NombreUsuario, Contrasena } = req.body;

  if (!NombreCompleto || !Correo || !Telefono || !NombreUsuario || !Contrasena) {
    return res.status(400).send({ message: 'Todos los campos son obligatorios' });
  }
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(Contrasena, salt);

  const query = 'INSERT INTO Bibliotecario (NombreCompleto, Correo, Telefono, IdAdmin, NombreUsuario, Contrasena) VALUES (?, ?, ?, ?, ?, ?)';
  const values = [NombreCompleto, Correo, Telefono, IdAdmin, NombreUsuario, hash];

  pool.query(query, values, (err) => {
    if (err) {
      console.error('Error durante la inserción:', err);
      return res.status(500).send({ message: 'Error interno del servidor' });
    }

    res.status(201).send({ message: 'Bibliotecario registrado exitosamente' });
  });
});

// Actualizar un bibliotecario
app.put('/bibliotecarios/:id', (req, res) => {
  const { id } = req.params;
  const { NombreCompleto, Correo, Telefono, IdAdmin, NombreUsuario, Contrasena } = req.body;

  if (!NombreCompleto || !Correo || !Telefono || !IdAdmin || !NombreUsuario || !Contrasena) {
    return res.status(400).json({ message: 'Todos los campos son obligatorios' });
  }

  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(Contrasena, salt);

  const query = 'UPDATE Bibliotecario SET NombreCompleto = ?, Correo = ?, Telefono = ?, IdAdmin = ?, NombreUsuario = ?, Contrasena = ? WHERE IdBibliotecario = ?';
  const values = [NombreCompleto, Correo, Telefono, IdAdmin, NombreUsuario, hash, id];

  pool.query(query, values, (err, result) => {
    if (err) {
      console.error('Error al actualizar el bibliotecario:', err);
      return res.status(500).json({ message: 'Error interno del servidor' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Bibliotecario no encontrado' });
    }

    res.status(200).json({ message: 'Bibliotecario actualizado exitosamente' });
  });
});

// Eliminar un bibliotecario
app.delete('/bibliotecarios/:id', (req, res) => {
  const { id } = req.params;

  pool.query('DELETE FROM Bibliotecario WHERE IdBibliotecario = ?', [id], (err) => {
    if (err) {
      console.error('Error durante la eliminación:', err);
      return res.status(500).send({ message: 'Error interno del servidor' });
    }

    res.status(200).send({ message: 'Bibliotecario eliminado exitosamente' });
  });
});

// Buscar bibliotecarios
app.get('/bibliotecarios', (req, res) => {
  const { busqueda, NombreUsuario, Correo, NombreCompleto } = req.query;
  let query = 'SELECT * FROM Bibliotecario WHERE 1=1';
  const params = [];

  if (busqueda) {
    query += ' AND (NombreCompleto LIKE ? OR NombreUsuario LIKE ? OR Correo LIKE ?)';
    params.push(`%${busqueda}%`, `%${busqueda}%`, `%${busqueda}%`);
  }
  if (NombreUsuario) {
    query += ' AND NombreUsuario = ?';
    params.push(NombreUsuario);
  }
  if (Correo) {
    query += ' AND Correo = ?';
    params.push(Correo);
  }
  if (NombreCompleto) {
    query += ' AND NombreCompleto = ?';
    params.push(NombreCompleto);
  }

  pool.query(query, params, (err, results) => {
    if (err) {
      console.error('Error durante la búsqueda de bibliotecarios:', err);
      return res.status(500).send({ message: 'Error interno del servidor' });
    }
    res.status(200).send(results);
  });
});

// Obtener todas las multas
app.get('/multas', (req, res) => {
  pool.query('SELECT * FROM multasv2', (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

// Obtener una multa por ID
app.get('/multas/:id', (req, res) => {
  const { id } = req.params;
  pool.query('SELECT * FROM multasv2 WHERE IdMulta = ?', [id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (results.length > 0) {
      res.json(results[0]);
    } else {
      res.status(404).json({ error: 'Multa no encontrada' });
    }
  });
});

// Crear una nueva multa
app.post('/multas', (req, res) => {
  const { NumeroControl, Monto, FechaInicio, Estatus, IdPrestamo } = req.body;
  pool.query(
    'INSERT INTO multasv2 (NumeroControl, Monto, FechaInicio, Estatus, IdPrestamo) VALUES (?, ?, ?, ?, ?)',
    [NumeroControl, Monto, FechaInicio, Estatus, IdPrestamo],
    (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.status(201).json({ id: results.insertId });
    }
  );
});

// Actualizar una multa
app.patch('/multas/:id', (req, res) => {
  const { id } = req.params;
  const { NumeroControl, Monto, FechaInicio, Estatus, IdPrestamo } = req.body;
  pool.query(
    'UPDATE multasv2 SET NumeroControl = ?, Monto = ?, FechaInicio = ?, Estatus = ?, IdPrestamo = ? WHERE IdMulta = ?',
    [NumeroControl, Monto, FechaInicio, Estatus, IdPrestamo, id],
    (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      if (results.affectedRows > 0) {
        res.json({ message: 'Multa actualizada exitosamente' });
      } else {
        res.status(404).json({ error: 'Multa no encontrada' });
      }
    }
  );
});

// Eliminar una multa
app.delete('/multas/:id', (req, res) => {
  const { id } = req.params;
  pool.query('DELETE FROM multasv2 WHERE IdMulta = ?', [id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (results.affectedRows > 0) {
      res.json({ message: 'Multa eliminada exitosamente' });
    } else {
      res.status(404).json({ error: 'Multa no encontrada' });
    }
  });
});





