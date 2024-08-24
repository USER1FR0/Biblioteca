const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const mysql = require('mysql2');
const cors = require('cors');
const multer = require('multer');
const nodemailer = require('nodemailer');
const app = express();

// Configuración de multer para manejar la carga de archivos
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // Limita el tamaño del archivo a 5MB
  },
});



app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).send({ message: 'El nombre de usuario y la contraseña son requeridos' });
  }

  try {
    // Verificar si hay usuarios en la tabla Bibliotecario
    pool.query('SELECT COUNT(*) AS userCount FROM Bibliotecario', (err, result) => {
      if (err) {
        console.error('Error durante la consulta:', err);
        return res.status(500).send({ message: 'Error interno del servidor' });
      }

      const userCount = result[0].userCount;

      // Si no hay usuarios registrados, permitir el login con las credenciales de administrador
      if (userCount === 0) {
        if (username === 'root' && password === '123456') {
          const rootUser = { id: 0, username: 'root' }; 
          const token = generateToken(rootUser); 
          return res.status(200).send({ message: 'Login realizado exitosamente con usuario administrador', token });
        } else {
          return res.status(401).send({ message: 'Credenciales inválidas' });
        }
      } else {
        // Si hay usuarios registrados, proceder con la autenticación normal
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
            const token = generateToken(user); // Genera un token (implementa esta función)
            return res.status(200).send({ message: 'Login realizado exitosamente', token });
          } else {
            return res.status(401).send({ message: 'Credenciales inválidas' });
          }
        });
      }
    });
  } catch (err) {
    console.error('Error durante el login:', err);
    res.status(500).send({ message: 'Error interno del servidor' });
  }
});


// Función para generar un token 
function generateToken(user) {
  // Implementa la lógica para generar un token, por ejemplo usando jsonwebtoken
  return 'token'; // Reemplaza esto con el token real
}

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
app.post('/addBook', upload.single('portada'), (req, res) => {
  console.log('Cuerpo de la solicitud:', req.body);
  console.log('Archivo recibido:', req.file);

  const { isbn, titulo, autor, tema, categoria, descripcion, numeroEjemplares } = req.body;
  const portada = req.file ? req.file.buffer : null;

  console.log('Campos extraídos:', { isbn, titulo, autor, tema, categoria, descripcion, numeroEjemplares });

  if (!isbn || !titulo || !autor || !tema || !categoria || !numeroEjemplares) {
    console.log('Campos faltantes:', { isbn, titulo, autor, tema, categoria, numeroEjemplares });
    return res.status(400).json({ message: 'Todos los campos son obligatorios' });
  }

  const ejemplares = parseInt(numeroEjemplares, 10);
  if (isNaN(ejemplares)) {
    return res.status(400).json({ message: 'El número de ejemplares debe ser un número válido' });
  }

  const query = 'INSERT INTO Libro (ISBN, Titulo, Autor, Tema, Categoria, Descripcion, NumeroEjemplares, Portada) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
  const values = [isbn, titulo, autor, tema, categoria, descripcion || null, ejemplares, portada];

  pool.query(query, values, (err) => {
    if (err) {
      console.error('Error durante la inserción:', err);
      return res.status(500).json({ message: 'Error interno del servidor' });
    }

    res.status(201).json({ message: 'Libro registrado exitosamente' });
  });
});

// Rutas para manejar libros

// Actualizar solo la cantidad de ejemplares
app.put('/updateBook/quantity/:isbn', (req, res) => {
  const { isbn } = req.params;
  const { NumeroEjemplares } = req.body;

  console.log('Datos recibidos para actualizar cantidad:', req.body);

  if (NumeroEjemplares === undefined) {
    return res.status(400).json({ message: 'El campo NumeroEjemplares es obligatorio' });
  }

  const query = 'UPDATE Libro SET NumeroEjemplares = ? WHERE ISBN = ?';
  const values = [NumeroEjemplares, isbn];

  pool.query(query, values, (err, result) => {
    if (err) {
      console.error('Error al actualizar la cantidad de ejemplares:', err);
      return res.status(500).json({ message: 'Error interno del servidor', error: err.message });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Libro no encontrado' });
    }

    res.status(200).json({ message: 'Cantidad de libros actualizada exitosamente' });
  });
});

// Actualizar un libro (detalles)
app.put('/updateBook/:isbn', upload.single('portada'), (req, res) => {
  const { isbn } = req.params;
  const { Titulo, Autor, Tema, Categoria, Descripcion, NumeroEjemplares } = req.body;
  const portada = req.file ? req.file.buffer : null;

  console.log('Datos recibidos para actualizar libro:', req.body);
  console.log('Archivo recibido:', req.file);

  if (!Titulo || !Autor || !Tema || !Categoria || NumeroEjemplares === undefined) {
    return res.status(400).json({ message: 'Todos los campos son obligatorios', camposFaltantes: { Titulo, Autor, Tema, Categoria, NumeroEjemplares } });
  }

  let query = 'UPDATE Libro SET Titulo = ?, Autor = ?, Tema = ?, Categoria = ?, Descripcion = ?, NumeroEjemplares = ?';
  let values = [Titulo, Autor, Tema, Categoria, Descripcion, NumeroEjemplares];

  if (portada) {
    query += ', Portada = ?';
    values.push(portada);
  }

  query += ' WHERE ISBN = ?';
  values.push(isbn);

  pool.query(query, values, (err, result) => {
    if (err) {
      console.error('Error al actualizar el libro:', err);
      return res.status(500).json({ message: 'Error interno del servidor', error: err.message });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Libro no encontrado' });
    }

    res.status(200).json({ message: 'Libro actualizado exitosamente' });
  });
});
// Eliminar un libro
app.delete('/deleteBook/:isbn', (req, res) => {
  const { isbn } = req.params;

  // Primero, eliminar los préstamos asociados
  pool.query('DELETE FROM Prestamo WHERE ISBN = ?', [isbn], (err) => {
    if (err) {
      console.error('Error al eliminar los préstamos asociados:', err);
      return res.status(500).send({ message: 'Error interno del servidor', error: err.message });
    }

    // Ahora, eliminar el libro
    pool.query('DELETE FROM Libro WHERE ISBN = ?', [isbn], (err, result) => {
      if (err) {
        console.error('Error al eliminar el libro:', err);
        return res.status(500).send({ message: 'Error interno del servidor', error: err.message });
      }

      if (result.affectedRows === 0) {
        return res.status(404).send({ message: 'Libro no encontrado' });
      }

      res.status(200).send({ message: 'Libro eliminado exitosamente' });
    });
  });
});

// Nueva ruta para buscar libros
app.get('/searchBooks', (req, res) => {
  const { busqueda, autor, categoria, titulo } = req.query;
  let query = 'SELECT ISBN, Titulo, Autor, Tema, Categoria, Descripcion, NumeroEjemplares, Portada FROM Libro WHERE 1=1';
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

  // Verificar si el número de control es proporcionado
  if (!numeroControl) {
      return res.status(400).send({ message: 'Ingresa el número de control' });
  }

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

      // Actualizar la cantidad de ejemplares después de registrar el préstamo
      const updateQuery = 'UPDATE Libro SET NumeroEjemplares = NumeroEjemplares - 1 WHERE ISBN = ?';
      pool.query(updateQuery, [isbn], (updateErr, updateResult) => {
          if (updateErr) {
              console.error('Error al actualizar la cantidad de ejemplares:', updateErr);
              return res.status(500).send({ message: 'Error interno del servidor' });
          }

          res.status(201).send({ message: 'Préstamo registrado y cantidad de libros actualizada exitosamente' });
      });
  });
});

    // Configuración de nodemailer
    const userGmail = "utngbiblioteca@gmail.com";
    const passAppGmail = "xdvj jeil fjgn uham";
    
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: userGmail,
        pass: passAppGmail,
      },
      tls: {
        rejectUnauthorized: false,}

    });

    const crypto = require('crypto'); // Importar crypto para generar tokens

// Añadir un nuevo lector
app.post('/lector', (req, res) => {
  const { NombreCompleto, NumeroControl, Correo } = req.body;

  if (!NombreCompleto || !NumeroControl || !Correo) {
    return res.status(400).send({ message: 'Todos los campos son obligatorios' });
  }

  // Generar un token de confirmación
  const token = crypto.randomBytes(20).toString('hex');

  const query = 'INSERT INTO Lector (NombreCompleto, NumeroControl, Correo, TokenConfirmacion) VALUES (?, ?, ?, ?)';
  const values = [NombreCompleto, NumeroControl, Correo, token];

  pool.query(query, values, (err) => {
    if (err) {
      console.error('Error durante la inserción:', err);
      return res.status(500).send({ message: 'Error interno del servidor' });
    }

    const confirmUrl = `http://localhost:3000/confirm/${token}`;

// Enviar correo de confirmación
const mailOptions = {
  from: userGmail,
  to: Correo,
  subject: 'Confirma tu correo',
  html: `
    <div style="background-color: #f0f0f0; padding: 20px; text-align: center;">
      <div style="background-color: #ffffff; border-radius: 10px; padding: 30px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
        <h1 style="font-size: 24px; color: #333;">Bienvenido a la Biblioteca</h1>
        <p style="font-size: 18px; color: #555;">Hola <strong>${NombreCompleto}</strong>,</p>
        <p style="font-size: 18px; color: #555;">Por favor confirma tu correo haciendo clic en el siguiente enlace:</p>
        <p>
          <a href="${confirmUrl}" style="background-color: #007bff; color: white; padding: 10px 20px; text-align: center; text-decoration: none; display: inline-block; border-radius: 5px; font-size: 18px;">
            Confirmar Correo
          </a>
        </p>
        <p style="font-size: 16px; color: #555;">Saludos,<br>El equipo de la Biblioteca UTNG</p>
      </div>
    </div>
  `
};


    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log('Error al enviar el correo:', error);
      } else {
        console.log('Correo enviado: ' + info.response);
      }
    });

    res.status(201).send({ message: 'Lector registrado exitosamente. Revisa tu correo para confirmar.' });
  });
});

// Ruta para confirmar el correo
app.get('/confirm/:token', (req, res) => {
  const { token } = req.params;

  // Buscar el lector por el token y actualizar el estado de correo confirmado
  const query = 'UPDATE Lector SET CorreoConfirmado = TRUE WHERE TokenConfirmacion = ?';
  
  pool.query(query, [token], (err, result) => {
    if (err) {
      console.error('Error al confirmar el correo:', err);
      return res.status(500).send({ message: 'Error interno del servidor' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).send({ message: 'Lector no encontrado o el token es inválido' });
    }
// Mostrar mensaje de confirmación
     res.send(`
      <!DOCTYPE html>
      <html lang="es">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Confirmación de Correo</title>
        <style>
          .confirmation-message {
            max-width: 600px;
            margin: 20px auto;
            padding: 20px;
            border: 1px solid #007bff; /* Color del borde acorde a tu botón */
            border-radius: 10px;
            background-color: #f9f9f9; /* Fondo claro */
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            text-align: center;
          }
          .confirmation-message h2 {
            color: #007bff; /* Color del título */
            font-size: 24px;
          }
          .confirmation-message p {
            color: #333; /* Color del texto */
            font-size: 18px;
          }
        </style>
      </head>
      <body>
        <div class="confirmation-message">
          <h2>Correo Confirmado Exitosamente</h2>
          <p>¡Gracias por unirte a la Biblioteca UTNG!</p>
        </div>
      </body>
      </html>
    `);
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

  pool.query('DELETE FROM Lector WHERE id = ?', [id], (err) => {
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








// Obtener autores y editoriales
app.get('/api/libros/autores-editoriales', (req, res) => {
const query = `
  SELECT DISTINCT Autor, Categoria
  FROM Libro
  ORDER BY Autor, Categoria
`;

pool.query(query, (err, results) => {
  if (err) {
    console.error('Error al obtener autores y editoriales:', err);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
  
  const autores = [...new Set(results.map(row => row.Autor))];
  const editoriales = [...new Set(results.map(row => row.Categoria))];
  
  res.json({ autores, editoriales });
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

// Manejador de errores global
app.use((err, req, res, next) => {
console.error(err.stack);
res.status(500).send('Algo salió mal!');
});

// Obtener todas las multas
app.get('/multas', (req, res) => {
  pool.query('SELECT * FROM Multas', (err, results) => {
    if (err) {
      console.error('Error al obtener las multas:', err);
      return res.status(500).json({ error: 'Error interno del servidor' });
    }
    res.json(results);
  });
});

// Obtener una multa por ID
app.get('/multas/:id', (req, res) => {
  const { id } = req.params;

  // Validar que el ID sea un número entero positivo
  if (!Number.isInteger(Number(id)) || Number(id) <= 0) {
    return res.status(400).json({ error: 'ID inválido' });
  }

  pool.query('SELECT * FROM Multas WHERE IdMulta = ?', [id], (err, results) => {
    if (err) {
      console.error('Error al obtener la multa:', err);
      return res.status(500).json({ error: 'Error interno del servidor' });
    }
    if (results.length > 0) {
      res.json(results[0]);
    } else {
      res.status(404).json({ error: 'Multa no encontrada' });
    }
  });
});

//Crear multa
app.post('/multas', (req, res) => {
  const { NumeroControl, Monto, FechaInicio, Estatus, IdPrestamo } = req.body;

  // Validar datos requeridos
  if (!NumeroControl || !Monto || !FechaInicio || !Estatus || !IdPrestamo) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }

  // Validar tipo de datos
  if (isNaN(Monto) || Number(Monto) < 0) {
    return res.status(400).json({ error: 'Monto debe ser un número positivo' });
  }

  if (isNaN(IdPrestamo) || Number(IdPrestamo) <= 0) {
    return res.status(400).json({ error: 'IdPrestamo debe ser un número entero positivo' });
  }

  const query = 'INSERT INTO Multas (NumeroControl, Monto, FechaInicio, Estatus, IdPrestamo) VALUES (?, ?, ?, ?, ?)';
  const values = [NumeroControl, Monto, FechaInicio, Estatus, IdPrestamo];

  pool.query(query, values, (err, results) => {
    if (err) {
      console.error('Error al crear la multa:', err);
      return res.status(500).json({ error: 'Error interno del servidor' });
    }

    // Obtener el correo del lector asociado al número de control
    const lectorQuery = 'SELECT Correo FROM Lector WHERE NumeroControl = ?';
    pool.query(lectorQuery, [NumeroControl], (err, lectorResult) => {
      if (err) {
        console.error('Error al obtener el correo del lector:', err);
        return res.status(500).json({ error: 'Error interno del servidor' });
      }

      if (lectorResult.length === 0) {
        return res.status(404).json({ error: 'Lector no encontrado' });
      }

      const correoLector = lectorResult[0].Correo;

      // Enviar correo al lector
      const mailOptions = {
        from: userGmail,
        to: correoLector,
        subject: 'Notificación de Multa en la Biblioteca',
        html: `
          <div style="background-color: #f0f0f0; padding: 20px; text-align: center;">
            <div style="background-color: #ffffff; border-radius: 10px; padding: 30px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
              <h1 style="font-size: 24px; color: #333;">Notificación de Multa</h1>
              <p style="font-size: 18px; color: #555;">Estimado lector,</p>
              <p style="font-size: 18px; color: #555;">Se ha registrado una nueva multa en su cuenta con el número de control <strong>${NumeroControl}</strong>.</p>
              <p style="font-size: 18px; color: #555;">Monto: <strong>${Monto} MXN</strong></p>
              <p style="font-size: 16px; color: #555;">Por favor, visite la biblioteca para realizar el pago correspondiente.</p>
              <p style="font-size: 16px; color: #555;">Saludos,<br>El equipo de la Biblioteca UTNG</p>
            </div>
          </div>
        `
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error('Error al enviar el correo:', error);
          // Si ocurre un error al enviar el correo, aún retornamos el éxito en la creación de la multa
          return res.status(201).json({ 
            id: results.insertId, 
            message: 'Multa registrada, pero no se pudo enviar el correo.'
          });
        } else {
          console.log('Correo enviado: ' + info.response);
          return res.status(201).json({ 
            id: results.insertId, 
            message: 'Multa registrada y correo enviado exitosamente'
          });
        }
      });

        

    res.status(201).json({ id: results.insertId });
  });
});
});

// Actualizar una multa
app.patch('/multas/:id', (req, res) => {
  const { id } = req.params;
  const { NumeroControl, Monto, FechaInicio, Estatus, IdPrestamo } = req.body;

  // Validar que el ID sea un número entero positivo
  if (!Number.isInteger(Number(id)) || Number(id) <= 0) {
    return res.status(400).json({ error: 'ID inválido' });
  }

  // Validar datos requeridos
  if (NumeroControl === undefined || Monto === undefined || FechaInicio === undefined || Estatus === undefined || IdPrestamo === undefined) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }

  // Validar tipo de datos
  if (isNaN(Monto) || Number(Monto) < 0) {
    return res.status(400).json({ error: 'Monto debe ser un número positivo' });
  }

  if (isNaN(IdPrestamo) || Number(IdPrestamo) <= 0) {
    return res.status(400).json({ error: 'IdPrestamo debe ser un número entero positivo' });
  }

  const sql = 'UPDATE Multas SET NumeroControl = ?, Monto = ?, FechaInicio = ?, Estatus = ?, IdPrestamo = ? WHERE IdMulta = ?';
    const values = [NumeroControl, Monto, FechaInicio, Estatus, IdPrestamo, id];

  pool.query(sql, values, (err, results) => {
      if (err) {
        console.error('Error al actualizar la multa:', err);
        return res.status(500).json({ error: 'Error interno del servidor' });
      }
      if (results.affectedRows > 0) {
        res.json({ message: 'Multa actualizada exitosamente' });
      } else {
        res.status(404).json({ error: 'Multa no encontrada' });
      }
  });
});

// Eliminar una multa
app.delete('/multas/:id', (req, res) => {
  const { id } = req.params;

  // Validar que el ID sea un número entero positivo
  if (!Number.isInteger(Number(id)) || Number(id) <= 0) {
    return res.status(400).json({ error: 'ID inválido' });
  }

  pool.query('DELETE FROM Multas WHERE IdMulta = ?', [id], (err, results) => {
    if (err) {
      console.error('Error al eliminar la multa:', err);
      return res.status(500).json({ error: 'Error interno del servidor' });
    }
    if (results.affectedRows > 0) {
      res.json({ message: 'Multa eliminada exitosamente' });
    } else {
      res.status(404).json({ error: 'Multa no encontrada' });
    }
  });
});


 //Obtener todos los préstamos V2
 app.get('/loan', (req, res) => {
  const query = `
  SELECT p.IdPrestamo, p.ISBN, p.NumeroControl, p.FechaPrestamo, p.FechaDevolucion, l.Titulo
  FROM Prestamo p
  JOIN Libro l ON p.ISBN = l.ISBN
  WHERE p.Estado = 'Pendiente'
`;

  pool.query(query, (err, results) => {
    if (err) {
      console.error('Error al obtener préstamos:', err);
      return res.status(500).json({ error: 'Error interno del servidor' });
    }
    res.json(results);
  });
});

 //Obtener todos los préstamos
app.get('/loans', (req, res) => {
  const query = `
  SELECT p.IdPrestamo as id, p.ISBN, p.NumeroControl, p.FechaPrestamo, p.FechaDevolucion, l.Titulo
  FROM Prestamo p
  JOIN Libro l ON p.ISBN = l.ISBN
  WHERE p.Estado = 'Pendiente'
`;

  pool.query(query, (err, results) => {
    if (err) {
      console.error('Error al obtener préstamos:', err);
      return res.status(500).json({ error: 'Error interno del servidor' });
    }
    res.json(results);
  });
});

// Devolver un libro
app.delete('/returnBook/:id', (req, res) => {
  const { id } = req.params;
  console.log('ID del préstamo a devolver:', id);

  pool.query('SELECT ISBN FROM Prestamo WHERE IdPrestamo = ? ', [id,], (err, result) => {
    if (err) {
      console.error('Error al obtener el ISBN del préstamo:', err);
      return res.status(500).json({ error: 'Error interno del servidor' });
    }

    console.log('Resultado de la consulta:', result); // Para verificar qué se está devolviendo

    if (result.length === 0) {
      return res.status(404).json({ error: 'Préstamo no encontrado' });
    }

    const isbn = result[0].ISBN;

    pool.query('Update Prestamo SET Estado = ? WHERE IdPrestamo = ?', ['Devuelto',id], (err) => {
      if (err) {
        console.error('Error al devolver el libro:', err);
        return res.status(500).json({ error: 'Error interno del servidor' });
      }

      pool.query('SELECT NumeroEjemplares FROM Libro WHERE ISBN = ?', [isbn], (err, bookResult) => {
        if (err) {
          console.error('Error al obtener la cantidad de ejemplares del libro:', err);
          return res.status(500).json({ error: 'Error interno del servidor' });
        }
        if (bookResult.length === 0) {
          return res.status(404).json({ error: 'Libro no encontrado' });
        }

        const currentQuantity = bookResult[0].NumeroEjemplares;

        const newQuantity = currentQuantity + 1; // Aquí solo sumas 1 al eliminar el préstamo
        pool.query('UPDATE Libro SET NumeroEjemplares = ? WHERE ISBN = ?', [newQuantity, isbn], (err) => {
          if (err) {
            console.error('Error al actualizar la cantidad de ejemplares:', err);
            return res.status(500).json({ error: 'Error interno del servidor' });
          }

          res.json({ message: 'Préstamo eliminado y cantidad de libros actualizada exitosamente' });
        });
      });
    });
  });
});


// End point para el reporte personalizado
app.get('/Reporte', (req, res) => {
  const { fechaInicio, fechaFin } = req.query;

  let query = `
    SELECT 
      p.IdPrestamo,
      p.NumeroControl,
      l.NombreCompleto AS NombreLector,
      l.Correo AS CorreoLector,
      p.ISBN,
      lb.Titulo AS TituloLibro,
      lb.Autor AS AutorLibro,
      p.FechaPrestamo,
      p.FechaDevolucion,
      p.IdBibliotecario,
      p.Estado
    FROM Prestamo p
    JOIN Lector l ON p.NumeroControl = l.NumeroControl
    JOIN Libro lb ON p.ISBN = lb.ISBN
  `;

  let queryParams = [];

  if (fechaInicio && fechaFin) {
    query += ` WHERE p.FechaPrestamo BETWEEN ? AND ?`;
    queryParams.push(fechaInicio, fechaFin);
  }

  pool.query(query, queryParams, (err, results) => {
    if (err) {
      console.error('Error ejecutando la consulta:', err);
      res.status(500).send('Error al obtener los préstamos.');
    } else {
      console.log('Resultados de la consulta:', results); // Aquí inspeccionas los resultados
      res.json(results);
    }
  });
});



// Obtener un lector por su número de control
app.get('/lector/:numeroControl', (req, res) => {
  const { numeroControl } = req.params;

  pool.query('SELECT * FROM Lector WHERE NumeroControl = ?', [numeroControl], (err, results) => {
      if (err) {
          console.error('Error al obtener el lector:', err);
          return res.status(500).send({ message: 'Error interno del servidor' });
      }
      if (results.length === 0) {
          return res.status(404).send({ message: 'Lector no encontrado' });
      }
      res.status(200).send(results[0]);
  });
});