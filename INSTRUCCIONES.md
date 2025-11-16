# 🚀 Instrucciones para ejecutar el programa completo

Este documento describe cómo ejecutar las **3 APIs** y el **Frontend** de la aplicación.

---

## 📋 Requisitos previos

- **Node.js** (v16+) — ya deberías tenerlo instalado
- **Python** (v3.8+) — para ejecutar FastAPI
- **npm** — gestor de paquetes de Node.js

Verifica que todo esté instalado:

```powershell
node --version
npm --version
python --version
```

---

## 🏗️ Estructura del proyecto

```
Taller-2-Apis/
├── api-express-ciudades/       # API REST para ciudades (Express + SQLite)
├── api-fastapi-paises/         # API REST para países (FastAPI + SQLite)
├── api-nestjs-usuarios/        # API REST para usuarios (NestJS + TypeORM + SQLite)
└── app-frontend/               # Frontend SPA (JavaScript puro + Tailwind)
```

---

## 🎬 FORMA 1: Ejecutar cada API en una terminal diferente (recomendado para desarrollo)

Abre **4 terminales PowerShell** diferentes y copia-pega los comandos en cada una.

### Terminal 1️⃣ — API Ciudades (Express)

```powershell
cd "c:\Users\benja\OneDrive\Escritorio\UCN lock in\Diseño Web y Movil\Taller-2-Apis\api-express-ciudades"
npm run dev
```

**Esperado:**
```
✓ API Ciudades corriendo en http://localhost:3002
```

**Endpoints disponibles:**
- `GET http://localhost:3002/api/ciudades` — obtener todas
- `POST http://localhost:3002/api/ciudades` — crear nueva
- `GET http://localhost:3002/api/ciudades/:id` — obtener por ID
- `PUT http://localhost:3002/api/ciudades/:id` — actualizar
- `DELETE http://localhost:3002/api/ciudades/:id` — eliminar

---

### Terminal 2️⃣ — API Países (FastAPI)

```powershell
cd "c:\Users\benja\OneDrive\Escritorio\UCN lock in\Diseño Web y Movil\Taller-2-Apis\api-fastapi-paises"
uvicorn main:app --reload --port 8000
```

**Esperado:**
```
Uvicorn running on http://127.0.0.1:8000
```

**Endpoints disponibles:**
- `GET http://localhost:8000/api/paises` — obtener todas
- `POST http://localhost:8000/api/paises` — crear nueva
- `GET http://localhost:8000/api/paises/{id}` — obtener por ID
- `PUT http://localhost:8000/api/paises/{id}` — actualizar
- `DELETE http://localhost:8000/api/paises/{id}` — eliminar

**Documentación interactiva:** http://localhost:8000/docs (Swagger)

---

### Terminal 3️⃣ — API Usuarios (NestJS)

```powershell
cd "c:\Users\benja\OneDrive\Escritorio\UCN lock in\Diseño Web y Movil\Taller-2-Apis\api-nestjs-usuarios"
npm run dev
```

**Esperado:**
```
✓ API Usuarios (Nest) corriendo en http://localhost:3001
```

**Endpoints disponibles:**
- `GET http://localhost:3001/` — estado de la API
- `GET http://localhost:3001/api/usuarios` — obtener todas
- `POST http://localhost:3001/api/usuarios` — crear nueva
- `GET http://localhost:3001/api/usuarios/:id` — obtener por ID
- `PUT http://localhost:3001/api/usuarios/:id` — actualizar
- `DELETE http://localhost:3001/api/usuarios/:id` — eliminar

---

### Terminal 4️⃣ — Frontend (JavaScript puro + Tailwind)

```powershell
cd "c:\Users\benja\OneDrive\Escritorio\UCN lock in\Diseño Web y Movil\Taller-2-Apis\app-frontend"
python -m http.server 5500
```

**Esperado:**
```
Serving HTTP on 0.0.0.0 port 5500...
```

**Acceso:**
Abre el navegador y ve a: **http://localhost:5500**

---

## ✅ Verificar que todo funciona

Desde tu navegador o una terminal PowerShell:

```powershell
# Raíz del frontend
Invoke-RestMethod http://localhost:5500/

# API Ciudades
Invoke-RestMethod http://localhost:3002/api/ciudades

# API Países
Invoke-RestMethod http://localhost:8000/api/paises

# API Usuarios
Invoke-RestMethod http://localhost:3001/api/usuarios
```

O con `curl` (si tienes curl instalado):

```powershell
curl http://localhost:5500/
curl http://localhost:3002/api/ciudades
curl http://localhost:8000/api/paises
curl http://localhost:3001/api/usuarios
```

---

## 🎬 FORMA 2: Script para ejecutar todo automáticamente (opcional)

Si quieres, puedo crear un script PowerShell que arranque los 4 procesos automáticamente. Por ahora, la **Forma 1** es la más directa.

---

## 📱 Información sobre el Frontend

El frontend es una **SPA (Single Page Application)** hecha en JavaScript puro:

- **Diseño**: Mobile-first con Tailwind CSS
- **Tecnología**: HTML5 + JavaScript ES6 modules + Tailwind CDN
- **Funcionalidad**: Consume las 3 APIs y muestra los datos en pestañas
- **Sin frameworks**: No usa React, Vue ni Angular — JavaScript puro

### Características del Frontend

- Botones de navegación: "Ciudades", "Países", "Usuarios"
- Cada pestaña lista los datos de la API correspondiente
- Los datos se cargan dinámicamente desde las APIs
- Interfaz responsive (se adapta a móviles)

### Cómo usa las APIs

El frontend hace peticiones fetch a:
- `http://localhost:3002/api/ciudades`
- `http://localhost:8000/api/paises`
- `http://localhost:3001/api/usuarios`

**Nota:** Si las APIs no responden o tienen CORS deshabilitado, el frontend mostrará errores. Las 3 APIs ya tienen CORS habilitado por defecto.

---

## 🔧 Configuración de puertos (si necesitas cambiar)

Si algún puerto ya está en uso, puedes cambiar:

### API Ciudades (Express)
Edita `api-express-ciudades/src/index.ts` línea final:
```typescript
const PORT = 3002;  // cambiar aquí
```

### API Países (FastAPI)
En la terminal, cambia el puerto:
```powershell
uvicorn main:app --reload --port 8001
```
(luego actualiza el frontend en `app-frontend/src/services/paisesService.js`)

### API Usuarios (NestJS)
Edita `api-nestjs-usuarios/src/main.ts`:
```typescript
const PORT = process.env.PORT || 3001;  // cambiar aquí
```

### Frontend
En la terminal:
```powershell
python -m http.server 5501  # cambiar puerto aquí
```

---

## 🐛 Solución de problemas

### Error: "Puerto ya está en uso"
- **Solución**: Cambia el puerto en la configuración de arriba o termina el proceso que ocupa el puerto:
  ```powershell
  netstat -ano | findstr :3002
  taskkill /PID <PID> /F
  ```

### Error: "Cannot GET /" en localhost:5500
- **Solución**: Asegúrate de estar en la carpeta `app-frontend` antes de ejecutar `python -m http.server 5500`

### Error: "Cannot find module" al ejecutar npm
- **Solución**: Ejecuta `npm install` en la carpeta del proyecto:
  ```powershell
  npm install
  ```

### Error: CORS en el navegador
- **Solución**: Las APIs ya tienen CORS habilitado. Si persiste, revisa que estés accediendo desde `http://localhost:5500` (no `http://127.0.0.1:5500`)

### Error: "Cannot POST" o "404" en la API
- **Solución**: Revisa que estés usando el método HTTP correcto (GET, POST, PUT, DELETE) y la ruta correcta

---

## 📝 Resumen rápido

| Componente | Tecnología | Puerto | Comando |
|---|---|---|---|
| API Ciudades | Express.js | 3002 | `npm run dev` |
| API Países | FastAPI | 8000 | `uvicorn main:app --reload --port 8000` |
| API Usuarios | NestJS | 3001 | `npm run dev` |
| Frontend | JavaScript puro | 5500 | `python -m http.server 5500` |

---

## 🎯 Próximos pasos (opcionales)

- **Agregar datos**: Usa el frontend o herramientas como Postman/Insomnia para crear registros
- **Integración Cordova**: Copia la carpeta `app-frontend` a `www/` en un proyecto Cordova
- **Base de datos persistente**: Los datos se guardan en `ciudades.db`, `db_paises.db` y `usuarios.db` (SQLite)

---

**¡Listo! Ahora puedes desarrollar y probar todas las APIs con el frontend. 🚀**
