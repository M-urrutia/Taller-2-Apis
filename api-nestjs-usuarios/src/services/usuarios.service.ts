/**
 * Servicio de Usuarios
 * Contiene la lógica de negocio para operaciones CRUD
 * Inyecta el repositorio de TypeORM para acceder a la BD
 */

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from '../entities/usuario.entity';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario)
    private usuariosRepository: Repository<Usuario>,
  ) {}

  /**
   * Crear nuevo usuario
   */
  async crear(nombre: string, rut: string): Promise<Usuario> {
    const usuario = this.usuariosRepository.create({ nombre, rut });
    return this.usuariosRepository.save(usuario);
  }

  /**
   * Obtener todos los usuarios ordenados por ID
   */
  async obtenerTodos(): Promise<Usuario[]> {
    return this.usuariosRepository.find({
      order: { id: 'ASC' }
    });
  }

  /**
   * Obtener usuario por ID
   */
  async obtenerPorId(id: number): Promise<Usuario | null> {
    const found = await this.usuariosRepository.findOne({ where: { id } });
    return found ?? null;
  }

  /**
   * Actualizar usuario existente
   */
  async actualizar(id: number, nombre: string, rut: string): Promise<Usuario | null> {
    await this.usuariosRepository.update(id, { nombre, rut });
    return this.obtenerPorId(id);
  }

  /**
   * Eliminar usuario por ID
   */
  async eliminar(id: number): Promise<void> {
    await this.usuariosRepository.delete(id);
  }
}
