"""
API FastAPI - Gestión de Países
Puerto: 3003
Base de datos: SQLite (db_paises.db)

Endpoints:
  GET    /api/paises        - Obtener todos los países
  GET    /api/paises/{id}   - Obtener país por ID
  POST   /api/paises        - Crear nuevo país
  PUT    /api/paises/{id}   - Actualizar país
  DELETE /api/paises/{id}   - Eliminar país

Ejecutar: python main.py
"""
import sqlite3
import json
from typing import Dict, Any
from http.server import HTTPServer, BaseHTTPRequestHandler

DATABASE = 'db_paises.db'

# ============================================================================
# UTILIDADES DE BASE DE DATOS
# ============================================================================

def init_db():
    """Inicializar tabla de paises"""
    try:
        conn = sqlite3.connect(DATABASE)
        c = conn.cursor()
        c.execute('''
            CREATE TABLE IF NOT EXISTS paises (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                nombre TEXT NOT NULL UNIQUE,
                dirigente TEXT NOT NULL
            )
        ''')
        conn.commit()
        conn.close()
        print('✓ Base de datos SQLite inicializada')
    except Exception as e:
        print(f'✗ Error inicializando BD: {e}')

def get_db():
    """Obtener conexión a la base de datos"""
    conn = sqlite3.connect(DATABASE)
    conn.row_factory = sqlite3.Row
    return conn

def parse_json_body(body: bytes) -> Dict[str, Any]:
    """Parsear JSON del body de la solicitud"""
    try:
        return json.loads(body.decode('utf-8'))
    except:
        return {}

# ============================================================================
# HANDLER HTTP
# ============================================================================

class PaisesHandler(BaseHTTPRequestHandler):
    """Manejador de solicitudes HTTP para la API de países"""

    def do_GET(self):
        """Manejar solicitudes GET"""
        # Endpoint raíz
        if self.path == '/' or self.path == '':
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            response = {'mensaje': 'API de Países', 'version': '1.0.0'}
            self.wfile.write(json.dumps(response).encode('utf-8'))
            return

        # GET /api/paises - obtener todos
        if self.path == '/api/paises':
            try:
                conn = get_db()
                c = conn.cursor()
                c.execute('SELECT id, nombre, dirigente FROM paises ORDER BY id')
                paises = [{'id': row[0], 'nombre': row[1], 'dirigente': row[2]} 
                         for row in c.fetchall()]
                conn.close()
                self.send_response(200)
                self.send_header('Content-type', 'application/json')
                self.end_headers()
                self.wfile.write(json.dumps(paises).encode('utf-8'))
            except Exception as e:
                self.send_error(500)
            return

        # GET /api/paises/{id} - obtener por ID
        if self.path.startswith('/api/paises/') and self.path.count('/') == 3:
            try:
                pais_id = int(self.path.split('/')[-1])
                conn = get_db()
                c = conn.cursor()
                c.execute('SELECT id, nombre, dirigente FROM paises WHERE id = ?', (pais_id,))
                row = c.fetchone()
                conn.close()
                if row:
                    pais = {'id': row[0], 'nombre': row[1], 'dirigente': row[2]}
                    self.send_response(200)
                    self.send_header('Content-type', 'application/json')
                    self.end_headers()
                    self.wfile.write(json.dumps(pais).encode('utf-8'))
                else:
                    self.send_response(404)
                    self.send_header('Content-type', 'application/json')
                    self.end_headers()
                    self.wfile.write(json.dumps({'error': 'País no encontrado'}).encode('utf-8'))
            except Exception as e:
                self.send_error(500)
            return

        self.send_error(404)

    def do_POST(self):
        """Manejar solicitudes POST"""
        if self.path == '/api/paises':
            try:
                content_length = int(self.headers.get('Content-Length', 0))
                body = self.rfile.read(content_length)
                data = parse_json_body(body)

                nombre = data.get('nombre')
                dirigente = data.get('dirigente')

                # Validar datos
                if not nombre or not dirigente:
                    self.send_response(400)
                    self.send_header('Content-type', 'application/json')
                    self.end_headers()
                    self.wfile.write(json.dumps({'error': 'nombre y dirigente son requeridos'}).encode('utf-8'))
                    return

                conn = get_db()
                c = conn.cursor()
                c.execute('INSERT INTO paises (nombre, dirigente) VALUES (?, ?)', 
                         (nombre, dirigente))
                conn.commit()
                pais_id = c.lastrowid
                conn.close()

                self.send_response(201)
                self.send_header('Content-type', 'application/json')
                self.end_headers()
                response = {'id': pais_id, 'nombre': nombre, 'dirigente': dirigente}
                self.wfile.write(json.dumps(response).encode('utf-8'))
            except sqlite3.IntegrityError:
                self.send_response(400)
                self.send_header('Content-type', 'application/json')
                self.end_headers()
                self.wfile.write(json.dumps({'error': 'El país ya existe'}).encode('utf-8'))
            except Exception as e:
                self.send_error(500)
            return

        self.send_error(404)

    def do_PUT(self):
        """Manejar solicitudes PUT"""
        if self.path.startswith('/api/paises/') and self.path.count('/') == 3:
            try:
                pais_id = int(self.path.split('/')[-1])
                content_length = int(self.headers.get('Content-Length', 0))
                body = self.rfile.read(content_length)
                data = parse_json_body(body)

                nombre = data.get('nombre')
                dirigente = data.get('dirigente')

                # Validar datos
                if not nombre or not dirigente:
                    self.send_response(400)
                    self.send_header('Content-type', 'application/json')
                    self.end_headers()
                    self.wfile.write(json.dumps({'error': 'nombre y dirigente son requeridos'}).encode('utf-8'))
                    return

                conn = get_db()
                c = conn.cursor()
                c.execute('UPDATE paises SET nombre = ?, dirigente = ? WHERE id = ?',
                         (nombre, dirigente, pais_id))
                conn.commit()
                if c.rowcount == 0:
                    conn.close()
                    self.send_response(404)
                    self.send_header('Content-type', 'application/json')
                    self.end_headers()
                    self.wfile.write(json.dumps({'error': 'País no encontrado'}).encode('utf-8'))
                else:
                    conn.close()
                    self.send_response(200)
                    self.send_header('Content-type', 'application/json')
                    self.end_headers()
                    response = {'id': pais_id, 'nombre': nombre, 'dirigente': dirigente}
                    self.wfile.write(json.dumps(response).encode('utf-8'))
            except Exception as e:
                self.send_error(500)
            return

        self.send_error(404)

    def do_DELETE(self):
        """Manejar solicitudes DELETE"""
        if self.path.startswith('/api/paises/') and self.path.count('/') == 3:
            try:
                pais_id = int(self.path.split('/')[-1])
                conn = get_db()
                c = conn.cursor()
                c.execute('DELETE FROM paises WHERE id = ?', (pais_id,))
                conn.commit()
                if c.rowcount == 0:
                    conn.close()
                    self.send_response(404)
                    self.send_header('Content-type', 'application/json')
                    self.end_headers()
                    self.wfile.write(json.dumps({'error': 'País no encontrado'}).encode('utf-8'))
                else:
                    conn.close()
                    self.send_response(200)
                    self.send_header('Content-type', 'application/json')
                    self.end_headers()
                    response = {'mensaje': 'País eliminado correctamente', 'id': pais_id}
                    self.wfile.write(json.dumps(response).encode('utf-8'))
            except Exception as e:
                self.send_error(500)
            return

        self.send_error(404)

    def do_OPTIONS(self):
        """Manejar solicitudes OPTIONS (CORS)"""
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()

    def end_headers(self):
        """Agregar headers CORS a todas las respuestas"""
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        super().end_headers()

    def log_message(self, format, *args):
        """Silenciar logs por defecto"""
        return

# ============================================================================
# INICIAR SERVIDOR
# ============================================================================

if __name__ == '__main__':
    import os
    init_db()

    PORT = int(os.environ.get('PORT', 3003))
    server = HTTPServer(('0.0.0.0', PORT), PaisesHandler)
    print(f'✓ API de Países corriendo en http://localhost:{PORT}')
    print('✓ Endpoints disponibles:')
    print(f'  GET    http://localhost:{PORT}/api/paises')
    print(f'  GET    http://localhost:{PORT}/api/paises/{{id}}')
    print(f'  POST   http://localhost:{PORT}/api/paises')
    print(f'  PUT    http://localhost:{PORT}/api/paises/{{id}}')
    print(f'  DELETE http://localhost:{PORT}/api/paises/{{id}}')
    print('\n✓ Presiona Ctrl+C para detener el servidor\n')

    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print('\n✓ Servidor detenido')
        server.server_close()
