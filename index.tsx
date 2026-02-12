
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Registro de Service Worker para PWA (Crucial para Bubblewrap)
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    // Usamos ./sw.js para asegurar que cargue correctamente en sub-rutas de GitHub Pages
    navigator.serviceWorker.register('./sw.js')
      .then(reg => {
        console.log('Kawsay PWA: Service Worker activo con éxito en el scope:', reg.scope);
      })
      .catch(err => {
        console.error('Kawsay PWA: Error en el registro del SW:', err);
      });
  });
}
