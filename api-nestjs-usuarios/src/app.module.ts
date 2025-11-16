/**
 * Módulo raíz de la aplicación NestJS
 * Configura:
 * - TypeORM con SQLite
 * - Módulo de usuarios
 * - Controlador raíz
 */

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuariosModule } from './usuarios.module';
import { Usuario } from './entities/usuario.entity';
import { RootController } from './root.controller';

@Module({
  imports: [
    // Configurar TypeORM con SQLite
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'usuarios.db',
      entities: [Usuario],
      synchronize: true, // Sincronizar automáticamente el schema (solo desarrollo)
    }),
    UsuariosModule,
  ],
  controllers: [RootController],
})
export class AppModule {}
