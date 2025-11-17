// ============= CONFIGURACIÓN DE APIs =============
// ⚠️ IMPORTANTE: Reemplaza estas URLs con las URLs reales de Render después de desplegar
const API_USUARIOS = 'https://api-nestjs-usuarios.onrender.com/api/usuarios';
const API_CIUDADES = 'https://api-express-ciudades.onrender.com/api/ciudades';
const API_PAISES = 'https://api-fastapi-paises.onrender.com/api/paises';

// ============= SERVICIOS HTTP =============
async function fetchData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error('Error fetch:', error);
    throw error;
  }
}

async function postData(url, data) {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error('Error post:', error);
    throw error;
  }
}

// ============= SERVICIOS DE USUARIOS =============
async function getUsuarios() {
  return await fetchData(API_USUARIOS);
}

async function createUsuario(nombre, rut, edad) {
  return await postData(API_USUARIOS, { nombre, rut, edad: parseInt(edad) });
}

// ============= SERVICIOS DE CIUDADES =============
async function getCiudades() {
  return await fetchData(API_CIUDADES);
}

async function createCiudad(nombre, poblacion) {
  return await postData(API_CIUDADES, { nombre, poblacion: parseInt(poblacion) });
}

// ============= SERVICIOS DE PAÍSES =============
async function getPaises() {
  return await fetchData(API_PAISES);
}

async function createPais(nombre, dirigente) {
  return await postData(API_PAISES, { nombre, dirigente });
}

// ============= UI - RENDERIZADO =============
function showLoading(show = true) {
  const spinner = document.getElementById('loading-spinner');
  const content = document.getElementById('content');
  if (spinner) spinner.style.display = show ? 'block' : 'none';
  if (content) content.style.display = show ? 'none' : 'block';
}

function showError(message) {
  const errorDiv = document.getElementById('error-message');
  if (errorDiv) {
    errorDiv.textContent = message;
    errorDiv.style.display = 'block';
    setTimeout(() => {
      errorDiv.style.display = 'none';
    }, 5000);
  }
}

function renderList(items, type) {
  if (!items || items.length === 0) {
    return `
      <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-center">
        <p class="text-yellow-800">⚠️ No hay ${type} registrados</p>
        <p class="text-sm text-yellow-600 mt-2">Primera carga puede tardar ~50 segundos (APIs despertando)</p>
      </div>
    `;
  }

  const cards = items.map(item => {
    if (type === 'usuarios') {
      return `
        <div class="bg-white rounded-lg shadow p-4 border border-gray-200">
          <h3 class="font-bold text-lg text-blue-600">${item.nombre}</h3>
          <p class="text-gray-600">RUT: ${item.rut}</p>
          <p class="text-gray-600">Edad: ${item.edad} años</p>
        </div>
      `;
    } else if (type === 'ciudades') {
      return `
        <div class="bg-white rounded-lg shadow p-4 border border-gray-200">
          <h3 class="font-bold text-lg text-green-600">${item.nombre}</h3>
          <p class="text-gray-600">Población: ${item.poblacion.toLocaleString()}</p>
        </div>
      `;
    } else if (type === 'países') {
      return `
        <div class="bg-white rounded-lg shadow p-4 border border-gray-200">
          <h3 class="font-bold text-lg text-purple-600">${item.nombre}</h3>
          <p class="text-gray-600">Dirigente: ${item.dirigente}</p>
        </div>
      `;
    }
  }).join('');

  return cards;
}

// ============= NAVEGACIÓN =============
async function showTab(tabName) {
  showLoading(true);

  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.classList.remove('border-blue-500', 'text-blue-600');
    btn.classList.add('border-transparent', 'text-gray-500');
  });

  const activeBtn = document.getElementById(`tab-${tabName}`);
  if (activeBtn) {
    activeBtn.classList.remove('border-transparent', 'text-gray-500');
    activeBtn.classList.add('border-blue-500', 'text-blue-600');
  }

  const contentDiv = document.getElementById('tab-content');
  
  try {
    if (tabName === 'usuarios') {
      const data = await getUsuarios();
      contentDiv.innerHTML = `
        <div class="mb-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 class="font-bold text-lg mb-3">➕ Crear Usuario</h3>
          <form id="form-usuario" class="space-y-3">
            <input type="text" id="input-nombre" placeholder="Nombre completo" 
              class="w-full px-3 py-2 border rounded" required>
            <input type="text" id="input-rut" placeholder="RUT (12345678-9)" 
              class="w-full px-3 py-2 border rounded" required>
            <input type="number" id="input-edad" placeholder="Edad" 
              class="w-full px-3 py-2 border rounded" required>
            <button type="submit" class="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
              Crear Usuario
            </button>
          </form>
        </div>
        <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          ${renderList(data, 'usuarios')}
        </div>
      `;
    } else if (tabName === 'ciudades') {
      const data = await getCiudades();
      contentDiv.innerHTML = `
        <div class="mb-6 bg-green-50 border border-green-200 rounded-lg p-4">
          <h3 class="font-bold text-lg mb-3">➕ Crear Ciudad</h3>
          <form id="form-ciudad" class="space-y-3">
            <input type="text" id="input-nombre-ciudad" placeholder="Nombre de la ciudad" 
              class="w-full px-3 py-2 border rounded" required>
            <input type="number" id="input-poblacion" placeholder="Población" 
              class="w-full px-3 py-2 border rounded" required>
            <button type="submit" class="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600">
              Crear Ciudad
            </button>
          </form>
        </div>
        <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          ${renderList(data, 'ciudades')}
        </div>
      `;
    } else if (tabName === 'paises') {
      const data = await getPaises();
      contentDiv.innerHTML = `
        <div class="mb-6 bg-purple-50 border border-purple-200 rounded-lg p-4">
          <h3 class="font-bold text-lg mb-3">➕ Crear País</h3>
          <form id="form-pais" class="space-y-3">
            <input type="text" id="input-nombre-pais" placeholder="Nombre del país" 
              class="w-full px-3 py-2 border rounded" required>
            <input type="text" id="input-dirigente" placeholder="Dirigente" 
              class="w-full px-3 py-2 border rounded" required>
            <button type="submit" class="w-full bg-purple-500 text-white py-2 rounded hover:bg-purple-600">
              Crear País
            </button>
          </form>
        </div>
        <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          ${renderList(data, 'países')}
        </div>
      `;
    }

    setupFormListeners(tabName);
  } catch (error) {
    contentDiv.innerHTML = `
      <div class="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
        <p class="text-red-800 font-bold">❌ Error al cargar datos</p>
        <p class="text-sm text-red-600 mt-2">${error.message}</p>
        <p class="text-xs text-red-500 mt-2">Si es la primera vez, espera ~50 segundos y recarga</p>
        <button onclick="showTab('${tabName}')" class="mt-4 bg-red-500 text-white px-4 py-2 rounded">
          Reintentar
        </button>
      </div>
    `;
  } finally {
    showLoading(false);
  }
}

function setupFormListeners(tabName) {
  if (tabName === 'usuarios') {
    const form = document.getElementById('form-usuario');
    if (form) {
      form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const nombre = document.getElementById('input-nombre').value;
        const rut = document.getElementById('input-rut').value;
        const edad = document.getElementById('input-edad').value;
        
        try {
          await createUsuario(nombre, rut, edad);
          showTab('usuarios');
        } catch (error) {
          showError('Error al crear usuario: ' + error.message);
        }
      });
    }
  } else if (tabName === 'ciudades') {
    const form = document.getElementById('form-ciudad');
    if (form) {
      form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const nombre = document.getElementById('input-nombre-ciudad').value;
        const poblacion = document.getElementById('input-poblacion').value;
        
        try {
          await createCiudad(nombre, poblacion);
          showTab('ciudades');
        } catch (error) {
          showError('Error al crear ciudad: ' + error.message);
        }
      });
    }
  } else if (tabName === 'paises') {
    const form = document.getElementById('form-pais');
    if (form) {
      form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const nombre = document.getElementById('input-nombre-pais').value;
        const dirigente = document.getElementById('input-dirigente').value;
        
        try {
          await createPais(nombre, dirigente);
          showTab('paises');
        } catch (error) {
          showError('Error al crear país: ' + error.message);
        }
      });
    }
  }
}

// ============= INICIALIZACIÓN =============
document.addEventListener('deviceready', () => {
  console.log('✓ Cordova listo');
  
  document.getElementById('tab-usuarios').addEventListener('click', () => showTab('usuarios'));
  document.getElementById('tab-ciudades').addEventListener('click', () => showTab('ciudades'));
  document.getElementById('tab-paises').addEventListener('click', () => showTab('paises'));
  
  showTab('usuarios');
});
