import { executeSql, executeInsert } from '../db/database.js';

export async function getUsuarios() {
    return await executeSql('SELECT * FROM usuarios ORDER BY nombre');
}

export async function getUsuario(id) {
    const results = await executeSql('SELECT * FROM usuarios WHERE id = ?', [id]);
    return results[0] || null;
}

export async function createUsuario(nombre, rut) {
    const id = await executeInsert('INSERT INTO usuarios (nombre,rut) VALUES (?, ?)', [nombre, rut]);
    return { id, nombre, rut };
}

export async function updateUsuario(id, nombre, rut) {
    await executeSql('UPDATE usuarios SET nombre = ?, rut = ? WHERE id = ?', [nombre, rut, id]);
    return { id, nombre, rut };
}

export async function deleteUsuario(id) {
    await executeSql('DELETE FROM usuarios WHERE id = ?', [id]);
    return { mensaje: 'Usuario eliminado' };
}
