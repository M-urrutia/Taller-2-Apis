console.log('=== INICIO main.js ===');
alert('main.js se está ejecutando');
import { initDatabase } from './db/database.js';
import { getCiudades } from './services/ciudadesService.js';
import { getPaises } from './services/paisesService.js';
import { getUsuarios } from './services/usuariosService.js';

console.log('Imports cargados');

const content = document.getElementById('content');
const btnUsuarios = document.getElementById('btn-usuarios');
const btnPaises = document.getElementById('btn-paises');
const btnCiudades = document.getElementById('btn-ciudades');

console.log('Elementos DOM encontrados:', {
  content: !!content,
  btnUsuarios: !!btnUsuarios,
  btnPaises: !!btnPaises,
  btnCiudades: !!btnCiudades
});

function renderList(title, items, fields) {
    content.innerHTML = '';

    const header = document.createElement('div');
    header.className = 'flex items-center justify-between mb-4';
    header.innerHTML = `<h2 class="font-semibold text-lg">${title}</h2>`;
    content.appendChild(header);

    const list = document.createElement('div');
    list.className = 'space-y-3';

    if (!items || items.length === 0) {
        const empty = document.createElement('div');
        empty.className = 'text-sm text-gray-500 text-center py-8';
        empty.textContent = 'No hay elementos.';
        list.appendChild(empty);
    } else {
        items.forEach(item => {
            const card = document.createElement('div');
            card.className = 'p-4 bg-white rounded shadow';
            card.innerHTML = fields.map(f => `<div class="mb-1"><strong>${f.label}:</strong> ${item[f.key] ?? ''}<div>`).join('');
            list.appendChild(card);
        });
    }
    content.appendChild(list);
}

async function showCiudades() {
  try {
    content.innerHTML = '<div class="text-center py-8">Cargando...</div>';
    const ciudades = await getCiudades();
    renderList('Ciudades', ciudades, [
      { label: 'ID', key: 'id' },
      { label: 'Nombre', key: 'nombre' },
      { label: 'Población', key: 'poblacion' }
    ]);
  } catch (e) {
    console.error(e);
    content.innerHTML = `<div class="text-red-500 p-4">Error: ${e.message}</div>`;
  }
}

async function showPaises() {
  try {
    content.innerHTML = '<div class="text-center py-8">Cargando...</div>';
    const paises = await getPaises();
    renderList('Países', paises, [
      { label: 'ID', key: 'id' },
      { label: 'Nombre', key: 'nombre' },
      { label: 'Dirigente', key: 'dirigente' }
    ]);
  } catch (e) {
    console.error(e);
    content.innerHTML = `<div class="text-red-500 p-4">Error: ${e.message}</div>`;
  }
}

async function showUsuarios() {
  try {
    content.innerHTML = '<div class="text-center py-8">Cargando...</div>';
    const usuarios = await getUsuarios();
    renderList('Usuarios', usuarios, [
      { label: 'ID', key: 'id' },
      { label: 'Nombre', key: 'nombre' },
      { label: 'RUT', key: 'rut' }
    ]);
  } catch (e) {
    console.error(e);
    content.innerHTML = `<div class="text-red-500 p-4">Error: ${e.message}</div>`;
  }
}

console.log('Registrando listener deviceready...');

document.addEventListener('deviceready', async () => {
    alert('Cordova deviceready funcionando');
  console.log('✓ DEVICEREADY disparado');
  console.log('window.sqlitePlugin existe:', !!window.sqlitePlugin);
  
  try {
    content.innerHTML = '<div class="text-center py-8 text-blue-500">Iniciando base de datos...</div>';
    
    await initDatabase();
    console.log('✓ BD inicializada correctamente');
    
    btnCiudades.addEventListener('click', () => {
      console.log('Click en Ciudades');
      showCiudades();
    });
    btnPaises.addEventListener('click', () => {
      console.log('Click en Países');
      showPaises();
    });
    btnUsuarios.addEventListener('click', () => {
      console.log('Click en Usuarios');
      showUsuarios();
    });
    
    console.log('Cargando ciudades iniciales...');
    await showCiudades();
    console.log('✓ App lista');
  } catch (error) {
    console.error('ERROR CRÍTICO:', error);
    console.error('Stack:', error.stack);
    content.innerHTML = `<div class="text-red-500 p-4"><strong>Error:</strong> ${error.message}<br><small>${error.stack}</small></div>`;
  }
}, false);

console.log('Listener registrado. Esperando deviceready...');