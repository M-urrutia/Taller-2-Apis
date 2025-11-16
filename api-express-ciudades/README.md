# API Express - Gestión de Ciudades

API RESTful desarrollada con **Express.js** y **TypeScript** para gestionar ciudades.

## 📋 Requisitos

- **Node.js** 16+ 
- **npm** o **yarn**

## 🚀 Instalación y Ejecución

```bash
# Instalar dependencias
npm install

# Modo desarrollo (con hot reload)
npm run dev

# Compilar a JavaScript
npm run build

# Ejecutar versión compilada
npm run start
```

La API estará disponible en `http://localhost:3002`

## 🔌 Endpoints

### GET `/api/ciudades`
Obtiene todas las ciudades registradas.

**Respuesta (200 OK):**
```json
[
  {
    "id": 1,
    "nombre": "Santiago",
    "poblacion": 5200000
  },
  {
    "id": 2,
    "nombre": "Valparaíso",
    "poblacion": 275000
  }
]
```

---

### GET `/api/ciudades/:id`
Obtiene una ciudad específica por su ID.

**Parámetros:**
- `id` (integer): ID de la ciudad

**Respuesta (200 OK):**
```json
{
  "id": 1,
  "nombre": "Santiago",
  "poblacion": 5200000
}
```

**Respuesta (404 Not Found):**
```json
{
  "error": "Ciudad no encontrada"
}
```

---

### POST `/api/ciudades`
Crea una nueva ciudad.

**Body (JSON):**
```json
{
  "nombre": "Concepción",
  "poblacion": 215000
}
```

**Respuesta (201 Created):**
```json
{
  "id": 3,
  "nombre": "Concepción",
  "poblacion": 215000
}
```

**Validación:**
- `nombre` es requerido (string)
- `poblacion` es requerido (number)
- El nombre debe ser único

---

### PUT `/api/ciudades/:id`
Actualiza una ciudad existente.

**Parámetros:**
- `id` (integer): ID de la ciudad a actualizar

**Body (JSON):**
```json
{
  "nombre": "Santiago 2",
  "poblacion": 5250000
}
```

**Respuesta (200 OK):**
```json
{
  "id": 1,
  "nombre": "Santiago 2",
  "poblacion": 5250000
}
```

---

### DELETE `/api/ciudades/:id`
Elimina una ciudad.

**Parámetros:**
- `id` (integer): ID de la ciudad a eliminar

**Respuesta (200 OK):**
```json
{
  "mensaje": "Ciudad eliminada correctamente",
  "id": 1
}
```

---

## 💾 Base de Datos

SQLite se inicializa automáticamente al arrancar la aplicación.

**Tabla `ciudades`:**
```sql
CREATE TABLE ciudades (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nombre TEXT NOT NULL UNIQUE,
  poblacion INTEGER NOT NULL
)
```

El archivo de base de datos se crea en: `api-express-ciudades/ciudades.db`

---

## 📊 Estructura del Código

```
src/
└── index.ts       -- Servidor Express con todos los endpoints
                     - Configuración de base de datos
                     - Rutas CRUD
                     - Manejo de errores
```

**Puntos clave:**
- ✓ Validación de entrada (nombre y población obligatorios)
- ✓ Control de duplicados mediante constraint UNIQUE
- ✓ Manejo robusto de errores HTTP
- ✓ Tipado completo con TypeScript
- ✓ Respuestas estructuradas en JSON

---

## 🧪 Ejemplos de Uso

### Con cURL

```bash
# Obtener todas las ciudades
curl http://localhost:3002/api/ciudades

# Obtener ciudad por ID
curl http://localhost:3002/api/ciudades/1

# Crear nueva ciudad
curl -X POST http://localhost:3002/api/ciudades \
  -H "Content-Type: application/json" \
  -d '{"nombre":"La Serena","poblacion":200000}'

# Actualizar ciudad
curl -X PUT http://localhost:3002/api/ciudades/1 \
  -H "Content-Type: application/json" \
  -d '{"nombre":"Santiago Actualizado","poblacion":5300000}'

# Eliminar ciudad
curl -X DELETE http://localhost:3002/api/ciudades/1
```

### Con JavaScript/Fetch

```javascript
// Obtener todas
const ciudades = await fetch('http://localhost:3002/api/ciudades')
  .then(r => r.json());

// Crear
const nueva = await fetch('http://localhost:3002/api/ciudades', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ nombre: 'Iquique', poblacion: 185000 })
}).then(r => r.json());

// Actualizar
const actualizado = await fetch('http://localhost:3002/api/ciudades/1', {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ nombre: 'Santiago', poblacion: 5400000 })
}).then(r => r.json());

// Eliminar
await fetch('http://localhost:3002/api/ciudades/1', { method: 'DELETE' });
```

---

## 🔧 Configuración

### Puerto
Por defecto: **3002**

Para cambiar el puerto, edita `src/index.ts`:
```typescript
const PORT = 3002;  // Cambiar aquí
```

### Base de Datos
Por defecto: `ciudades.db` en el directorio raíz del proyecto

---

## 🐛 Solución de Problemas

### Error: "EADDRINUSE: address already in use"
El puerto 3002 ya está en uso.

```bash
# Cambiar puerto en src/index.ts o
# Matar proceso en el puerto:
lsof -ti:3002 | xargs kill -9  # macOS/Linux
netstat -ano | findstr :3002   # Windows (encontrar PID y Kill)
```

### Error: "Tabla ya existe"
Es normal. SQLite intenta crear la tabla si no existe.

### Base de datos vacía
El archivo `ciudades.db` se crea automáticamente vacío.

---

## 📝 Stack Tecnológico

- **Express.js**: Framework web minimalista
- **TypeScript**: Tipado estático para JavaScript
- **SQLite3**: Base de datos embebida
- **body-parser**: Parseo de JSON
- **ts-node**: Ejecución directa de TypeScript

---

## 📦 Scripts disponibles

```json
{
  "dev": "ts-node src/index.ts",
  "build": "tsc",
  "start": "node dist/index.js"
}
```

---

**Última actualización**: Noviembre 2025
**Desarrollado para**: Taller 2 - Arquitectura de Microservicios
