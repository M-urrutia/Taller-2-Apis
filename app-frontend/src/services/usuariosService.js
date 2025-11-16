const BASE = window.__API_BASE_USUARIOS__ || 'http://localhost:3001';
const API = `${BASE}/api/usuarios`;

export async function getUsuarios() {
  const res = await fetch(API);
  if (!res.ok) throw new Error('Error fetching usuarios');
  return res.json();
}

export async function getUsuario(id) {
  const res = await fetch(`${API}/${id}`);
  if (!res.ok) throw new Error('Error fetching usuario');
  return res.json();
}

export async function createUsuario(data) {
  const res = await fetch(API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error('Error creating usuario');
  return res.json();
}
