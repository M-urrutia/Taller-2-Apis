# API NestJS - Gestión de Usuarios

API RESTful de **nivel empresarial** desarrollada con **NestJS**, **TypeORM** y **TypeScript** para gestionar usuarios con validación robusta y patrón de inyección de dependencias.

## 📋 Requisitos

- **Node.js** 16+ 
- **npm** o **yarn**

## 🚀 Instalación y Ejecución

```bash
# Instalar dependencias
npm install

# Modo desarrollo (con hot reload)
npm run start:dev

# Modo producción
npm run build
npm run start
```

La API estará disponible en `http://localhost:3001`

## 🔌 Endpoints

### GET `/api/usuarios`
Obtiene todos los usuarios registrados.

**Respuesta (200 OK):**
```json
[
  {
    "id": 1,
    "nombre": "Juan Pérez",
    "rut": "12345678-9"
  },
  {
    "id": 2,
    "nombre": "María García",
    "rut": "98765432-1"
  }
]
```

---

### GET `/api/usuarios/:id`
Obtiene un usuario específico por su ID.

**Parámetros:**
- `id` (integer): ID del usuario

**Respuesta (200 OK):**
```json
{
  "id": 1,
  "nombre": "Juan Pérez",
  "rut": "12345678-9"
}
```

**Respuesta (404 Not Found):**
```json
null
```

---

### POST `/api/usuarios`
Crea un nuevo usuario.

**Body (JSON):**
```json
{
  "nombre": "Carlos López",
  "rut": "11111111-1"
}
```

**Respuesta (201 Created):**
```json
{
  "id": 3,
  "nombre": "Carlos López",
  "rut": "11111111-1"
}
```

**Validación:**
- `nombre` es requerido (string, máx 100 caracteres)
- `rut` es requerido (string, máx 12 caracteres, único)

---

### PUT `/api/usuarios/:id`
Actualiza un usuario existente.

**Parámetros:**
- `id` (integer): ID del usuario a actualizar

**Body (JSON):**
```json
{
  "nombre": "Juan Pérez Actualizado",
  "rut": "12345678-9"
}
```

**Respuesta (200 OK):**
```json
{
  "id": 1,
  "nombre": "Juan Pérez Actualizado",
  "rut": "12345678-9"
}
```

---

### DELETE `/api/usuarios/:id`
Elimina un usuario.

**Parámetros:**
- `id` (integer): ID del usuario a eliminar

**Respuesta (200 OK):**
```json
(vacío/null)
```

---

## 💾 Base de Datos

TypeORM sincroniza automáticamente el schema con la base de datos SQLite.

**Tabla `usuarios`:**
```sql
CREATE TABLE usuarios (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nombre VARCHAR(100) NOT NULL,
  rut VARCHAR(12) NOT NULL UNIQUE
)
```

El archivo de base de datos se crea en: `usuarios.db`

---

## 📂 Estructura del Proyecto

```
src/
├── main.ts                         -- Punto de entrada (bootstrap)
├── app.module.ts                   -- Módulo raíz
├── root.controller.ts              -- Controlador raíz
├── usuarios.module.ts              -- Módulo de usuarios
├── controllers/
│   └── usuarios.controller.ts      -- Rutas HTTP de usuarios
├── services/
│   └── usuarios.service.ts         -- Lógica de negocio
└── entities/
    └── usuario.entity.ts           -- Modelo de datos (ORM)

archived_nest/                      -- Archivos anteriores (ignorar)
```

---

## 🏗️ Arquitectura NestJS

### Patrón: Controlador → Servicio → Repositorio

```
Request HTTP
    ↓
UsuariosController (maneja HTTP)
    ↓
UsuariosService (lógica de negocio)
    ↓
TypeORM Repository (acceso a datos)
    ↓
SQLite Database
```

### Componentes Principales

#### 1. **Entidad** (`usuario.entity.ts`)
Define la estructura de datos:
```typescript
@Entity('usuarios')
export class Usuario {
  @PrimaryGeneratedColumn()
  id!: number;
  
  @Column({ type: 'varchar', length: 100 })
  nombre!: string;
  
  @Column({ type: 'varchar', length: 12, unique: true })
  rut!: string;
}
```

#### 2. **Servicio** (`usuarios.service.ts`)
Contiene la lógica de negocio:
```typescript
@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario)
    private usuariosRepository: Repository<Usuario>,
  ) {}
  
  async crear(nombre: string, rut: string): Promise<Usuario> { ... }
  async obtenerTodos(): Promise<Usuario[]> { ... }
  async obtenerPorId(id: number): Promise<Usuario | null> { ... }
  async actualizar(id: number, ...): Promise<Usuario | null> { ... }
  async eliminar(id: number): Promise<void> { ... }
}
```

#### 3. **Controlador** (`usuarios.controller.ts`)
Mapea las rutas HTTP:
```typescript
@Controller('api/usuarios')
export class UsuariosController {
  constructor(private usuariosService: UsuariosService) {}
  
  @Get()
  async obtenerTodos(): Promise<Usuario[]> { ... }
  
  @Post()
  async crear(@Body() body: { nombre: string; rut: string }): Promise<Usuario> { ... }
  // ... más métodos
}
```

#### 4. **Módulo** (`usuarios.module.ts`)
Encapsula todos los componentes:
```typescript
@Module({
  imports: [TypeOrmModule.forFeature([Usuario])],
  controllers: [UsuariosController],
  providers: [UsuariosService],
})
export class UsuariosModule {}
```

---

## 🧪 Ejemplos de Uso

### Con cURL

```bash
# Obtener todos los usuarios
curl http://localhost:3001/api/usuarios

# Obtener usuario por ID
curl http://localhost:3001/api/usuarios/1

# Crear nuevo usuario
curl -X POST http://localhost:3001/api/usuarios \
  -H "Content-Type: application/json" \
  -d '{"nombre":"Andrés Silva","rut":"22222222-2"}'

# Actualizar usuario
curl -X PUT http://localhost:3001/api/usuarios/1 \
  -H "Content-Type: application/json" \
  -d '{"nombre":"Juan Pérez Updated","rut":"12345678-9"}'

# Eliminar usuario
curl -X DELETE http://localhost:3001/api/usuarios/1
```

### Con JavaScript/Fetch

```javascript
const BASE_URL = 'http://localhost:3001/api';

// Obtener todos
const usuarios = await fetch(`${BASE_URL}/usuarios`)
  .then(r => r.json());

// Crear
const nuevo = await fetch(`${BASE_URL}/usuarios`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ 
    nombre: 'Beatriz Ruiz', 
    rut: '33333333-3' 
  })
}).then(r => r.json());

// Actualizar
const actualizado = await fetch(`${BASE_URL}/usuarios/1`, {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ 
    nombre: 'Juan Pérez', 
    rut: '12345678-9' 
  })
}).then(r => r.json());

// Eliminar
await fetch(`${BASE_URL}/usuarios/1`, { method: 'DELETE' });
```

### Con Node.js/Axios

```typescript
import axios from 'axios';

const BASE_URL = 'http://localhost:3001/api';

// Obtener todos
const { data: usuarios } = await axios.get(`${BASE_URL}/usuarios`);

// Crear
const { data: nuevo } = await axios.post(`${BASE_URL}/usuarios`, {
  nombre: 'Diego Morales',
  rut: '44444444-4'
});

// Actualizar
const { data: actualizado } = await axios.put(
  `${BASE_URL}/usuarios/1`,
  { nombre: 'Juan Pérez', rut: '12345678-9' }
);

// Eliminar
await axios.delete(`${BASE_URL}/usuarios/1`);
```

---

## 🎯 Ventajas de NestJS

✅ **Arquitectura Sólida** - Patrón MVC/inyección de dependencias
✅ **TypeScript Nativo** - Tipado completo y verificación estática
✅ **Escalable** - Perfecto para proyectos grandes
✅ **Documentación Excelente** - Comunidad muy activa
✅ **TypeORM Integrado** - ORM potente y flexible
✅ **Testing Incluido** - Jest preconfigurado
✅ **CLI Poderosa** - Generación automática de código
✅ **Middleware y Decoradores** - Manejo avanzado de requests

---

## 🔧 Configuración

### Puerto
Por defecto: **3001**

Para cambiar el puerto, edita `src/main.ts`:
```typescript
const PORT = process.env.PORT || 3001;  // Cambiar aquí
```

### Base de Datos
Por defecto: `usuarios.db` en el directorio raíz

Configuración en `src/app.module.ts`:
```typescript
TypeOrmModule.forRoot({
  type: 'sqlite',
  database: 'usuarios.db',  // Cambiar ruta aquí
  entities: [Usuario],
  synchronize: true,  // Sincronizar schema automáticamente
})
```

### Modo Desarrollo
Auto-reinicia al cambiar archivos:
```bash
npm run start:dev
```

---

## 🐛 Solución de Problemas

### Error: "EADDRINUSE: address already in use"
El puerto 3001 ya está en uso.

```bash
# Cambiar puerto en src/main.ts o
# Matar proceso en el puerto:
lsof -ti:3001 | xargs kill -9          # macOS/Linux
netstat -ano | findstr :3001           # Windows
```

### Error: "TypeError: Cannot read property 'id' of undefined"
La base de datos está vacía. Crea un usuario primero:
```bash
curl -X POST http://localhost:3001/api/usuarios \
  -H "Content-Type: application/json" \
  -d '{"nombre":"Usuario Prueba","rut":"12345678-9"}'
```

### Error de compilación TypeScript
Asegúrate de que `tsconfig.json` esté correctamente configurado:
```bash
npm run build
```

---

## 📊 Stack Tecnológico

- **NestJS**: Framework empresarial
- **TypeScript**: Lenguaje tipado
- **TypeORM**: ORM para Node.js
- **SQLite3**: Base de datos
- **Jest**: Testing
- **Swagger**: Documentación API

---

## 📝 Scripts Disponibles

```json
{
  "start": "nest start",                    // Producción
  "start:dev": "nest start --watch",        // Desarrollo
  "start:debug": "nest start --debug",      // Debug
  "build": "nest build",                    // Compilar
  "test": "jest",                           // Tests
  "test:watch": "jest --watch",             // Tests con watch
  "test:cov": "jest --coverage"             // Cobertura
}
```

---

## 🚀 Mejoras Futuras

- [ ] Agregar Swagger/OpenAPI documentation
- [ ] Implementar validación con `class-validator`
- [ ] Agregar autenticación JWT
- [ ] Implementar paginación
- [ ] Agregar filtros y búsqueda
- [ ] Implementar soft delete
- [ ] Agregar logging centralizado
- [ ] Configurar HTTPS/TLS

---

**Última actualización**: Noviembre 2025
**Desarrollado para**: Taller 2 - Arquitectura de Microservicios
**Nivel**: Intermedio/Avanzado
