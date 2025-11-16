// @ts-nocheck
import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { UsuariosService } from '../src/services/usuarios.service';
import { Usuario } from '../src/entities/usuario.entity';

@Controller('api/usuarios')
export class UsuariosController {
  constructor(private usuariosService: UsuariosService) {}

  @Get()
  async obtenerTodos(): Promise<Usuario[]> {
    return this.usuariosService.obtenerTodos();
  }

  @Get(':id')
  async obtenerPorId(@Param('id') id: number): Promise<Usuario | null> {
    return this.usuariosService.obtenerPorId(id);
  }

  @Post()
  async crear(@Body() body: { nombre: string; rut: string }): Promise<Usuario> {
    return this.usuariosService.crear(body.nombre, body.rut);
  }

  @Put(':id')
  async actualizar(
    @Param('id') id: number,
    @Body() body: { nombre: string; rut: string },
  ): Promise<Usuario> {
    return this.usuariosService.actualizar(id, body.nombre, body.rut);
  }

  @Delete(':id')
  async eliminar(@Param('id') id: number): Promise<void> {
    return this.usuariosService.eliminar(id);
  }
}
