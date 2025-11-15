import express, { Request, Response } from "express";
import sqlite3 from "sqlite3";
import bodyParser from "body-parser";
import path from "path";

const app = express();
app.use(bodyParser.json());

const DB_PATH = path.join(__dirname, "../usuarios.db");
const db = new sqlite3.Database(DB_PATH);

// Inicializar base de datos
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS usuarios (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nombre TEXT NOT NULL,
      rut TEXT NOT NULL UNIQUE
    )
  `, (err) => {
    if (err) console.error('Error creando tabla:', err);
    else console.log('✓ Base de datos usuarios inicializada');
  });
});

// GET - Obtener todos los usuarios
app.get('/api/usuarios', (req: Request, res: Response) => {
  db.all('SELECT * FROM usuarios', (err, rows) => {
    if (err) res.status(500).json({ error: 'Error al obtener usuarios' });
    else res.json(rows || []);
  });
});

// GET - Obtener usuario por ID
app.get('/api/usuarios/:id', (req: Request, res: Response) => {
  db.get('SELECT * FROM usuarios WHERE id = ?', [req.params.id], (err, row) => {
    if (err) res.status(500).json({ error: 'Error al obtener usuario' });
    else res.json(row || null);
  });
});

// POST - Crear nuevo usuario
app.post('/api/usuarios', (req: Request, res: Response) => {
  const { nombre, rut } = req.body;
  db.run(
    'INSERT INTO usuarios (nombre, rut) VALUES (?, ?)',
    [nombre, rut],
    function (err) {
      if (err) res.status(500).json({ error: 'Error al crear usuario' });
      else res.json({ id: this.lastID, nombre, rut });
    }
  );
});

// PUT - Actualizar usuario
app.put('/api/usuarios/:id', (req: Request, res: Response) => {
  const { nombre, rut } = req.body;
  db.run(
    'UPDATE usuarios SET nombre = ?, rut = ? WHERE id = ?',
    [nombre, rut, req.params.id],
    (err) => {
      if (err) res.status(500).json({ error: 'Error al actualizar usuario' });
      else res.json({ id: parseInt(req.params.id), nombre, rut });
    }
  );
});

// DELETE - Eliminar usuario
app.delete('/api/usuarios/:id', (req: Request, res: Response) => {
  db.run('DELETE FROM usuarios WHERE id = ?', [req.params.id], (err) => {
    if (err) res.status(500).json({ error: 'Error al eliminar usuario' });
    else res.json({ mensaje: 'Usuario eliminado' });
  });
});

// Iniciar servidor
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`✓ API Usuarios corriendo en http://localhost:${PORT}`);
});
