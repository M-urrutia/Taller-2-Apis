/**
 * API Express - Gestión de Ciudades
 * Puerto: 3002
 * Base de datos: SQLite (ciudades.db)
 * 
 * Endpoints:
 * GET    /api/ciudades        - Obtener todas las ciudades
 * GET    /api/ciudades/:id    - Obtener ciudad por ID
 * POST   /api/ciudades        - Crear nueva ciudad
 * PUT    /api/ciudades/:id    - Actualizar ciudad
 * DELETE /api/ciudades/:id    - Eliminar ciudad
 */

import express, { Request, Response } from 'express';
import sqlite3 from 'sqlite3';
import bodyParser from 'body-parser';
import path from 'path';

const app = express();
app.use(bodyParser.json());

// Configuración de base de datos
const DB_PATH = path.join(__dirname, '../ciudades.db');
const db = new sqlite3.Database(DB_PATH);

/**
 * Inicializar tabla de ciudades
 * Columnas: id (auto), nombre (string), poblacion (integer)
 */
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS ciudades (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nombre TEXT NOT NULL UNIQUE,
      poblacion INTEGER NOT NULL
    )
  `, (err) => {
    if (err) console.error('✗ Error creando tabla:', err);
    else console.log('✓ Base de datos ciudades inicializada');
  });
});

/**
 * GET /api/ciudades
 * Obtiene todas las ciudades registradas
 */
app.get('/api/ciudades', (req: Request, res: Response) => {
  db.all('SELECT * FROM ciudades ORDER BY id', (err, rows) => {
    if (err) {
      res.status(500).json({ error: 'Error al obtener ciudades' });
    } else {
      res.json(rows || []);
    }
  });
});

/**
 * GET /api/ciudades/:id
 * Obtiene una ciudad específica por su ID
 */
app.get('/api/ciudades/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  db.get('SELECT * FROM ciudades WHERE id = ?', [id], (err, row) => {
    if (err) {
      res.status(500).json({ error: 'Error al obtener ciudad' });
    } else if (!row) {
      res.status(404).json({ error: 'Ciudad no encontrada' });
    } else {
      res.json(row);
    }
  });
});

/**
 * POST /api/ciudades
 * Crea una nueva ciudad
 * Body: { "nombre": "string", "poblacion": number }
 */
app.post('/api/ciudades', (req: Request, res: Response) => {
  const { nombre, poblacion } = req.body;

  // Validar entrada
  if (!nombre || !poblacion) {
    res.status(400).json({ error: 'nombre y poblacion son requeridos' });
    return;
  }

  db.run(
    'INSERT INTO ciudades (nombre, poblacion) VALUES (?, ?)',
    [nombre, poblacion],
    function (err) {
      if (err) {
        if (err.message.includes('UNIQUE')) {
          res.status(400).json({ error: 'La ciudad ya existe' });
        } else {
          res.status(500).json({ error: 'Error al crear ciudad' });
        }
      } else {
        res.status(201).json({ id: this.lastID, nombre, poblacion });
      }
    }
  );
});

/**
 * PUT /api/ciudades/:id
 * Actualiza una ciudad existente
 * Body: { "nombre": "string", "poblacion": number }
 */
app.put('/api/ciudades/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const { nombre, poblacion } = req.body;

  // Validar entrada
  if (!nombre || !poblacion) {
    res.status(400).json({ error: 'nombre y poblacion son requeridos' });
    return;
  }

  db.run(
    'UPDATE ciudades SET nombre = ?, poblacion = ? WHERE id = ?',
    [nombre, poblacion, id],
    function (err) {
      if (err) {
        if (err.message.includes('UNIQUE')) {
          res.status(400).json({ error: 'La ciudad ya existe' });
        } else {
          res.status(500).json({ error: 'Error al actualizar ciudad' });
        }
      } else if (this.changes === 0) {
        res.status(404).json({ error: 'Ciudad no encontrada' });
      } else {
        res.json({ id, nombre, poblacion });
      }
    }
  );
});

/**
 * DELETE /api/ciudades/:id
 * Elimina una ciudad
 */
app.delete('/api/ciudades/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id);

  db.run('DELETE FROM ciudades WHERE id = ?', [id], function (err) {
    if (err) {
      res.status(500).json({ error: 'Error al eliminar ciudad' });
    } else if (this.changes === 0) {
      res.status(404).json({ error: 'Ciudad no encontrada' });
    } else {
      res.json({ mensaje: 'Ciudad eliminada correctamente', id });
    }
  });
});

/**
 * Iniciar servidor
 */
const PORT = 3002;
app.listen(PORT, () => {
  console.log(`✓ API Ciudades (Express) corriendo en http://localhost:${PORT}`);
  console.log('✓ Endpoints disponibles:');
  console.log(`  GET    http://localhost:${PORT}/api/ciudades`);
  console.log(`  GET    http://localhost:${PORT}/api/ciudades/{id}`);
  console.log(`  POST   http://localhost:${PORT}/api/ciudades`);
  console.log(`  PUT    http://localhost:${PORT}/api/ciudades/{id}`);
  console.log(`  DELETE http://localhost:${PORT}/api/ciudades/{id}`);
});
