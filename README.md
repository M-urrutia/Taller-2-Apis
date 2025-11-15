# Taller 2 - Tres APIs Independientes

3 APIs REST independientes con tecnologías diferentes:
- **API 1**: Usuarios (Express + TypeScript + SQLite) - Puerto 3001
- **API 2**: Ciudades (Express + TypeScript + SQLite) - Puerto 3002  
- **API 3**: Países (FastAPI + Python + SQLite) - Puerto 3003

## Instalación Rápida

### Requisitos
- Node.js v18+
- Python 3.9+

✅ **Sin bases de datos externas** - Todo local con SQLite

### Pasos

1. **Instalar y ejecutar API 1 (Usuarios)**
```bash
cd api-nestjs-usuarios
npm install
npm run dev
# http://localhost:3001
```

2. **Instalar y ejecutar API 2 (Ciudades)** - En otra terminal
```bash
cd api-express-ciudades
npm install
npm run dev
# http://localhost:3002
```

3. **Instalar y ejecutar API 3 (Países)** - En otra terminal
```bash
cd api-fastapi-paises
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --host 0.0.0.0 --port 3003 --reload
# http://localhost:3003
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

## Verificar que funciona

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

**"Cannot connect to PostgreSQL"**
- Verificar que PostgreSQL está corriendo y BD `db_usuarios` existe

**"Cannot connect to MySQL"**
- Verificar que MySQL está corriendo y BD `db_ciudades` existe

**"Module not found"**
```bash
npm install
pip install -r requirements.txt
```

## Docker (Opcional)

```bash
docker-compose up -d  # Inicia PostgreSQL y MySQL
```

## Postman

Importar `Postman_Collection.json` para probar todos los endpoints.

---

Ver detalles en cada carpeta de API con su `README.md`.
