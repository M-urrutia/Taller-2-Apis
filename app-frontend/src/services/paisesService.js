const BASE = window.__API_BASE_PAISES__ || 'http://localhost:3003';
const API = `${BASE}/api/paises`;

export async function getPaises() {
  const res = await fetch(API);
  if (!res.ok) throw new Error('Error fetching paises');
  return res.json();
}

export async function getPais(id) {
  const res = await fetch(`${API}/${id}`);
  if (!res.ok) throw new Error('Error fetching pais');
  return res.json();
}

export async function createPais(data) {
  const res = await fetch(API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error('Error creating pais');
  return res.json();
}
