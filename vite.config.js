// ============================================
// ARCHIVO: vite.config.js
// Configuración para Vite + React + GitHub Pages
// ============================================

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  // Base path para GitHub Pages
  // CAMBIA 'TU_USUARIO' por tu nombre de usuario de GitHub
  // CAMBIA 'crypto-e-duty' por el nombre de tu repositorio
  base: '/cryptoeduty_project/',
  
  plugins: [react()],
  
  // Configuración para optimización
  build: {
    // Genera archivos más pequeños
    minify: 'esbuild',
    
    // Para mejor compatibilidad
    target: 'es2020',
    
    // Nombre de la carpeta de salida
    outDir: 'dist',
    
    // Archivos estáticos
    assetsDir: 'assets',
    
    // Rollup options para evitar advertencias
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom']
        }
      }
    }
  },
  
  // Configuración del servidor de desarrollo
  server: {
    port: 3000,
    open: true,
    // Para que funcione el routing en desarrollo
    historyApiFallback: true
  },
  
  // Para previsualización
  preview: {
    port: 4173
  }
})

/* ============================================
   INSTRUCCIONES PARA GITHUB PAGES:
   ============================================
   
   1. Asegúrate de que el campo 'homepage' en package.json 
      coincida con la URL de tu repositorio:
   
   2. El campo 'base' en vite.config.js debe ser:
      base: '/cryptoeduty_project/'
   
   3. Para desplegar:
      npm run deploy
   
   4. En GitHub:
      - Ve a Settings > Pages
      - Selecciona la rama: gh-pages
      - Carpeta: / (root)
      - Guarda
   5. Tu sitio estará disponible en:
*/