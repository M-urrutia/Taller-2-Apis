import { executeSql, executeInsert } from "../db/database";

export async function getCiudades() {
    return await executeSql('SELECT * FROM ciudades ORDER BY nombre');
}

export async function getCiudad(id) {
    const results = await executeSql('SELECT * FROM ciudades WHERE id = ?', [id]);
}

export async function createCiudad(nombre, poblacion) {
    const id = await executeInsert('INSERT INTO ciudades (nombre, poblacion) VALUES (?, ?)', [nombre, poblacion]);
    return { id, nombre, poblacion };
}

export async function updateCiudad(id, nombre, poblacion) {
    await executeSql('UPDATE ciudades SET nombre = ?, poblacion = ? WHERE id = ?', [nombre, poblacion, id]);
    return { id, nombre, poblacion };
}

export async function deleteCiudad(id) {
    await executeSql('DELETE FROM ciudades WHERE id = ?', [id]);
    return { mensaje: 'Ciudad eliminada' };
}