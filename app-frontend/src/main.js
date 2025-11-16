import { getCiudades, createCiudad } from './services/ciudadesService.js';
import { getPaises, createPais } from './services/paisesService.js';
import { getUsuarios, createUsuario } from './services/usuariosService.js';

// Referencias DOM
const content = document.getElementById('content');
const loadingEl = document.getElementById('loading');
const errorContainer = document.getElementById('error-container');
const errorMessage = document.getElementById('error-message');
const btnRetry = document.getElementById('btn-retry');
const btnDismissError = document.getElementById('btn-dismiss-error');
const notificationArea = document.getElementById('notification-area');

const btnUsuarios = document.getElementById('btn-usuarios');
const btnPaises = document.getElementById('btn-paises');
const btnCiudades = document.getElementById('btn-ciudades');

// Estado global
let currentView = 'usuarios';

// ========== UTILIDADES ==========

function showLoading() {
  loadingEl.classList.remove('hidden');
  content.classList.add('hidden');
  errorContainer.classList.add('hidden');
}

function hideLoading() {
  loadingEl.classList.add('hidden');
  content.classList.remove('hidden');
}

function showError(message) {
  // Preservar formato de líneas y espacios
  errorMessage.innerHTML = message.split('\n').map(line => 
    line.trim() ? `<div class="mb-1">${line}</div>` : '<div class="h-2"></div>'
  ).join('');
  errorContainer.classList.remove('hidden');
  content.classList.add('hidden');
  loadingEl.classList.add('hidden');
}

function hideError() {
  errorContainer.classList.add('hidden');
  content.classList.remove('hidden');
}

function showNotification(message, type = 'success') {
  const notification = document.createElement('div');
  notification.className = `pointer-events-auto mb-2 p-4 rounded-lg shadow-lg transform transition-all duration-300 ${
    type === 'success' ? 'bg-green-500' : 'bg-red-500'
  } text-white font-medium`;
  notification.textContent = message;
  notificationArea.appendChild(notification);
  
  setTimeout(() => {
    notification.style.opacity = '0';
    notification.style.transform = 'translateY(-20px)';
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

function updateActiveTabs(activeBtn) {
  const allBtns = [btnUsuarios, btnPaises, btnCiudades];
  allBtns.forEach(btn => {
    if (btn === activeBtn) {
      btn.classList.add('tab-active');
      btn.classList.remove('tab-inactive');
    } else {
      btn.classList.remove('tab-active');
      btn.classList.add('tab-inactive');
    }
  });
}

// ========== RENDERIZADO ==========

function renderList(title, items, fields, formFields, onSubmit, singularName) {
  content.innerHTML = '';
  content.classList.add('fade-in');
  
  // Header con título y botón
  const header = document.createElement('div');
  header.className = 'flex items-center justify-between mb-4';
  
  const itemCount = items && items.length > 0 ? items.length : 0;
  const countBadge = itemCount > 0 
    ? `<span class="ml-2 px-3 py-1 bg-blue-100 text-blue-800 text-sm font-bold rounded-full">${itemCount}</span>` 
    : '';
  
  header.innerHTML = `
    <h2 class="text-2xl font-bold text-gray-800 flex items-center">
      ${title}${countBadge}
    </h2>
    <button id="btn-add-new" class="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg text-sm font-medium shadow-md hover:shadow-lg transition">
      ➕ Nuevo
    </button>
  `;
  content.appendChild(header);

  // Contenedor de formulario
  const formContainer = document.createElement('div');
  formContainer.id = 'form-container';
  formContainer.className = 'hidden mb-6 bg-white p-4 rounded-lg shadow-lg border-2 border-blue-200';
  
  const form = document.createElement('form');
  form.className = 'space-y-3';
  form.innerHTML = `
    <h3 class="font-semibold text-lg text-gray-800 mb-2">${singularName}</h3>
    ${formFields.map(field => `
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">${field.label}</label>
        <input 
          type="${field.type || 'text'}" 
          name="${field.name}" 
          required
          placeholder="${field.placeholder || ''}"
          class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
        />
      </div>
    `).join('')}
    <div class="flex gap-2 pt-2">
      <button type="submit" class="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition">
        Guardar
      </button>
      <button type="button" id="btn-cancel" class="px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition">
        Cancelar
      </button>
    </div>
  `;
  
  formContainer.appendChild(form);
  content.appendChild(formContainer);

  // Toggle formulario
  const btnAddNew = header.querySelector('#btn-add-new');
  btnAddNew.addEventListener('click', () => {
    formContainer.classList.toggle('hidden');
    if (!formContainer.classList.contains('hidden')) {
      form.querySelector('input').focus();
    }
  });

  const btnCancel = form.querySelector('#btn-cancel');
  btnCancel.addEventListener('click', () => {
    form.reset();
    formContainer.classList.add('hidden');
  });

  // Manejar submit
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const data = {};
    formData.forEach((value, key) => { data[key] = value; });
    
    try {
      await onSubmit(data);
      form.reset();
      formContainer.classList.add('hidden');
      showNotification('✅ Elemento creado exitosamente');
      loadCurrentView();
    } catch (error) {
      showNotification('❌ Error al crear: ' + error.message, 'error');
    }
  });

  // Lista de items
  const list = document.createElement('div');
  list.className = 'space-y-3';

  if (!items || items.length === 0) {
    const empty = document.createElement('div');
    empty.className = 'text-center py-12 bg-gradient-to-br from-green-50 to-blue-50 rounded-lg shadow-lg border-2 border-dashed border-green-300';
    empty.innerHTML = `
      <div class="text-6xl mb-3">✅</div>
      <p class="text-green-600 font-bold text-lg">API Conectada</p>
      <p class="text-gray-600 font-medium mt-2">La base de datos está vacía</p>
      <p class="text-gray-500 text-sm mt-1">Agrega el primer elemento usando el botón <strong>"+ Nuevo"</strong> arriba</p>
      <div class="mt-4 inline-block px-4 py-2 bg-white rounded-lg shadow-sm text-xs text-gray-500">
        Total de registros: <span class="font-bold text-gray-700">0</span>
      </div>
    `;
    list.appendChild(empty);
  } else {
    items.forEach((item, index) => {
      const card = document.createElement('div');
      card.className = 'card p-4 bg-white rounded-lg shadow hover:shadow-md border border-gray-100';
      
      const fieldsHTML = fields.map(f => `
        <div class="flex justify-between items-center py-1">
          <span class="text-sm font-medium text-gray-600">${f.label}:</span>
          <span class="text-sm text-gray-900 font-semibold">${item[f.key] ?? 'N/A'}</span>
        </div>
      `).join('');
      
      card.innerHTML = `
        <div class="flex items-start justify-between mb-2">
          <span class="inline-block px-2 py-1 bg-blue-100 text-blue-800 text-xs font-bold rounded">#${index + 1}</span>
          ${item.id ? `<span class="text-xs text-gray-400">ID: ${item.id}</span>` : ''}
        </div>
        <div class="space-y-1">${fieldsHTML}</div>
      `;
      
      list.appendChild(card);
    });
  }

  content.appendChild(list);
}

// ========== VISTAS ==========

async function showUsuarios() {
  currentView = 'usuarios';
  updateActiveTabs(btnUsuarios);
  showLoading();
  
  try {
    const usuarios = await getUsuarios();
    hideLoading();
    
    // Mostrar información de conexión exitosa
    console.log('✅ API Usuarios conectada - Registros obtenidos:', usuarios.length);
    
    renderList(
      '👥 Usuarios',
      usuarios,
      [
        { label: 'Nombre', key: 'nombre' },
        { label: 'RUT', key: 'rut' },
        { label: 'Edad', key: 'edad' }
      ],
      [
        { name: 'nombre', label: 'Nombre Completo', placeholder: 'Ej: Juan Pérez' },
        { name: 'rut', label: 'RUT', placeholder: 'Ej: 12345678-9' },
        { name: 'edad', label: 'Edad', type: 'number', placeholder: 'Ej: 25' }
      ],
      createUsuario,
      'Nuevo Usuario'
    );
  } catch (error) {
    hideLoading();
    showError(`Error conectando con API de Usuarios (Puerto 3001)\n\n${error.message}\n\n Verifica que la API esté corriendo:\ncd api-nestjs-usuarios\nnpm run dev`);
    console.error('Error:', error);
  }
}

async function showPaises() {
  currentView = 'paises';
  updateActiveTabs(btnPaises);
  showLoading();
  
  try {
    const paises = await getPaises();
    hideLoading();
    
    renderList(
      '🌍 Países',
      paises,
      [
        { label: 'Nombre', key: 'nombre' },
        { label: 'Dirigente', key: 'dirigente' }
      ],
      [
        { name: 'nombre', label: 'Nombre del País', placeholder: 'Ej: Chile' },
        { name: 'dirigente', label: 'Dirigente', placeholder: 'Ej: Presidente...' }
      ],
      createPais,
      'Nuevo País'
    );
  } catch (error) {
    hideLoading();
    showError(`Error conectando con API de Países (Puerto 3003)\n\n${error.message}\n\n Verifica que la API esté corriendo:\ncd api-fastapi-paises\npython main.py`);
    console.error('Error:', error);
  }
}

async function showCiudades() {
  currentView = 'ciudades';
  updateActiveTabs(btnCiudades);
  showLoading();
  
  try {
    const ciudades = await getCiudades();
    hideLoading();
    
    // Mostrar información de conexión exitosa
    console.log('✅ API Ciudades conectada - Registros obtenidos:', ciudades.length);
    
    renderList(
      '🏙️ Ciudades',
      ciudades,
      [
        { label: 'Nombre', key: 'nombre' },
        { label: 'Población', key: 'poblacion' }
      ],
      [
        { name: 'nombre', label: 'Nombre de la Ciudad', placeholder: 'Ej: Santiago' },
        { name: 'poblacion', label: 'Población', type: 'number', placeholder: 'Ej: 5000000' }
      ],
      createCiudad,
      'Nueva Ciudad'
    );
  } catch (error) {
    hideLoading();
    showError(`Error conectando con API de Ciudades (Puerto 3002)\n\n${error.message}\n\n Verifica que la API esté corriendo:\ncd api-express-ciudades\nnpm run dev`);
    console.error('Error:', error);
  }
}

function loadCurrentView() {
  if (currentView === 'usuarios') showUsuarios();
  else if (currentView === 'paises') showPaises();
  else if (currentView === 'ciudades') showCiudades();
}

// ========== EVENT LISTENERS ==========

btnUsuarios.addEventListener('click', showUsuarios);
btnPaises.addEventListener('click', showPaises);
btnCiudades.addEventListener('click', showCiudades);
btnRetry.addEventListener('click', loadCurrentView);
btnDismissError.addEventListener('click', hideError);

// ========== INICIALIZACIÓN ==========

showUsuarios();
