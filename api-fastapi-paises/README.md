# API FastAPI - Gestión de Países

API desarrollada con FastAPI y Python para gestionar países con SQLite.

## Requisitos

- Python 3.9+
- pip (gestor de paquetes de Python)

## Instalación

```bash
pip install -r requirements.txt
```

## Ejecución

```bash
# Usando uvicorn
uvicorn main:app --host 0.0.0.0 --port 3003 --reload
```

La API estará disponible en `http://localhost:3003`

### Documentación interactiva

- Swagger UI: `http://localhost:3003/docs`
- ReDoc: `http://localhost:3003/redoc`

## Endpoints

### Países

#### GET /api/paises
Obtiene todos los países

**Respuesta:**
```json
[
  {
    "id": 1,
    "nombre": "Chile",
    "dirigente": "Gabriel Boric"
  }
]
```

#### GET /api/paises/{id}
Obtiene un país por ID

**Parámetros:**
- `id` (integer): ID del país

#### POST /api/paises
Crea un nuevo país

**Body:**
```json
{
  "nombre": "Chile",
  "dirigente": "Gabriel Boric"
}
```

#### PUT /api/paises/{id}
Actualiza un país

**Parámetros:**
- `id` (integer): ID del país

**Body:**
```json
{
  "nombre": "Chile",
  "dirigente": "Gabriel Boric Actualizado"
}
```

#### DELETE /api/paises/{id}
Elimina un país

**Parámetros:**
- `id` (integer): ID del país

## Estructura de la Base de Datos

```sql
CREATE TABLE paises (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nombre TEXT NOT NULL,
  dirigente TEXT NOT NULL
);
```

## Archivos Principales

- `main.py` - Aplicación FastAPI con todos los endpoints
- `app.py` - Versión alternativa con Flask (opcional)
- `requirements.txt` - Dependencias de Python
- `db_paises.db` - Archivo de base de datos SQLite (se crea automáticamente)
