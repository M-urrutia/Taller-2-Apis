import { executeSql, executeInsert} from '../db/database.js';

export async function getPaises() {
    return await executeSql('SELECT * FROM paises ORDER BY nombre');   
}

export async function getPais(id) {
    const results = await executeSql('SELECT * FROM paises WHERE id = ?', [id]);
    return results[0] || null;
}

export async function createPais(nombre, dirigente) {
    const id = await executeInsert('INSERT INTO paises (nombre, dirigente) VALUES (?, ?)', [nombre, dirigente]);
    return { id, nombre, dirigente };
}

export async function updatePais(id, nombre, dirigente) {
    await executeSql('UPDATE paises SET nombre = ?, dirigente = ? WHERE id = ?', [nombre, dirigente, id]);
    return { id, nombre, dirigente };
}

export async function deletePais(id) {
    await executeSql('DELETE FROM paises WHERE id = ?', [id]);
    return { mensaje: 'País eliminado '};
}