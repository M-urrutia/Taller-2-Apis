const BASE = window.__API_BASE_PAISES__ || 'http://localhost:3003';
const API = `${BASE}/api/paises`;

export async function getPaises() {
  try {
    console.log('[PAISES] GET:', API);
    const res = await fetch(API, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
    });
    console.log('[PAISES] GET Response:', res.status, res.statusText);
    if (!res.ok) {
      const errorText = await res.text();
      console.error('[PAISES] GET Error:', errorText);
      throw new Error(`HTTP ${res.status}: ${errorText}`);
    }
    const data = await res.json();
    console.log('[PAISES] GET Data:', data);
    return data;
  } catch (error) {
    console.error('[PAISES] GET Failed:', error);
    throw error;
  }
}

export async function getPais(id) {
  try {
    console.log('[PAISES] GET by ID:', `${API}/${id}`);
    const res = await fetch(`${API}/${id}`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.json();
  } catch (error) {
    console.error('[PAISES] GET by ID Failed:', error);
    throw error;
  }
}

export async function createPais(data) {
  try {
    console.log('[PAISES] POST:', API, 'Data:', data);
    const res = await fetch(API, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(data)
    });
    console.log('[PAISES] POST Response:', res.status, res.statusText);
    
    if (!res.ok) {
      const errorText = await res.text();
      console.error('[PAISES] POST Error:', errorText);
      throw new Error(`HTTP ${res.status}: ${errorText}`);
    }
    
    const result = await res.json();
    console.log('[PAISES] POST Success:', result);
    return result;
  } catch (error) {
    console.error('[PAISES] POST Failed:', error);
    throw error;
  }
}
