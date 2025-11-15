from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import sqlite3
from typing import List, Optional

app = FastAPI()
DATABASE = 'db_paises.db'

# Modelo de datos
class Pais(BaseModel):
    id: Optional[int] = None
    nombre: str
    dirigente: str

# Inicializar base de datos
def init_db():
    conn = sqlite3.connect(DATABASE)
    c = conn.cursor()
    c.execute('''
        CREATE TABLE IF NOT EXISTS paises (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nombre TEXT NOT NULL,
            dirigente TEXT NOT NULL
        )
    ''')
    conn.commit()
    conn.close()
    print('✓ Conexión a SQLite establecida')

# Obtener conexión
def get_db():
    conn = sqlite3.connect(DATABASE)
    conn.row_factory = sqlite3.Row
    return conn

# GET - Obtener todos los países
@app.get('/api/paises')
async def obtener_paises() -> List[Pais]:
    try:
        conn = get_db()
        c = conn.cursor()
        c.execute('SELECT * FROM paises')
        paises = [Pais(**dict(row)) for row in c.fetchall()]
        conn.close()
        return paises
    except Exception as e:
        raise HTTPException(status_code=500, detail='Error al obtener países')

# GET - Obtener país por ID
@app.get('/api/paises/{id}')
async def obtener_pais(id: int) -> Pais:
    try:
        conn = get_db()
        c = conn.cursor()
        c.execute('SELECT * FROM paises WHERE id = ?', (id,))
        pais = c.fetchone()
        conn.close()
        if pais:
            return Pais(**dict(pais))
        raise HTTPException(status_code=404, detail='País no encontrado')
    except Exception as e:
        raise HTTPException(status_code=500, detail='Error al obtener país')

# POST - Crear nuevo país
@app.post('/api/paises', status_code=201)
async def crear_pais(pais: Pais) -> Pais:
    try:
        conn = get_db()
        c = conn.cursor()
        c.execute('INSERT INTO paises (nombre, dirigente) VALUES (?, ?)', 
                  (pais.nombre, pais.dirigente))
        conn.commit()
        pais_id = c.lastrowid
        conn.close()
        
        return Pais(id=pais_id, nombre=pais.nombre, dirigente=pais.dirigente)
    except Exception as e:
        raise HTTPException(status_code=500, detail='Error al crear país')

# PUT - Actualizar país
@app.put('/api/paises/{id}')
async def actualizar_pais(id: int, pais: Pais) -> Pais:
    try:
        conn = get_db()
        c = conn.cursor()
        c.execute('UPDATE paises SET nombre = ?, dirigente = ? WHERE id = ?',
                  (pais.nombre, pais.dirigente, id))
        conn.commit()
        conn.close()
        
        return Pais(id=id, nombre=pais.nombre, dirigente=pais.dirigente)
    except Exception as e:
        raise HTTPException(status_code=500, detail='Error al actualizar país')

# DELETE - Eliminar país
@app.delete('/api/paises/{id}')
async def eliminar_pais(id: int):
    try:
        conn = get_db()
        c = conn.cursor()
        c.execute('DELETE FROM paises WHERE id = ?', (id,))
        conn.commit()
        conn.close()
        
        return {'mensaje': 'País eliminado'}
    except Exception as e:
        raise HTTPException(status_code=500, detail='Error al eliminar país')

if __name__ == '__main__':
    init_db()
    print('✓ API FastAPI corriendo en http://localhost:3003')
