/**
 * Módulo de Usuarios
 * Encapsula toda la lógica relacionada con usuarios:
 * - Controlador: maneja las rutas HTTP
 * - Servicio: lógica de negocio
 * - Entidad: modelo de datos
 */

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuariosController } from './controllers/usuarios.controller';
import { UsuariosService } from './services/usuarios.service';
import { Usuario } from './entities/usuario.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Usuario])],
  controllers: [UsuariosController],
  providers: [UsuariosService],
})
export class UsuariosModule {}
