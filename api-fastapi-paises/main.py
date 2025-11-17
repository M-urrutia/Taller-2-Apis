"""
API FastAPI - Gestión de Países
Puerto: 3003
Base de datos: SQLite (db_paises.db)

Endpoints:
  GET    /api/paises        - Obtener todos los países
  GET    /api/paises/{id}   - Obtener país por ID
  POST   /api/paises        - Crear nuevo país
  PUT    /api/paises/{id}   - Actualizar país
  DELETE /api/paises/{id}   - Eliminar país

Ejecutar: uvicorn main:app --host 0.0.0.0 --port 3003 --reload
"""

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import sqlite3
from typing import List, Optional

# ============================================================================
# CONFIGURACIÓN DE LA APLICACIÓN
# ============================================================================

app = FastAPI(
    title="API de Países",
    description="API REST para gestionar países",
    version="1.0.0"
)

# Configurar CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

DATABASE = 'db_paises.db'

# ============================================================================
# MODELOS PYDANTIC
# ============================================================================

class Pais(BaseModel):
    """Modelo de datos para un País"""
    id: Optional[int] = None
    nombre: str
    dirigente: str

    class Config:
        json_schema_extra = {
            "example": {
                "id": 1,
                "nombre": "Chile",
                "dirigente": "Gabriel Boric"
            }
        }

# ============================================================================
# UTILIDADES DE BASE DE DATOS
# ============================================================================

def init_db():
    """Inicializar tabla de países"""
    try:
        conn = sqlite3.connect(DATABASE)
        c = conn.cursor()
        c.execute('''
            CREATE TABLE IF NOT EXISTS paises (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                nombre TEXT NOT NULL UNIQUE,
                dirigente TEXT NOT NULL
            )
        ''')
        conn.commit()
        conn.close()
        print('✓ Base de datos SQLite inicializada')
    except Exception as e:
        print(f'✗ Error inicializando BD: {e}')

def get_db():
    """Obtener conexión a la base de datos"""
    conn = sqlite3.connect(DATABASE)
    conn.row_factory = sqlite3.Row
    return conn

# Inicializar DB al arrancar
init_db()

# ============================================================================
# ENDPOINTS
# ============================================================================

@app.get("/", tags=["Root"])
async def root():
    """Endpoint raíz - información de la API"""
    return {
        "mensaje": "API de Países - FastAPI",
        "version": "1.0.0",
        "documentacion": "http://localhost:3003/docs"
    }

@app.get("/api/paises", response_model=List[Pais], tags=["Países"])
async def obtener_paises():
    """Obtiene todos los países registrados"""
    try:
        conn = get_db()
        c = conn.cursor()
        c.execute('SELECT id, nombre, dirigente FROM paises ORDER BY id')
        paises = [Pais(id=row[0], nombre=row[1], dirigente=row[2]) for row in c.fetchall()]
        conn.close()
        return paises
    except Exception as e:
        raise HTTPException(status_code=500, detail=f'Error al obtener países: {str(e)}')

@app.get("/api/paises/{id}", response_model=Pais, tags=["Países"])
async def obtener_pais(id: int):
    """Obtiene un país específico por su ID"""
    try:
        conn = get_db()
        c = conn.cursor()
        c.execute('SELECT id, nombre, dirigente FROM paises WHERE id = ?', (id,))
        row = c.fetchone()
        conn.close()
        
        if not row:
            raise HTTPException(status_code=404, detail='País no encontrado')
        
        return Pais(id=row[0], nombre=row[1], dirigente=row[2])
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f'Error al obtener país: {str(e)}')

@app.post("/api/paises", response_model=Pais, status_code=201, tags=["Países"])
async def crear_pais(pais: Pais):
    """Crea un nuevo país
    
    Body: { "nombre": "string", "dirigente": "string" }
    """
    try:
        conn = get_db()
        c = conn.cursor()
        c.execute('INSERT INTO paises (nombre, dirigente) VALUES (?, ?)', 
                  (pais.nombre, pais.dirigente))
        conn.commit()
        pais_id = c.lastrowid
        conn.close()
        
        return Pais(id=pais_id, nombre=pais.nombre, dirigente=pais.dirigente)
    except sqlite3.IntegrityError:
        raise HTTPException(status_code=400, detail='El país ya existe')
    except Exception as e:
        raise HTTPException(status_code=500, detail=f'Error al crear país: {str(e)}')

@app.put("/api/paises/{id}", response_model=Pais, tags=["Países"])
async def actualizar_pais(id: int, pais: Pais):
    """Actualiza un país existente
    
    Body: { "nombre": "string", "dirigente": "string" }
    """
    try:
        conn = get_db()
        c = conn.cursor()
        c.execute('UPDATE paises SET nombre = ?, dirigente = ? WHERE id = ?',
                  (pais.nombre, pais.dirigente, id))
        conn.commit()
        
        if c.rowcount == 0:
            conn.close()
            raise HTTPException(status_code=404, detail='País no encontrado')
        
        conn.close()
        return Pais(id=id, nombre=pais.nombre, dirigente=pais.dirigente)
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f'Error al actualizar país: {str(e)}')

@app.delete("/api/paises/{id}", tags=["Países"])
async def eliminar_pais(id: int):
    """Elimina un país"""
    try:
        conn = get_db()
        c = conn.cursor()
        c.execute('DELETE FROM paises WHERE id = ?', (id,))
        conn.commit()
        
        if c.rowcount == 0:
            conn.close()
            raise HTTPException(status_code=404, detail='País no encontrado')
        
        conn.close()
        return {"mensaje": "País eliminado correctamente", "id": id}
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f'Error al eliminar país: {str(e)}')

# ============================================================================
# PUNTO DE ENTRADA
# ============================================================================

if __name__ == "__main__":
    import uvicorn
    print('✓ Iniciando API FastAPI en http://localhost:3003')
    print('✓ Documentación Swagger: http://localhost:3003/docs')
    print('✓ Documentación ReDoc: http://localhost:3003/redoc')
    uvicorn.run(app, host='0.0.0.0', port=3003)
