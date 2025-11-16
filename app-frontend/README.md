# Frontend - App APIs

Esta es una SPA simple en JavaScript puro (sin frameworks) y con Tailwind (CDN) para mostrar los datos de las APIs del repositorio.

Requisitos:
- Ejecutar las APIs (Express, FastAPI, NestJS) en tu máquina. Ajusta las URLs base si usan puertos distintos.
- Servir los archivos estáticos desde un servidor HTTP (fetch no funciona bien con file://).

Instrucciones rápidas:

1. Servir estático (desde la carpeta `app-frontend`):

   - Con Python (rápido):

     ```powershell
     cd "app-frontend"
     python -m http.server 5500
     # luego abre http://localhost:5500
     ```

   - Con `npx serve`:

     ```powershell
     cd "app-frontend"
     npx serve -p 5500
     ```

2. Asegúrate de que las APIs estén corriendo y que permitan CORS. Si no permites CORS, habilítalo en cada API para `http://localhost:5500` o usa un proxy.

3. Ajustar URLs base (opcional):

   Puedes configurar las URLs base antes de cargar la app añadiendo variables globales en la consola del navegador o modificando los servicios.

   Por ejemplo, en la consola del navegador antes de cargar la página:

   ```js
   window.__API_BASE_CIUDADES__ = 'http://localhost:3000';
   window.__API_BASE_PAISES__ = 'http://localhost:8000';
   window.__API_BASE_USUARIOS__ = 'http://localhost:3001';
   ```

4. Para convertir a Cordova:
   - Construir la app estática (los archivos ya son estáticos). Copia el contenido de `app-frontend` dentro de `www/` en un proyecto Cordova.

Notas:
- El proyecto fue diseñado mobile-first con Tailwind CDN para facilitar la integración con Cordova sin pasos de build.
- Si quieres un proceso con bundler (Vite) o compilación Tailwind, puedo agregarlo luego.
