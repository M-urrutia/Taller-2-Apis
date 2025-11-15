import express, { Request, Response } from 'express';
import sqlite3 from 'sqlite3';
import bodyParser from 'body-parser';
import path from 'path';

const app = express();
app.use(bodyParser.json());

const DB_PATH = path.join(__dirname, '../ciudades.db');
const db = new sqlite3.Database(DB_PATH);

// Inicializar base de datos
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS ciudades (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nombre TEXT NOT NULL,
      poblacion INTEGER NOT NULL
    )
  `, (err) => {
    if (err) console.error('Error creando tabla:', err);
    else console.log('✓ Base de datos ciudades inicializada');
  });
});

// GET - Obtener todas las ciudades
app.get('/api/ciudades', (req: Request, res: Response) => {
  db.all('SELECT * FROM ciudades', (err, rows) => {
    if (err) res.status(500).json({ error: 'Error al obtener ciudades' });
    else res.json(rows || []);
  });
});

// GET - Obtener ciudad por ID
app.get('/api/ciudades/:id', (req: Request, res: Response) => {
  db.get('SELECT * FROM ciudades WHERE id = ?', [req.params.id], (err, row) => {
    if (err) res.status(500).json({ error: 'Error al obtener ciudad' });
    else res.json(row || null);
  });
});

// POST - Crear nueva ciudad
app.post('/api/ciudades', (req: Request, res: Response) => {
  const { nombre, poblacion } = req.body;
  db.run(
    'INSERT INTO ciudades (nombre, poblacion) VALUES (?, ?)',
    [nombre, poblacion],
    function (err) {
      if (err) res.status(500).json({ error: 'Error al crear ciudad' });
      else res.json({ id: this.lastID, nombre, poblacion });
    }
  );
});

// PUT - Actualizar ciudad
app.put('/api/ciudades/:id', (req: Request, res: Response) => {
  const { nombre, poblacion } = req.body;
  db.run(
    'UPDATE ciudades SET nombre = ?, poblacion = ? WHERE id = ?',
    [nombre, poblacion, req.params.id],
    (err) => {
      if (err) res.status(500).json({ error: 'Error al actualizar ciudad' });
      else res.json({ id: parseInt(req.params.id), nombre, poblacion });
    }
  );
});

// DELETE - Eliminar ciudad
app.delete('/api/ciudades/:id', (req: Request, res: Response) => {
  db.run('DELETE FROM ciudades WHERE id = ?', [req.params.id], (err) => {
    if (err) res.status(500).json({ error: 'Error al eliminar ciudad' });
    else res.json({ mensaje: 'Ciudad eliminada' });
  });
});

// Iniciar servidor
const PORT = 3002;
app.listen(PORT, () => {
  console.log(`✓ API Ciudades corriendo en http://localhost:${PORT}`);
});
