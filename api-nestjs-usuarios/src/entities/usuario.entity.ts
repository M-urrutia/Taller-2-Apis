/**
 * Entidad Usuario
 * Mapea la tabla 'usuarios' en la base de datos SQLite
 * 
 * Campos:
 * - id: identificador único (auto-incremento)
 * - nombre: nombre del usuario (varchar 100)
 * - rut: identificador único chileno (varchar 12, UNIQUE)
 */

import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('usuarios')
export class Usuario {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 100 })
  nombre!: string;

  @Column({ type: 'varchar', length: 12, unique: true })
  rut!: string;
}
