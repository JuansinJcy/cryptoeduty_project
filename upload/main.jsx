import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './styles.css'

// Renderiza la aplicación
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

/* ============================================
   NOTAS:
   ============================================
   
   1. React.StrictMode ayuda a identificar problemas potenciales
      en la aplicación durante el desarrollo.
   
   2. El orden de importación es importante:
      - Primero React
      - Luego los componentes
      - Finalmente los estilos
   
   3. Para producción, puedes deshabilitar StrictMode:
      ReactDOM.createRoot(document.getElementById('root')).render(
        <App />
      )
*/