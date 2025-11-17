# API FastAPI - Gestión de Países

API RESTful desarrollada en **Python** con **FastAPI** framework para gestionar países de manera eficiente y escalable.

## 📋 Requisitos

- **Python** 3.9+
- **pip** (gestor de paquetes)

## 🚀 Instalación y Ejecución

```bash
# 1. Instalar dependencias
pip install -r requirements.txt

# 2. Ejecutar la API
uvicorn main:app --host 0.0.0.0 --port 3003 --reload
```

La API estará disponible en `http://localhost:3003`

**Documentación interactiva:**
- Swagger UI: `http://localhost:3003/docs`
- ReDoc: `http://localhost:3003/redoc`

### Salida esperada:
```
✓ Base de datos SQLite inicializada
✓ Iniciando API FastAPI en http://localhost:3003
✓ Documentación Swagger: http://localhost:3003/docs
✓ Documentación ReDoc: http://localhost:3003/redoc

INFO:     Uvicorn running on http://0.0.0.0:3003
INFO:     Application startup complete
```

## 🔌 Endpoints

### GET `/api/paises`
Obtiene todos los países registrados.

**Respuesta (200 OK):**
```json
[
  {
    "id": 1,
    "nombre": "Chile",
    "dirigente": "Gabriel Boric"
  },
  {
    "id": 2,
    "nombre": "Argentina",
    "dirigente": "Javier Milei"
  }
]
```

---

### GET `/api/paises/{id}`
Obtiene un país específico por su ID.

**Parámetros:**
- `id` (integer): ID del país

**Respuesta (200 OK):**
```json
{
  "id": 1,
  "nombre": "Chile",
  "dirigente": "Gabriel Boric"
}
```

**Respuesta (404 Not Found):**
```json
{
  "detail": "País no encontrado"
}
```

---

### POST `/api/paises`
Crea un nuevo país.

**Body (JSON):**
```json
{
  "nombre": "Perú",
  "dirigente": "Dina Boluarte"
}
```

**Respuesta (201 Created):**
```json
{
  "id": 3,
  "nombre": "Perú",
  "dirigente": "Dina Boluarte"
}
```

**Validación:**
- `nombre` es requerido (string)
- `dirigente` es requerido (string)
- El nombre debe ser único

---

### PUT `/api/paises/{id}`
Actualiza un país existente.

**Parámetros:**
- `id` (integer): ID del país a actualizar

**Body (JSON):**
```json
{
  "nombre": "Chile Actualizado",
  "dirigente": "Fernando Atria"
}
```

**Respuesta (200 OK):**
```json
{
  "id": 1,
  "nombre": "Chile Actualizado",
  "dirigente": "Fernando Atria"
}
```

---

### DELETE `/api/paises/{id}`
Elimina un país.

**Parámetros:**
- `id` (integer): ID del país a eliminar

**Respuesta (200 OK):**
```json
{
  "mensaje": "País eliminado correctamente",
  "id": 1
}
```

---

## 💾 Base de Datos

SQLite se inicializa automáticamente al ejecutar el servidor.

**Tabla `paises`:**
```sql
CREATE TABLE paises (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nombre TEXT NOT NULL UNIQUE,
  dirigente TEXT NOT NULL
)
```

El archivo de base de datos se crea en: `db_paises.db`

---

## 📂 Estructura del Código

### Archivo principal: `main.py`

```
main.py
├── Imports y configuración FastAPI
├── app = FastAPI()                  -- Instancia de la aplicación
├── CORSMiddleware                   -- Configuración CORS
│
├── Modelos Pydantic
│   └── Pais                         -- Esquema de validación
│
├── Funciones de Base de Datos
│   ├── init_db()                    -- Inicializa tabla
│   └── get_db()                     -- Obtiene conexión
│
├── Endpoints
│   ├── @app.get("/")                -- Raíz
│   ├── @app.get("/api/paises")      -- Obtener todos
│   ├── @app.get("/api/paises/{id}") -- Obtener por ID
│   ├── @app.post("/api/paises")     -- Crear
│   ├── @app.put("/api/paises/{id}") -- Actualizar
│   └── @app.delete("/api/paises/{id}") -- Eliminar
│
└── main()                           -- Inicia servidor con Uvicorn
```

**Puntos clave:**
- ✓ Framework FastAPI moderno y eficiente
- ✓ Validación automática con Pydantic
- ✓ CORS habilitado automáticamente
- ✓ Documentación automática (Swagger UI)
- ✓ Type hints y validación integrada
- ✓ Manejo robusto de errores

---

## 🧪 Ejemplos de Uso

### Con cURL

```bash
# Obtener todos los países
curl http://localhost:3003/api/paises

# Obtener país por ID
curl http://localhost:3003/api/paises/1

# Crear nuevo país
curl -X POST http://localhost:3003/api/paises \
  -H "Content-Type: application/json" \
  -d '{"nombre":"Bolivia","dirigente":"Luis Arce"}'

# Actualizar país
curl -X PUT http://localhost:3003/api/paises/1 \
  -H "Content-Type: application/json" \
  -d '{"nombre":"Chile","dirigente":"Nuevo Presidente"}'

# Eliminar país
curl -X DELETE http://localhost:3003/api/paises/1
```

### Con Python/Requests

```python
import requests

BASE_URL = 'http://localhost:3003/api'

# Obtener todos
paises = requests.get(f'{BASE_URL}/paises').json()

# Crear
nuevo = requests.post(
  f'{BASE_URL}/paises',
  json={'nombre': 'Uruguay', 'dirigente': 'Luis Lacalle Pou'}
).json()

# Actualizar
actualizado = requests.put(
  f'{BASE_URL}/paises/1',
  json={'nombre': 'Chile', 'dirigente': 'Claudia Sheinbaum'}
).json()

# Eliminar
requests.delete(f'{BASE_URL}/paises/1')
```

### Con JavaScript/Fetch

```javascript
const BASE_URL = 'http://localhost:3003/api';

// Obtener todos
const paises = await fetch(`${BASE_URL}/paises`)
  .then(r => r.json());

// Crear
const nuevo = await fetch(`${BASE_URL}/paises`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ 
    nombre: 'Colombia', 
    dirigente: 'Gustavo Petro' 
  })
}).then(r => r.json());

// Actualizar
const actualizado = await fetch(`${BASE_URL}/paises/1`, {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ 
    nombre: 'Chile', 
    dirigente: 'Candidato X' 
  })
}).then(r => r.json());

// Eliminar
await fetch(`${BASE_URL}/paises/1`, { method: 'DELETE' });
```

---

## 🎯 Ventajas de FastAPI

✅ **Moderno** - Basado en estándares actuales (ASGI, Pydantic)
✅ **Rápido** - Rendimiento comparable a Node.js y Go
✅ **Validación automática** - Pydantic valida datos automáticamente
✅ **Documentación automática** - Swagger UI y ReDoc
✅ **Type hints** - Mejor IDE support y prevención de errores
✅ **CORS integrado** - Fácil configuración
✅ **Escalable** - Preparado para producción

---

## 🔧 Configuración

### Puerto
Por defecto: **3003**

Para cambiar el puerto:
```bash
uvicorn main:app --host 0.0.0.0 --port 5000
```

### Base de Datos
Por defecto: `db_paises.db` en el directorio actual

### CORS
CORS está habilitado para todos los orígenes por defecto. Para restringir:

```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:8000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

---

## 🚀 Modo Desarrollo

```bash
# Con auto-reload
uvicorn main:app --reload

# Con debug
uvicorn main:app --reload --log-level debug
```

---

## 📦 Dependencias

```
fastapi==0.104.1       -- Framework web
uvicorn==0.24.0        -- Servidor ASGI
pydantic==2.5.0        -- Validación de datos
python-multipart==0.0.6 -- Soporte multipart
```

---

## 🐛 Solución de Problemas

### Error: "Address already in use"
El puerto 3003 ya está en uso.

```powershell
# Windows - encontrar proceso en puerto 3003
netstat -ano | findstr :3003

# Matar proceso
taskkill /PID <PID> /F
```

### Error: "ModuleNotFoundError: No module named 'fastapi'"
Las dependencias no están instaladas.

```bash
pip install -r requirements.txt
```

### Base de datos vacía
El archivo `db_paises.db` se crea automáticamente la primera vez que se ejecuta la API.

---

## 📊 Comparación con Otras Implementaciones

| Característica | FastAPI | Express | NestJS |
|---|---|---|---|
| **Lenguaje** | Python | JavaScript | TypeScript |
| **Framework** | Moderno | Minimalista | Enterprise |
| **Dependencias** | 4 | 3+ | 10+ |
| **Velocidad** | Muy rápida | Rápida | Rápida |
| **Validación** | Automática (Pydantic) | Manual | Manual |
| **Documentación** | Automática (Swagger) | Manual | Manual |
| **Type Safety** | Sí (Type hints) | No (opcional) | Sí (TypeScript) |
| **Curva aprendizaje** | Media | Baja | Alta |

---

## 📝 Stack Tecnológico

- **FastAPI**: Framework web async
- **Uvicorn**: Servidor ASGI
- **Pydantic**: Validación de datos
- **Python 3.9+**: Lenguaje de programación
- **SQLite3**: Base de datos embebida

---

**Última actualización**: Noviembre 2025
**Desarrollado para**: Taller 2 - Arquitectura de Microservicios

## 📋 Requisitos

- **Python** 3.9+
- **pip** (opcional, para futuras extensiones)

## 🚀 Instalación y Ejecución

```bash
# Sin dependencias externas - usar directamente
python main.py
```

La API estará disponible en `http://localhost:3003`

### Salida esperada:
```
✓ Base de datos SQLite inicializada
✓ API de Países corriendo en http://localhost:3003
✓ Endpoints disponibles:
  GET    http://localhost:3003/api/paises
  GET    http://localhost:3003/api/paises/{id}
  POST   http://localhost:3003/api/paises
  PUT    http://localhost:3003/api/paises/{id}
  DELETE http://localhost:3003/api/paises/{id}

✓ Presiona Ctrl+C para detener el servidor
```

## 🔌 Endpoints

### GET `/api/paises`
Obtiene todos los países registrados.

**Respuesta (200 OK):**
```json
[
  {
    "id": 1,
    "nombre": "Chile",
    "dirigente": "Gabriel Boric"
  },
  {
    "id": 2,
    "nombre": "Argentina",
    "dirigente": "Javier Milei"
  }
]
```

---

### GET `/api/paises/{id}`
Obtiene un país específico por su ID.

**Parámetros:**
- `id` (integer): ID del país

**Respuesta (200 OK):**
```json
{
  "id": 1,
  "nombre": "Chile",
  "dirigente": "Gabriel Boric"
}
```

**Respuesta (404 Not Found):**
```json
{
  "error": "País no encontrado"
}
```

---

### POST `/api/paises`
Crea un nuevo país.

**Body (JSON):**
```json
{
  "nombre": "Perú",
  "dirigente": "Dina Boluarte"
}
```

**Respuesta (201 Created):**
```json
{
  "id": 3,
  "nombre": "Perú",
  "dirigente": "Dina Boluarte"
}
```

**Validación:**
- `nombre` es requerido (string)
- `dirigente` es requerido (string)
- El nombre debe ser único

---

### PUT `/api/paises/{id}`
Actualiza un país existente.

**Parámetros:**
- `id` (integer): ID del país a actualizar

**Body (JSON):**
```json
{
  "nombre": "Chile Actualizado",
  "dirigente": "Fernando Atria"
}
```

**Respuesta (200 OK):**
```json
{
  "id": 1,
  "nombre": "Chile Actualizado",
  "dirigente": "Fernando Atria"
}
```

---

### DELETE `/api/paises/{id}`
Elimina un país.

**Parámetros:**
- `id` (integer): ID del país a eliminar

**Respuesta (200 OK):**
```json
{
  "mensaje": "País eliminado correctamente",
  "id": 1
}
```

---

## 💾 Base de Datos

SQLite se inicializa automáticamente al ejecutar el servidor.

**Tabla `paises`:**
```sql
CREATE TABLE paises (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nombre TEXT NOT NULL UNIQUE,
  dirigente TEXT NOT NULL
)
```

El archivo de base de datos se crea en: `db_paises.db`

---

## 📂 Estructura del Código

### Archivo principal: `main.py`

```
main.py
├── init_db()              -- Inicializa tabla de países
├── get_db()               -- Obtiene conexión a SQLite
├── parse_json_body()      -- Parsea JSON del request
├── PaisesHandler          -- Clase manejadora HTTP
│   ├── do_GET()           -- Maneja solicitudes GET
│   ├── do_POST()          -- Maneja solicitudes POST
│   ├── do_PUT()           -- Maneja solicitudes PUT
│   ├── do_DELETE()        -- Maneja solicitudes DELETE
│   ├── do_OPTIONS()       -- Maneja solicitudes OPTIONS (CORS)
│   ├── end_headers()      -- Agrega headers CORS
│   └── log_message()      -- Silencia logs
└── main()                 -- Inicia el servidor HTTPServer
```

**Puntos clave:**
- ✓ Solo librerías estándar (sqlite3, json, http.server)
- ✓ CORS habilitado automáticamente
- ✓ Validación de entrada (nombre y dirigente obligatorios)
- ✓ Control de duplicados mediante constraint UNIQUE
- ✓ Manejo robusto de errores HTTP
- ✓ Servidor HTTP concurrente

---

## 🧪 Ejemplos de Uso

### Con cURL

```bash
# Obtener todas los países
curl http://localhost:3003/api/paises

# Obtener país por ID
curl http://localhost:3003/api/paises/1

# Crear nuevo país
curl -X POST http://localhost:3003/api/paises \
  -H "Content-Type: application/json" \
  -d '{"nombre":"Bolivia","dirigente":"Luis Arce"}'

# Actualizar país
curl -X PUT http://localhost:3003/api/paises/1 \
  -H "Content-Type: application/json" \
  -d '{"nombre":"Chile","dirigente":"Nuevo Presidente"}'

# Eliminar país
curl -X DELETE http://localhost:3003/api/paises/1
```

### Con Python/Requests

```python
import requests
import json

BASE_URL = 'http://localhost:3003/api'

# Obtener todos
paises = requests.get(f'{BASE_URL}/paises').json()

# Crear
nuevo = requests.post(
  f'{BASE_URL}/paises',
  json={'nombre': 'Uruguay', 'dirigente': 'Luis Lacalle Pou'},
  headers={'Content-Type': 'application/json'}
).json()

# Actualizar
actualizado = requests.put(
  f'{BASE_URL}/paises/1',
  json={'nombre': 'Chile', 'dirigente': 'Claudia Sheinbaum'},
  headers={'Content-Type': 'application/json'}
).json()

# Eliminar
requests.delete(f'{BASE_URL}/paises/1')
```

### Con JavaScript/Fetch

```javascript
const BASE_URL = 'http://localhost:3003/api';

// Obtener todos
const paises = await fetch(`${BASE_URL}/paises`)
  .then(r => r.json());

// Crear
const nuevo = await fetch(`${BASE_URL}/paises`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ 
    nombre: 'Colombia', 
    dirigente: 'Gustavo Petro' 
  })
}).then(r => r.json());

// Actualizar
const actualizado = await fetch(`${BASE_URL}/paises/1`, {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ 
    nombre: 'Chile', 
    dirigente: 'Candidato X' 
  })
}).then(r => r.json());

// Eliminar
await fetch(`${BASE_URL}/paises/1`, { method: 'DELETE' });
```

---

## 🎯 Ventajas de esta Implementación

✅ **Sin dependencias externas** - Solo librerías estándar de Python
✅ **Ligero y rápido** - Overhead mínimo
✅ **Fácil de mantener** - Código simple y legible
✅ **CORS automático** - Comunicación con frontend sin problemas
✅ **Validación integrada** - Manejo de errores robusto
✅ **Concurrente** - Maneja múltiples requests

---

## 🔧 Configuración

### Puerto
Por defecto: **3003**

Para cambiar el puerto, edita `main.py`:
```python
server = HTTPServer(('0.0.0.0', 3003), PaisesHandler)  # Cambiar 3003 aquí
```

### Base de Datos
Por defecto: `db_paises.db` en el directorio actual

---

## 🐛 Solución de Problemas

### Error: "Address already in use"
El puerto 3003 ya está en uso.

```bash
# Matar proceso en el puerto:
lsof -ti:3003 | xargs kill -9          # macOS/Linux
netstat -ano | findstr :3003           # Windows (encontrar PID)
taskkill /PID <PID> /F                 # Windows (matar proceso)
```

### Base de datos vacía
El archivo `db_paises.db` se crea automáticamente vacío la primera vez.

### Error: "Ya existe" al crear
Un país con ese nombre ya existe. Usa otro nombre o actualiza el existente.

---

## 📊 Comparación con Otras Implementaciones

| Característica | FastAPI (Python) | Express (Node.js) | NestJS (Node.js) |
|---|---|---|---|
| Dependencias | 0 | 3+ | 10+ |
| Tamaño | ~10 KB | ~100 KB | ~500 KB |
| Curva aprendizaje | Baja | Media | Alta |
| Rendimiento | Muy bueno | Excelente | Excelente |
| Escalabilidad | Media | Alta | Muy Alta |
| Framework | HTTP nativo | Minimalista | Enterprise |

---

## 📝 Stack Tecnológico

- **Python 3.9+**: Lenguaje de programación
- **SQLite3**: Base de datos embebida
- **http.server**: Servidor HTTP nativo
- **json**: Parsing JSON
- **socket**: Comunicación en red

---

**Última actualización**: Noviembre 2025
**Desarrollado para**: Taller 2 - Arquitectura de Microservicios
