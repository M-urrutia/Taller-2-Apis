# Taller 2 - Tres APIs Independientes

## Grupo 13 - Integrantes

- **Andrés Hidalgo Ramallo RUT: 21.795.550-5**
- **Benjamín Torres Inostroza RUT: 21.695.589-7**
- **Benjamín Rojas Espejo RUT: 21.742.522-0**
- **Maximiliano Urrutia Araya RUT: 21.573.565-6**

3 APIs REST independientes con tecnologías diferentes:
- **API 1**: Usuarios (NestJS + TypeScript + SQLite) - Puerto 3001
- **API 2**: Ciudades (Express + TypeScript + SQLite) - Puerto 3002  
- **API 3**: Países (Python HTTP nativo + SQLite) - Puerto 3003

## Instalación Rápida

### Requisitos
- Node.js v16+
- Python 3.9+

✅ **Sin bases de datos externas** - Todo local con SQLite
✅ **API 3 sin dependencias externas** - Solo librerías estándar de Python

### Pasos

1. **Instalar y ejecutar API 1 (Usuarios - NestJS)**
```bash
cd api-nestjs-usuarios
npm install
npm run start:dev
# http://localhost:3001
```

2. **Instalar y ejecutar API 2 (Ciudades - Express)** - En otra terminal
```bash
cd api-express-ciudades
npm install
npm run dev
# http://localhost:3002
```

3. **Ejecutar API 3 (Países - Python)** - En otra terminal
```bash
cd api-fastapi-paises
python main.py
# http://localhost:3003
# ✓ Sin instalación de dependencias requerida
```



## Endpoints

### API 1: Usuarios (http://localhost:3001)
```
GET    /api/usuarios           - Obtener todos
GET    /api/usuarios/:id       - Obtener por ID
POST   /api/usuarios           - Crear
PUT    /api/usuarios/:id       - Actualizar
DELETE /api/usuarios/:id       - Eliminar
```

**Ejemplo POST:**
```bash
curl -X POST http://localhost:3001/api/usuarios \
  -H "Content-Type: application/json" \
  -d '{"nombre":"Juan Pérez","rut":"12345678-9"}'
```

### API 2: Ciudades (http://localhost:3002)
```
GET    /api/ciudades           - Obtener todas
GET    /api/ciudades/:id       - Obtener por ID
POST   /api/ciudades           - Crear
PUT    /api/ciudades/:id       - Actualizar
DELETE /api/ciudades/:id       - Eliminar
```

**Ejemplo POST:**
```bash
curl -X POST http://localhost:3002/api/ciudades \
  -H "Content-Type: application/json" \
  -d '{"nombre":"Santiago","poblacion":5000000}'
```

### API 3: Países (http://localhost:3003)
```
GET    /api/paises             - Obtener todos
GET    /api/paises/{id}        - Obtener por ID
POST   /api/paises             - Crear
PUT    /api/paises/{id}        - Actualizar
DELETE /api/paises/{id}        - Eliminar
```

**Ejemplo POST:**
```bash
curl -X POST http://localhost:3003/api/paises \
  -H "Content-Type: application/json" \
  -d '{"nombre":"Chile","dirigente":"Gabriel Boric"}'
```

**Documentación interactiva FastAPI:**
- Swagger: http://localhost:3003/docs
- ReDoc: http://localhost:3003/redoc

```bash
curl http://localhost:3001/api/usuarios
curl http://localhost:3002/api/ciudades
curl http://localhost:3003/api/paises
```

## Problemas Comunes

**"Port already in use"**
```powershell
netstat -ano | findstr :3001
taskkill /PID <PID> /F
```

**"Module not found"**
```bash
npm install
# (No es necesario pip install para la API de Países)
```

## Docker (Opcional)

```bash
docker-compose up -d  # Inicia contenedores si están configurados
```

## Documentación Detallada

Para documentación completa y específica de cada API, ver:
- `api-express-ciudades/README.md` - Guía Express
- `api-fastapi-paises/README.md` - Guía Python HTTP
- `api-nestjs-usuarios/README.md` - Guía NestJS
- `API_DOCUMENTATION.md` - Comparativa técnica de todas las APIs
