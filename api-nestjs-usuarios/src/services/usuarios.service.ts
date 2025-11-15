import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Usuario } from '../entities/usuario.entity';

@Injectable()
export class UsuariosService {
  private usuariosRepository;

  constructor(private dataSource: DataSource) {
    this.usuariosRepository = this.dataSource.getRepository(Usuario);
  }

  async crear(nombre: string, rut: string): Promise<Usuario> {
    const usuario = this.usuariosRepository.create({ nombre, rut });
    return this.usuariosRepository.save(usuario);
  }

  async obtenerTodos(): Promise<Usuario[]> {
    return this.usuariosRepository.find();
  }

  async obtenerPorId(id: number): Promise<Usuario | null> {
    return this.usuariosRepository.findOne({ where: { id } });
  }

  async actualizar(id: number, nombre: string, rut: string): Promise<Usuario> {
    await this.usuariosRepository.update(id, { nombre, rut });
    return this.obtenerPorId(id);
  }

  async eliminar(id: number): Promise<void> {
    await this.usuariosRepository.delete(id);
  }
}
