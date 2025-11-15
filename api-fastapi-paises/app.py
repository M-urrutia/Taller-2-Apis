import sqlite3
from flask import Flask, jsonify, request
from typing import Optional, List, Dict
import json

app = Flask(__name__)
DATABASE = 'db_paises.db'

# Inicializar base de datos
def init_db():
    conn = sqlite3.connect(DATABASE)
    c = conn.cursor()
    c.execute('''
        CREATE TABLE IF NOT EXISTS paises (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nombre TEXT NOT NULL,
            dirigente TEXT NOT NULL
        )
    ''')
    conn.commit()
    conn.close()
    print('✓ Conexión a SQLite establecida')

# Obtener conexión
def get_db():
    conn = sqlite3.connect(DATABASE)
    conn.row_factory = sqlite3.Row
    return conn

# GET - Obtener todos los países
@app.route('/api/paises', methods=['GET'])
def obtener_paises():
    try:
        conn = get_db()
        c = conn.cursor()
        c.execute('SELECT * FROM paises')
        paises = [dict(row) for row in c.fetchall()]
        conn.close()
        return jsonify(paises), 200
    except Exception as e:
        return jsonify({'error': 'Error al obtener países'}), 500

# GET - Obtener país por ID
@app.route('/api/paises/<int:id>', methods=['GET'])
def obtener_pais(id):
    try:
        conn = get_db()
        c = conn.cursor()
        c.execute('SELECT * FROM paises WHERE id = ?', (id,))
        pais = c.fetchone()
        conn.close()
        if pais:
            return jsonify(dict(pais)), 200
        return jsonify(None), 404
    except Exception as e:
        return jsonify({'error': 'Error al obtener país'}), 500

# POST - Crear nuevo país
@app.route('/api/paises', methods=['POST'])
def crear_pais():
    try:
        data = request.get_json()
        nombre = data.get('nombre')
        dirigente = data.get('dirigente')
        
        conn = get_db()
        c = conn.cursor()
        c.execute('INSERT INTO paises (nombre, dirigente) VALUES (?, ?)', 
                  (nombre, dirigente))
        conn.commit()
        pais_id = c.lastrowid
        conn.close()
        
        return jsonify({'id': pais_id, 'nombre': nombre, 'dirigente': dirigente}), 201
    except Exception as e:
        return jsonify({'error': 'Error al crear país'}), 500

# PUT - Actualizar país
@app.route('/api/paises/<int:id>', methods=['PUT'])
def actualizar_pais(id):
    try:
        data = request.get_json()
        nombre = data.get('nombre')
        dirigente = data.get('dirigente')
        
        conn = get_db()
        c = conn.cursor()
        c.execute('UPDATE paises SET nombre = ?, dirigente = ? WHERE id = ?',
                  (nombre, dirigente, id))
        conn.commit()
        conn.close()
        
        return jsonify({'id': id, 'nombre': nombre, 'dirigente': dirigente}), 200
    except Exception as e:
        return jsonify({'error': 'Error al actualizar país'}), 500

# DELETE - Eliminar país
@app.route('/api/paises/<int:id>', methods=['DELETE'])
def eliminar_pais(id):
    try:
        conn = get_db()
        c = conn.cursor()
        c.execute('DELETE FROM paises WHERE id = ?', (id,))
        conn.commit()
        conn.close()
        
        return jsonify({'mensaje': 'País eliminado'}), 200
    except Exception as e:
        return jsonify({'error': 'Error al eliminar país'}), 500

if __name__ == '__main__':
    init_db()
    app.run(host='0.0.0.0', port=3003, debug=True)
    print('✓ API FastAPI corriendo en http://localhost:3003')
