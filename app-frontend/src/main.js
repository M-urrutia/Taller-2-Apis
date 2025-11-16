import { getCiudades, createCiudad } from './services/ciudadesService.js';
import { getPaises, createPais } from './services/paisesService.js';
import { getUsuarios, createUsuario } from './services/usuariosService.js';

// Referencias DOM
const content = document.getElementById('content');
const btnCiudades = document.getElementById('btn-ciudades');
const btnPaises = document.getElementById('btn-paises');
const btnUsuarios = document.getElementById('btn-usuarios');

// Renders
function renderList(title, items, fields) {
  content.innerHTML = '';
  const header = document.createElement('div');
  header.className = 'flex items-center justify-between';
  header.innerHTML = `<h2 class="font-semibold text-lg">${title}</h2>`;
  content.appendChild(header);

  const list = document.createElement('div');
  list.className = 'mt-3 space-y-3';

  if (!items || items.length === 0) {
    const empty = document.createElement('div');
    empty.className = 'text-sm text-gray-500';
    empty.textContent = 'No hay elementos.';
    list.appendChild(empty);
  } else {
    items.forEach(item => {
      const card = document.createElement('div');
      card.className = 'p-3 bg-white rounded shadow';
      card.innerHTML = fields.map(f => `<div><strong class="mr-2">${f.label}:</strong>${item[f.key] ?? ''}</div>`).join('');
      list.appendChild(card);
    });
  }

  // Form para crear nuevo
  const form = document.createElement('form');
  form.className = 'mt-4 space-y-2';
  content.appendChild(list);
  content.appendChild(form);
}

// Ciudades view
async function showCiudades() {
  try {
    const ciudades = await getCiudades();
    renderList('Ciudades', ciudades, [ { label: 'Nombre', key: 'nombre' }, { label: 'Población', key: 'poblacion' } ]);
  } catch (e) {
    content.innerHTML = `<div class="text-red-500">Error cargando ciudades</div>`;
  }
}

// Paises view
async function showPaises() {
  try {
    const paises = await getPaises();
    renderList('Países', paises, [ { label: 'Nombre', key: 'nombre' }, { label: 'Dirigente', key: 'dirigente' } ]);
  } catch (e) {
    content.innerHTML = `<div class="text-red-500">Error cargando países</div>`;
  }
}

// Usuarios view
async function showUsuarios() {
  try {
    const usuarios = await getUsuarios();
    renderList('Usuarios', usuarios, [ { label: 'Nombre', key: 'nombre' }, { label: 'RUT', key: 'rut' } ]);
  } catch (e) {
    content.innerHTML = `<div class="text-red-500">Error cargando usuarios</div>`;
  }
}

// Event listeners
btnCiudades.addEventListener('click', (e) => { showCiudades(); });
btnPaises.addEventListener('click', (e) => { showPaises(); });
btnUsuarios.addEventListener('click', (e) => { showUsuarios(); });

// Auto load ciudades
showCiudades();
