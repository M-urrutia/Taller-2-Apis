/**
 * API NestJS - Gestión de Usuarios
 * Puerto: 3001 (por defecto)
 * Base de datos: SQLite (usuarios.db)
 * 
 * Endpoints:
 * GET    /api/usuarios      - Obtener todos los usuarios
 * GET    /api/usuarios/:id  - Obtener usuario por ID
 * POST   /api/usuarios      - Crear nuevo usuario
 * PUT    /api/usuarios/:id  - Actualizar usuario
 * DELETE /api/usuarios/:id  - Eliminar usuario
 */

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Habilitar CORS para comunicación con el frontend
  app.enableCors();
  
  const PORT = process.env.PORT || 3001;
  await app.listen(PORT as number);
  
  console.log(`✓ API Usuarios (NestJS) corriendo en http://localhost:${PORT}`);
  console.log('✓ Documentación OpenAPI: http://localhost:3001/api');
}

bootstrap();
