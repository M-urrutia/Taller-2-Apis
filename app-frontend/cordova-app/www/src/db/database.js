let db = null;

export function initDatabase() {
    return new Promise((resolve, reject) => {
        if (!window.sqlitePlugin) {
            reject(new Error('Plugin de SQLite no está disponible.'));
            return;
        }

        db = window.sqlitePlugin.openDatabase({
            name: 'taller2.db',
            location: 'default'
        });

        db.transaction((tx) => {
            tx.executeSql(`CREATE TABLE IF NOT EXISTS usuarios (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                nombre TEXT NOT NULL,
                rut TEXT NOT NULL
            )`);

            tx.executeSql(`CREATE TABLE IF NOT EXISTS ciudades (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                nombre TEXT NOT NULL,
                poblacion INTEGER NOT NULL    
            )`);

            tx.executeSql(`CREATE TABLE IF NOT EXISTS paises (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                nombre TEXT NOT NULL,
                dirigente TEXT NOT NULL    
            )`);

            tx.executeSql('SELECT COUNT(*) as count FROM usuarios', [], (tx, res) => {
                if (res.rows.item(0).count === 0) {
                tx.executeSql('INSERT INTO usuarios (nombre, rut) VALUES (?, ?)', ['Juan Pérez', '12345678-9']);
                tx.executeSql('INSERT INTO usuarios (nombre, rut) VALUES (?, ?)', ['María García', '98765432-1']);
                tx.executeSql('INSERT INTO usuarios (nombre, rut) VALUES (?, ?)', ['Pedro López', '11222333-4']);
                }
            });

            tx.executeSql('SELECT COUNT(*) as count FROM ciudades', [], (tx, res) => {
                if (res.rows.item(0).count === 0) {
                tx.executeSql('INSERT INTO ciudades (nombre, poblacion) VALUES (?, ?)', ['Santiago', 5000000]);
                tx.executeSql('INSERT INTO ciudades (nombre, poblacion) VALUES (?, ?)', ['Valparaíso', 300000]);
                tx.executeSql('INSERT INTO ciudades (nombre, poblacion) VALUES (?, ?)', ['Concepción', 230000]);
                }
            });

            tx.executeSql('SELECT COUNT(*) as count FROM paises', [], (tx, res) => {
                if (res.rows.item(0).count === 0) {
                tx.executeSql('INSERT INTO paises (nombre, dirigente) VALUES (?, ?)', ['Chile', 'Gabriel Boric']);
                tx.executeSql('INSERT INTO paises (nombre, dirigente) VALUES (?, ?)', ['Argentina', 'Javier Milei']);
                tx.executeSql('INSERT INTO paises (nombre, dirigente) VALUES (?, ?)', ['Brasil', 'Lula da Silva']);
                }
            });
        }, (error) => {
            console.error('Error:', error);
            reject(error);
        }, () => {
            console.loge('Base de datos lista');
            resolve(db);
        });
    });
}

export function executeSql(sql, params = []) {
    return new Promise((resolve, reject) => {
        if (!db) {
            reject(new Error('Base de datos no inicializada'));
            return;
        }
        db.transaction((tx) => {
            tx.executeSql(sql, params, (tx, results) => {
                const rows = [];
                for (let i = 0; i < results.rows.length; i++) {
                    rows.push(results.rows.item(i));
                }
                resolve(rows);
            }, (tx,error) => {
                reject(error);
            });
        });
    });
}

export function executeInsert(sql, params = []) {
    return new Promise((resolve, reject) => {
        if (!db) {
            reject(new Error('Base de datos no inicializada'));
            return;
        }
        db.transaction((tx) => {
            tx.executeSql(sql, params, (tx, result) => {
                resolve(results.insertId);
            }, (tx, error) => {
                reject(error);
            });
        });
    });
}
