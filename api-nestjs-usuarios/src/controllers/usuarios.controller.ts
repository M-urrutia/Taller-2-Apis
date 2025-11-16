/**
 * Controlador de Usuarios
 * Maneja todas las rutas HTTP relacionadas con usuarios
 * Ruta base: /api/usuarios
 */

import { Controller, Get, Post, Put, Delete, Param, Body, ParseIntPipe } from '@nestjs/common';
import { UsuariosService } from '../services/usuarios.service';
import { Usuario } from '../entities/usuario.entity';

@Controller('api/usuarios')
export class UsuariosController {
  constructor(private usuariosService: UsuariosService) {}

  /**
   * GET /api/usuarios
   * Obtiene todos los usuarios registrados
   */
  @Get()
  async obtenerTodos(): Promise<Usuario[]> {
    return this.usuariosService.obtenerTodos();
  }

  /**
   * GET /api/usuarios/:id
   * Obtiene un usuario específico por su ID
   */
  @Get(':id')
  async obtenerPorId(@Param('id', ParseIntPipe) id: number): Promise<Usuario | null> {
    return this.usuariosService.obtenerPorId(id);
  }

  /**
   * POST /api/usuarios
   * Crea un nuevo usuario
   * Body: { "nombre": "string", "rut": "string" }
   */
  @Post()
  async crear(@Body() body: { nombre: string; rut: string }): Promise<Usuario> {
    return this.usuariosService.crear(body.nombre, body.rut);
  }

  /**
   * PUT /api/usuarios/:id
   * Actualiza un usuario existente
   * Body: { "nombre": "string", "rut": "string" }
   */
  @Put(':id')
  async actualizar(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: { nombre: string; rut: string },
  ): Promise<Usuario | null> {
    return this.usuariosService.actualizar(id, body.nombre, body.rut);
  }

  /**
   * DELETE /api/usuarios/:id
   * Elimina un usuario
   */
  @Delete(':id')
  async eliminar(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.usuariosService.eliminar(id);
  }
}
