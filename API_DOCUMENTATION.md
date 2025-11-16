# APIs del Taller 2 - Documentación Completa

## 📋 Resumen de Proyectos

Este taller contiene 3 APIs backend y 1 frontend integrados:

| API | Puerto | Tech | BD | Recurso |
|-----|--------|------|----|---------| 
| **api-express-ciudades** | 3002 | Express.js + TypeScript | SQLite | Ciudades |
| **api-fastapi-paises** | 3003 | Python (HTTP puro) | SQLite | Países |
| **api-nestjs-usuarios** | 3001 | NestJS + TypeORM | SQLite | Usuarios |
| **app-frontend** | - | JavaScript Vanilla | - | UI Web |

---

## 🚀 API 1: Express - Gestión de Ciudades (Puerto 3002)

### 📁 Ubicación
`api-express-ciudades/src/index.ts`

### 📦 Tecnologías
- **Framework**: Express.js
- **Lenguaje**: TypeScript
- **Base de datos**: SQLite (ciudades.db)
- **Validación**: Body parser

### 🔌 Endpoints

```bash
# Obtener todas las ciudades
GET /api/ciudades

# Obtener ciudad por ID
GET /api/ciudades/:id

# Crear nueva ciudad
POST /api/ciudades
# Body: { "nombre": "string", "poblacion": number }

# Actualizar ciudad
PUT /api/ciudades/:id
# Body: { "nombre": "string", "poblacion": number }

# Eliminar ciudad
DELETE /api/ciudades/:id
```

### 🏃 Ejecución

```bash
cd api-express-ciudades
npm install
npm run dev   # Modo desarrollo
# o
npm run build && npm run start
```

### 💡 Características
- ✓ Validación de entrada (nombre y población requeridos)
- ✓ Control de duplicados (nombre UNIQUE)
- ✓ Manejo de errores HTTP
- ✓ Respuestas tipadas con TypeScript

---

## 🐍 API 2: FastAPI - Gestión de Países (Puerto 3003)

### 📁 Ubicación
`api-fastapi-paises/main.py`

### 📦 Tecnologías
- **Framework**: Python HTTP Server (librerías estándar)
- **Lenguaje**: Python 3.9+
- **Base de datos**: SQLite (db_paises.db)
- **CORS**: Configurado automáticamente

### 🔌 Endpoints

```bash
# Obtener todos los países
GET /api/paises

# Obtener país por ID
GET /api/paises/{id}

# Crear nuevo país
POST /api/paises
# Body: { "nombre": "string", "dirigente": "string" }

# Actualizar país
PUT /api/paises/{id}
# Body: { "nombre": "string", "dirigente": "string" }

# Eliminar país
DELETE /api/paises/{id}
```

### 🏃 Ejecución

```bash
cd api-fastapi-paises
python main.py
```

### 💡 Características
- ✓ Sin dependencias externas (usa librerías estándar)
- ✓ Servidor HTTP nativo de Python
- ✓ CORS habilitado para todas las rutas
- ✓ Validación de JSON
- ✓ Control de duplicados (nombre UNIQUE)

---

## 🏛️ API 3: NestJS - Gestión de Usuarios (Puerto 3001)

### 📁 Ubicación
`api-nestjs-usuarios/src/`

### 📦 Tecnologías
- **Framework**: NestJS
- **Lenguaje**: TypeScript
- **ORM**: TypeORM
- **Base de datos**: SQLite (usuarios.db)
- **Patrón**: Inyección de dependencias

### 🔌 Endpoints

```bash
# Obtener todos los usuarios
GET /api/usuarios

# Obtener usuario por ID
GET /api/usuarios/:id

# Crear nuevo usuario
POST /api/usuarios
# Body: { "nombre": "string", "rut": "string" }

# Actualizar usuario
PUT /api/usuarios/:id
# Body: { "nombre": "string", "rut": "string" }

# Eliminar usuario
DELETE /api/usuarios/:id
```

### 🏃 Ejecución

```bash
cd api-nestjs-usuarios
npm install
npm run start      # Producción
npm run start:dev  # Desarrollo con watch mode
```

### 📂 Estructura

```
src/
├── main.ts                    # Punto de entrada
├── app.module.ts              # Módulo raíz (configuración)
├── usuarios.module.ts         # Módulo de usuarios
├── controllers/
│   └── usuarios.controller.ts # Rutas HTTP
├── services/
│   └── usuarios.service.ts    # Lógica de negocio
└── entities/
    └── usuario.entity.ts      # Modelo de datos
```

### 💡 Características
- ✓ Arquitectura modular con inyección de dependencias
- ✓ TypeORM automáticamente sincroniza el schema
- ✓ Validación integrada
- ✓ CORS habilitado
- ✓ RUT único por usuario

---

## 🎨 Frontend - Aplicación Web (app-frontend)

### 📁 Ubicación
`app-frontend/`

### 📦 Tecnologías
- **Lenguaje**: JavaScript Vanilla
- **Estilo**: CSS/HTML puro
- **Comunicación**: Fetch API

### 🏃 Ejecución

Abrir `index.html` en el navegador o usar un servidor local:

```bash
cd app-frontend
# Opción 1: Abrir directamente
open index.html

# Opción 2: Usar servidor local (Node.js)
npm install -g http-server
http-server .
```

### 🌐 Integración

El frontend se conecta automáticamente a las 3 APIs:
- **Ciudades**: `http://localhost:3002/api/ciudades`
- **Países**: `http://localhost:3003/api/paises`
- **Usuarios**: `http://localhost:3001/api/usuarios`

### 📂 Estructura

```
app-frontend/
├── index.html              # UI principal
├── src/
│   ├── main.js            # Lógica principal
│   └── services/
│       ├── ciudadesService.js    # Comunicación con API Ciudades
│       ├── paisesService.js      # Comunicación con API Países
│       └── usuariosService.js    # Comunicación con API Usuarios
```

---

## 🔧 Instrucciones Rápidas

### Iniciar Todas las APIs

**Terminal 1 - Express (Ciudades)**
```bash
cd api-express-ciudades
npm install && npm run dev
```

**Terminal 2 - Python (Países)**
```bash
cd api-fastapi-paises
python main.py
```

**Terminal 3 - NestJS (Usuarios)**
```bash
cd api-nestjs-usuarios
npm install && npm run start:dev
```

**Terminal 4 - Frontend (opcional)**
```bash
cd app-frontend
# Abrir index.html en navegador
```

### Verificar que todo funciona

```bash
# Probar Express
curl http://localhost:3002/api/ciudades

# Probar Python
curl http://localhost:3003/api/paises

# Probar NestJS
curl http://localhost:3001/api/usuarios
```

---

## 📊 Modelos de Datos

### Ciudades (Express)
```sql
CREATE TABLE ciudades (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nombre TEXT NOT NULL UNIQUE,
  poblacion INTEGER NOT NULL
)
```

### Países (Python)
```sql
CREATE TABLE paises (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nombre TEXT NOT NULL UNIQUE,
  dirigente TEXT NOT NULL
)
```

### Usuarios (NestJS)
```sql
CREATE TABLE usuarios (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nombre VARCHAR(100) NOT NULL,
  rut VARCHAR(12) NOT NULL UNIQUE
)
```

---

## 🔒 Consideraciones de Seguridad

⚠️ **Modo Desarrollo**: El código actual está optimizado para desarrollo local.

Para producción:
- [ ] Habilitar autenticación (JWT o similar)
- [ ] Implementar validación más robusta
- [ ] Usar variables de entorno para configuración
- [ ] Agregar rate limiting
- [ ] Implementar HTTPS
- [ ] Sanitizar entrada de usuarios
- [ ] Implementar logging y monitoreo

---

## 📝 Notas Adicionales

### Por qué 3 frameworks diferentes?

Este taller demuestra diferentes formas de construir APIs REST:
1. **Express**: Ligero y flexible (minimalista)
2. **Python HTTP**: Máxima simplicidad, sin dependencias
3. **NestJS**: Enterprise-grade, patrón completo (MVC)

### Bases de datos

Todas usan SQLite por simplicidad. En producción:
- PostgreSQL para datos complejos
- MongoDB para datos no estructurados
- Redis para caché

---

**Última actualización**: Noviembre 2025
**Estado**: ✓ Todas las APIs funcionales y documentadas
