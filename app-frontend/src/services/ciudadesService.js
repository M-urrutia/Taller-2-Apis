const BASE = window.__API_BASE_CIUDADES__ || 'http://localhost:3000';
const API = `${BASE}/api/ciudades`;

export async function getCiudades() {
  const res = await fetch(API);
  if (!res.ok) throw new Error('Error fetching ciudades');
  return res.json();
}

export async function getCiudad(id) {
  const res = await fetch(`${API}/${id}`);
  if (!res.ok) throw new Error('Error fetching ciudad');
  return res.json();
}

export async function createCiudad(data) {
  const res = await fetch(API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error('Error creating ciudad');
  return res.json();
}
