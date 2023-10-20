const express = require('express');
const mssql = require('mssql');
const app = express();
const port = 8080;
const ipAddr = '34.197.187.131';

const dbConfig = {
  user: process.env.MSSQL_USER,
  password: process.env.MSSQL_PASSWORD,
  database: 'ComedorBD',
  server: 'localhost',
  pool: { max: 10, min: 0, idleTimeoutMillis: 30000 },
  options: { trustServerCertificate: true }
};

async function connectDb() {
  try {
    await mssql.connect(dbConfig);
    console.log('Connected to the database.');
  } catch (err) {
    console.error('Unable to connect to the database.');
    throw err;
  }
}

connectDb();

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  res.type('text/plain');
  res.status(200);
  res.send('hola mundo');
});

app.get('/Administrador', async (req, res) => {
  try {
    const rows = (await mssql.query`
      SELECT IDAdmin, Nombre, Apellido1, Apellido2, ContrasenaAdmin FROM Administrador
    `).recordset;
    const result = [];
    for (let row of rows) {
      result.push({
        IDAdmin: row.IDAdmin,
        Nombre: row.Nombre,
        Apellido1: row.Apellido1,
        Apellido2: row.Apellido2,
        ContrasenaAdmin: row.ContrasenaAdmin,
        prelude: row.excerpt?.split(' ').slice(0, 3).join(' ') + '...',
        url: `http://${ipAddr}:${port}/Administrador/${row.IDAdmin}`
      });
    }
    res.json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});

app.get('/Administrador/:IDAdmin', async (req, res) => {
  try {
    const IDAdmin = req.params.IDAdmin;
    const rows = (await mssql.query`
        SELECT IDAdmin, Nombre, Apellido1, Apellido2, ContrasenaAdmin FROM Administrador 
        WHERE IDAdmin=${IDAdmin}
    `).recordset;
    const row = rows[0];
    if (row) {
      res.json({
        IDAdmin: row.IDAdmin,
        Nombre: row.Nombre,
        Apellido1: row.Apellido1,
        Apellido2: row.Apellido2,
        ContrasenaAdmin: row.ContrasenaAdmin,
      });
    } else {
      res.type('text').status(404).send(
        `Resource with ID = ${IDAdmin} not found.\n`);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

app.post('/Administrador', async (req, res) => {
  try {
    const {IDAdmin, Nombre, Apellido1, Apellido2, ContrasenaAdmin} = req.body;
    const result = await mssql.query`
      INSERT INTO Administrador (Nombre, Apellido1, Apellido2, ContrasenaAdmin) 
      VALUES (${Nombre}, ${Apellido1}, ${Apellido2}, ${ContrasenaAdmin}); 
      SELECT SCOPE_IDENTITY() AS [NewID]
    `;
    const newID = result.recordset[0]['NewID'];
    res.type('text').status(201).send(
      `Resource created with IDAdmin = ${newID}.\n`);
  } catch (err) {
    res.status(500).json(err);
  }
});

app.delete('/Administrador/:IDAdmin', async (req, res) => {
  try {
    const IDAdmin = req.params.IDAdmin;
    const result = await mssql.query`
      DELETE FROM Administrador 
      WHERE IDAdmin=${IDAdmin}
    `;
    if (result.rowsAffected[0] === 1) {
      res.type('text').send(`Resource with IDAdmin = ${IDAdmin} deleted.\n`);
    } else {
      res.type('text').status(404).send(
        `Resource with IDAdmin = ${IDAdmin} not found. No resources deleted.\n`);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

app.delete('/Administrador', async (req, res) => {
  try {
    const result = await mssql.query`
      DELETE FROM Administrador
    `;
    res.type('text').send(`${result.rowsAffected[0]} resource(s) deleted.\n`);
  } catch (err) {
    res.status(500).json(err);
  }
});

app.put('/Administrador/:IDAdmin', async (req, res) => {
  try {
    const IDAdmin = req.params.IDAdmin;
    const {Nombre, Apellido1, Apellido2, ContrasenaAdmin } = req.body;
    const result = await mssql.query`
        UPDATE Administrador 
        SET Nombre=${Nombre}, Apellido1=${Apellido1}, Apellido2=${Apellido2}, ContrasenaAdmin=${ContrasenaAdmin} 
        WHERE IDAdmin=${IDAdmin}
    `;
    if (result.rowsAffected[0] === 1) {
      res.type('text').send(
        `Resource with IDAdmin = ${IDAdmin} updated.\n`);
    } else {
      res.type('text').status(404).send(
        `Resource with IDAdmin = ${IDAdmin} not found. No resources updated.\n`);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});


app.get('/Usuario', async (req, res) => {
  try {
    const rows = (await mssql.query`
      SELECT IDUsuario, Nombre, Apellido1, Apellido2, CURP, Nacionalidad, Sexo, FechaNac, Condicion, Cel, Correo  FROM Usuario
    `).recordset;
    const result = [];
    for (let row of rows) {
      result.push({
        IDUsuario: row.IDUsuario,
        Nombre: row.Nombre,
        Apellido1: row.Apellido1,
        Apellido2: row.Apellido2,
        CURP: row.CURP,
        Nacionalidad: row.Nacionalidad,
        Sexo: row.Sexo,
        FechaNac: row.FechaNac,
        Condicion: row.Condicion,
        Cel: row.Cel,
        Correo: row.Correo,
      });
    }
    res.json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});

app.get('/Usuario/:IDUsuario', async (req, res) => {
  try {
    const IDUsuario = req.params.IDUsuario;
    const rows = (await mssql.query`
        SELECT IDUsuario, Nombre, Apellido1, Apellido2, CURP, Nacionalidad, Sexo, FechaNac, Condicion, Cel, Correo  FROM Usuario 
        WHERE IDUsuario=${IDUsuario}
    `).recordset;
    const row = rows[0];
    if (row) {
      res.json({
        IDUsuario: row.IDUsuario,
        Nombre: row.Nombre,
        Apellido1: row.Apellido1,
        Apellido2: row.Apellido2,
        CURP: row.CURP,
        Nacionalidad: row.Nacionalidad,
        Sexo: row.Sexo,
        FechaNac: row.FechaNac,
        Condicion: row.Condicion,
        Cel: row.Cel,
        Correo: row.Correo,
      });
    } else {
      res.type('text').status(404).send(
        `Resource with IDUsuario = ${IDUsuario} not found.\n`);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

app.post('/Usuario', async (req, res) => {
  try {
    const {Nombre, Apellido1, Apellido2, CURP, Nacionalidad, Sexo, FechaNac, Condicion, Cel, Correo} = req.body;
    const result = await mssql.query`
      INSERT INTO Usuario (Nombre, Apellido1, Apellido2, CURP, Nacionalidad, Sexo, FechaNac, Condicion, Cel, Correo) 
      VALUES (${Nombre}, ${Apellido1}, ${Apellido2}, ${CURP}, ${Nacionalidad}, ${Sexo}, ${FechaNac}, ${Condicion}, ${Cel}, ${Correo}); 
      SELECT SCOPE_IDENTITY() AS [NewID]
    `;
    const newID = result.recordset[0]['NewID'];
    res.type('text').status(201).send(
      `Resource created with IDUsuario = ${newID}.\n`);
  } catch (err) {
    res.status(500).json(err);
  }
});

app.post('/altaUsuario', async (req, res) => {
  try {
    const {
      Nombre,
      Apellido1,
      Apellido2,
      CURP,
      Nacionalidad,
      Sexo,
      FechaNac,
      Condicion,
      Cel,
      Correo,
    } = req.body;

    const request = new mssql.Request();
    request.input('Nombre', mssql.VarChar(50), Nombre);
    request.input('Apellido1', mssql.VarChar(50), Apellido1);
    request.input('Apellido2', mssql.VarChar(50), Apellido2);
    request.input('CURP', mssql.Char(18), CURP);
    request.input('Nacionalidad', mssql.VarChar(30), Nacionalidad);
    request.input('Sexo', mssql.Char(1), Sexo);
    request.input('FechaNac', mssql.Date, FechaNac);
    request.input('Condicion', mssql.VarChar(50), Condicion);
    request.input('Cel', mssql.VarChar(15), Cel);
    request.input('Correo', mssql.VarChar(30), Correo);
    request.output('Success', mssql.Bit);

    const result = await request.execute('dbo.PROC_altaUsuario');
    const success = result.output.Success;

    if (success === 1) {
      res.status(200).json({ mensaje: 'Usuario dado de alta con éxito' });
    } else {
      res.status(500).json({ error: 'Error al dar de alta al usuario' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

app.put('/Usuario/:IDUsuario', async (req, res) => {
  try {
    const IDUsuario = req.params.IDUsuario;
    const {Nombre, Apellido1, Apellido2, CURP, Nacionalidad, Sexo, FechaNac, Condicion, Cel, Correo } = req.body;
    const result = await mssql.query`
        UPDATE Usuario 
        SET Nombre=${Nombre}, Apellido1=${Apellido1}, Apellido2=${Apellido2}, CURP=${CURP}, Nacionalidad=${Nacionalidad},
        Sexo=${Sexo}, FechaNac=${FechaNac}, Condicion=${Condicion}, Cel=${Cel}, Correo=${Correo} 
        WHERE IDUsuario=${IDUsuario}
    `;
    if (result.rowsAffected[0] === 1) {
      res.type('text').send(
        `Resource with IDUsuario = ${IDUsuario} updated.\n`);
    } else {
      res.type('text').status(404).send(
        `Resource with IDUsuario = ${IDUsuario} not found. No resources updated.\n`);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});


app.get('/Asistencia', async (req, res) => {
  try {
    const rows = (await mssql.query`
      SELECT Fecha, Donacion, IDUsuario, FolioComedor FROM Asistencia
    `).recordset;
    const result = [];
    for (let row of rows) {
      result.push({
        Fecha: row.Fecha,
        Donacion: row.Donacion,
        IDUsuario: row.IDUsuario,
        FolioComedor: row.FolioComedor,
      });
    }
    res.json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});

app.get('/Inventario', async (req, res) => {
  try {
    const rows = (await mssql.query`
      SELECT FechaCad, Nombre, Cantidad, Presentacion, FolioComedor FROM Inventario
    `).recordset;
    const result = [];
    for (let row of rows) {
      result.push({
        FechaCad: row.FechaCad,
        Nombre: row.Nombre,
        Cantidad: row.Cantidad,
        Presentacion: row.Presentacion,
        FolioComedor: row.FolioComedor,
      });
    }
    res.json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});

app.get('/Estado', async (req, res) => {
  try {
    const rows = (await mssql.query`
      SELECT IDEstado, Estado FROM Estado
    `).recordset;
    const result = [];
    for (let row of rows) {
      result.push({
        IDEstado: row.IDEstado,
        Estado: row.Estado,
      });
    }
    res.json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});

app.get('/Condicion', async (req, res) => {
  try {
    const rows = (await mssql.query`
      SELECT IDCondicion, Cond FROM Condicion
    `).recordset;
    const result = [];
    for (let row of rows) {
      result.push({
        IDCondicion: row.IDCondicion,
        Cond: row.Cond,
      });
    }
    res.json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});

app.get('/Nacionalidad', async (req, res) => {
  try {
    const rows = (await mssql.query`
      SELECT IDNacionalidad, Nac FROM Nacionalidad
    `).recordset;
    const result = [];
    for (let row of rows) {
      result.push({
        IDNacionalidad: row.IDNacionalidad,
        Nac: row.Nac,
      });
    }
    res.json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});

app.get('/Calificaciones', async (req, res) => {
  try {
    const rows = (await mssql.query`
      SELECT IDUsuario, FolioComedor, Fecha, CalLimpieza, CalComida, CalAtencion FROM Calificaciones
    `).recordset;
    const result = [];
    for (let row of rows) {
      result.push({
        IDUsuario: row.IDUsuario,
        FolioComedor: row.FolioComedor,
        Fecha: row.Fecha,
        CalLimpieza: row.CalLimpieza,
        CalComida: row.CalComida,
        CalAtencion: row.CalAtencion,
      });
    }
    res.json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});

app.get('/Comedor', async (req, res) => {
  try {
    const rows = (await mssql.query`
      SELECT FolioComedor, Nombre, Ubicacion, Apertura, Usuario, ContraComedor, Estado FROM Comedor
    `).recordset;
    const result = [];
    for (let row of rows) {
      result.push({
        FolioComedor: row.FolioComedor,
        Nombre: row.Nombre,
        Ubicacion: row.Ubicacion,
        Apertura: row.Apertura,
        Usuario: row.Usuario,
        ContraComedor: row.ContraComedor,
        Estado: row.Estado,
      });
    }
    res.json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});

app.put('/Comedor/:FolioComedor', async (req, res) => {
  try {
    const FolioComedor = req.params.FolioComedor;
    const {Nombre, Ubicacion, Apertura, Usuario, ContraComedor, Estado} = req.body;
    const result = await mssql.query`
        UPDATE Comedor 
        SET Nombre=${Nombre}, Ubicacion=${Ubicacion}, Apertura=${Apertura}, Usuario=${Usuario}, ContraComedor=${ContraComedor}, Estado=${Estado}
        WHERE FolioComedor=${FolioComedor}
    `;
    if (result.rowsAffected[0] === 1) {
      res.type('text').send(
        `Resource with FolioComedor = ${FolioComedor} updated.\n`);
    } else {
      res.type('text').status(404).send(
        `Resource with FolioComedor = ${FolioComedor} not found. No resources updated.\n`);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

app.post('/Comedor', async (req, res) => {
  try {
    const {FolioComedor, Nombre, Ubicacion, Apertura, Usuario, ContraComedor, Estado} = req.body;
   const result = await mssql.query`
  INSERT INTO Comedor(Nombre, Ubicacion, Apertura, Usuario, ContraComedor, Estado)
  VALUES (${Nombre}, ${Ubicacion}, ${Apertura}, ${Usuario}, ${ContraComedor}, ${Estado});
`;

  } catch (err) {
    res.status(500).json(err);
  }
});


app.get('/inicioSesion/:id', async (req, res) => {
    try {
        // Variables
        let id = req.params.id;
        const request = new mssql.Request();
        request.input('IDUsuario', mssql.Int, id);
        request.output('Success', mssql.Bit);

        // Ejecuta el procedimiento almacenado
        let result = await request.execute('dbo.PROC_loginUsuarioID');
        let usuario = result.recordset;

        console.log(usuario);

        // Verifica el valor del parámetro de salida Success para determinar si la operación fue exitosa
        if (usuario && usuario.length > 0) {
            // Usuario encontrado, envía los datos como respuesta con el código 200
            res.status(200).json(usuario);
        } else {
            // Usuario no encontrado o no hay datos, responde con el código 300
            res.status(300).json({ mensaje: 'Usuario no encontrado' });
        }
    } catch (err) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});





app.get('/inicioSesion2/:curp', async(req, res) => {
    try{
        let curp = req.params.curp;
        const request = new mssql.Request();
        request.input('CURP', mssql.Char(18), curp)
        request.output('Success',mssql.Bit);
        
         //Ejecuta el procedimiento almacenado
        let result = await request.execute('dbo.PROC_loginUsuarioCURP');
        let usuario = result.recordset;
        console.log(usuario)
        
        // Verifica el valor del parámetro de salida Success para determinar si la operación fue exitosa
        if (usuario){
            res.status(200).json(usuario)
        } else{
            res.status(200).json({mensaje: 'Usuario no encontrado'});
        }
        
    } catch(err){
        res.status(500).json({ error: 'Error interno del servidor' })
    }
})



app.get('/inicioSesion3/:celular', async (req, res) => {
  try {
    let celular = req.params.celular;
    const request = new mssql.Request();
    request.input('Celular', mssql.VarChar(15), celular); // Ajusta el tipo de datos y la longitud
    request.output('Success', mssql.Bit);

    // Ejecuta el procedimiento almacenado
    let result = await request.execute('dbo.PROC_loginUsuarioCelular');
    let usuario = result.recordset;

    // Verifica el valor del parámetro de salida Success para determinar si la operación fue exitosa
    if (result.output.Success === true) {
      res.status(200).json(usuario);
    } else {
      res.status(200).json({ mensaje: 'Usuario no encontrado' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});



app.get('/inicioSesion4/:correo', async (req, res) => {
  try {
    let correo = req.params.correo;
    const request = new mssql.Request();
    request.input('Correo', mssql.VarChar(30), correo); // Ajusta el tipo de datos y la longitud
    request.output('Success', mssql.Bit);

    // Ejecuta el procedimiento almacenado
    let result = await request.execute('dbo.PROC_loginUsuarioCorreo');
    let usuario = result.recordset;

    // Verifica el valor del parámetro de salida Success para determinar si la operación fue exitosa
    if (result.output.Success === true) {
      res.status(200).json(usuario);
    } else {
      res.status(200).json({ mensaje: 'Usuario no encontrado' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});


app.post('/loginAdmin', async (req, res) => {
  try {
    const { IDAdmin, Contrasena } = req.body;

    const request = new mssql.Request();
    request.input('IDAdmin', mssql.Int, IDAdmin);
    request.input('Contrasena', mssql.VarChar(80), Contrasena);
    request.output('Success', mssql.Bit);

    await request.execute('dbo.PROC_logInAdmin');

    const success = request.parameters.Success.value;

    if (success === 1) {
      // Autenticación exitosa
      res.status(200).json({ mensaje: 'Autenticación exitosa' });
    } else {
      // Autenticación fallida
      res.status(401).json({ error: 'Credenciales inválidas' });
    }
  } catch (err) {
    console.error('Error al autenticar administrador:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});


// Definir una ruta para agregar un nuevo comedor
app.post('/api/altaComedor', async (req, res) => {
  try {
    const { FolioComedor, Nombre, Ubicacion, Apertura, Usuario, ContraComedor, Estado } = req.body;
    
    const request = new mssql.Request();
    request.input('FolioComedor', mssql.Int, FolioComedor);
    request.input('Nombre', mssql.VarChar(50), Nombre);
    request.input('Ubicacion', mssql.VarChar(80), Ubicacion);
    request.input('Apertura', mssql.Date, Apertura);
    request.input('Usuario', mssql.VarChar(10), Usuario);
    request.input('ContraComedor', mssql.VarChar(15), ContraComedor);
    request.input('Estado', mssql.Int, Estado);
    request.output('Success', mssql.Bit);

    await request.execute('dbo.PROC_altaComedor');

    const success = request.parameters.Success.value;

    if (success === 1) {
      // Alta exitosa
      res.status(200).json({ mensaje: 'Alta de comedor exitosa' });
    } else {
      // Alta fallida
      res.status(400).json({ error: 'Error en la alta de comedor' });
    }
  } catch (err) {
    console.error('Error en alta de comedor:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});



// Página 404
app.use((req, res) => {
  res.type('text/plain').status(404).send('404 - Not Found');
});

app.listen(port, () => {
  console.log(`Express inició en http://${ipAddr}:${port}`
    + '\nPresiona Ctrl-C para terminar.');
});
