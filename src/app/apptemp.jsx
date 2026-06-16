import React, { useState, useMemo, createContext, useContext } from 'react'
import { menuItems, cryptoTips, cryptoNews2026, creatorBio, learningModules, faqItems, techStack } from './data/content'
import { createDemoWallet, mockTransfer } from './wallet/srcwalletwalletDemo'

// ==================== CONTEXTO DE TEMA (Día/Noche) ===================
const ThemeContext = createContext()

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('dark')
  
  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark')
  }
  
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  return useContext(ThemeContext)
}

// ==================== COMPONENTES REUTILIZABLES ====================

// Barra de Progreso Interactiva
function ProgressBar({ progress, total }) {
  const percentage = (progress / total) * 100
  
  return (
    <div className="progress-container">
      <div className="progress-bar">
        <div 
          className="progress-fill" 
          style={{ width: `${percentage}%` }}
        />
      </div>
      <span className="progress-text">{Math.round(percentage)}% completado</span>
    </div>
  )
}

// Tarjeta de Módulo de Aprendizaje
function LearningModuleCard({ module, completed, onComplete }) {
  const [isExpanded, setIsExpanded] = useState(false)
  
  return (
    <div className={`module-card ${completed ? 'completed' : ''}`}>
      <div className="module-header">
        <div className="module-icon">
          {module.icon}
        </div>
        <div className="module-info">
          <h3>{module.title}</h3>
          <span className="module-level">{module.level}</span>
        </div>
        <span className="module-status">
          {completed ? '✓ Completado' : `${module.duration}`}
        </span>
      </div>
      
      <div className={`module-content ${isExpanded ? 'expanded' : ''}`}>
        <p>{module.description}</p>
        {module.topics && (
          <ul className="module-topics">
            {module.topics.map((topic, i) => (
              <li key={i}>{topic}</li>
            ))}
          </ul>
        )}
        {!completed && (
          <button 
            className="complete-btn" 
            onClick={() => onComplete(module.id)}
          >
            Marcar como completado
          </button>
        )}
      </div>
      
      <button 
        className="expand-btn" 
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {isExpanded ? '▲' : '▼'}
      </button>
    </div>
  )
}

// Tips Tutoriales para Nuevos Usuarios
function TutorialTips() {
  const [currentTip, setCurrentTip] = useState(0)
  const [showTips, setShowTips] = useState(true)
  
  const tips = [
    {
      title: "Bienvenido a Crypto E-Duty",
      content: "Esta plataforma te ayudará a aprender sobre criptomonedas de forma segura usando fondos ficticios."
    },
    {
      title: "¿Por qué aprender sobre cripto?",
      content: "En el siglo 21, entender los activos digitales y la tecnología blockchain es una habilidad esencial para navegar el mundo financiero."
    },
    {
      title: "¿Cómo usar la wallet educativa?",
      content: "Crea una wallet, revisa tu saldo ficticio y simula transferencias para aprender sin riesgo."
    },
    {
      title: "Explora la ruta de aprendizaje",
      content: "Completa los módulos para obtener una comprensión completa de los conceptos básicos."
    }
  ]
  
  if (!showTips) return null
  
  return (
    <div className="tutorial-overlay">
      <div className="tutorial-card">
        <button 
          className="close-tips" 
          onClick={() => setShowTips(false)}
        >
          ×
        </button>
        <h3>{tips[currentTip].title}</h3>
        <p>{tips[currentTip].content}</p>
        <div className="tutorial-nav">
          <button 
            onClick={() => setCurrentTip((currentTip - 1 + tips.length) % tips.length)}
            disabled={tips.length <= 1}
          >
            Anterior
          </button>
          <span>{currentTip + 1} / {tips.length}</span>
          <button 
            onClick={() => setCurrentTip((currentTip + 1) % tips.length)}
            disabled={tips.length <= 1}
          >
            Siguiente
          </button>
        </div>
      </div>
    </div>
  )
}

// Botones de Soporte y API
function SupportSection() {
  return (
    <div className="support-section">
      <h3>Recursos de Desarrollo</h3>
      <div className="support-buttons">
        {techStack.map((tech, i) => (
          <div key={i} className="tech-badge">
            {tech.icon} {tech.name}
          </div>
        ))}
      </div>
      <div className="support-links">
        <a href="https://github.com/JuansinJcy/cryptoeduty_project" target="_blank" rel="noopener">
          📂 Ver en GitHub
        </a>
        <a href="#" className="api-link">
          🔗 API Documentation
        </a>
        <a href="#" className="support-link">
          ❓ Soporte Técnico
        </a>
      </div>
    </div>
  )
}

// ==================== COMPONENTE PRINCIPAL ====================
function App() {
  const [activeSection, setActiveSection] = useState('home')
  const [wallet, setWallet] = useState(null)
  const [to, setTo] = useState('')
  const [amount, setAmount] = useState('')
  const [status, setStatus] = useState('')
  const [email, setEmail] = useState('')
  const [completedModules, setCompletedModules] = useState([])
  const [showTutorial, setShowTutorial] = useState(true)
  
  const { theme, toggleTheme } = useTheme()
  
  // Calcula progreso de aprendizaje
  const totalModules = learningModules.length
  const completedCount = completedModules.length
  const progress = (completedCount / totalModules) * 100
  
  const breadcrumbs = useMemo(() => {
    const map = {
      home: 'Inicio',
      project: 'Detalles del proyecto',
      purpose: 'Propósito',
      learning: 'Ruta de Aprendizaje',
      wallet: 'Wallet Educativa',
      manual: 'Manual de usuario',
      bio: 'Biografía',
      why: '¿Por qué este proyecto?',
      tech: 'Tecnología'
    }
    return ['Inicio', map[activeSection]]
  }, [activeSection])
  
  const handleCreateWallet = () => {
    setWallet(createDemoWallet())
    setStatus('✓ Wallet educativa creada correctamente.')
  }
  
  const handleTransfer = () => {
    if (!to || !amount) {
      setStatus('⚠️ Completa destino y monto para simular la operación.')
      return
    }
    const result = mockTransfer(amount, to)
    setStatus(result.message)
    setTo('')
    setAmount('')
  }
  
  const handleNewsletter = (e) => {
    e.preventDefault()
    if (!email) {
      setStatus('⚠️ Ingresa un correo válido para continuar.')
      return
    }
    setStatus('✓ Correo registrado para novedades.')
    setEmail('')
  }
  
  const handleCompleteModule = (moduleId) => {
    if (!completedModules.includes(moduleId)) {
      setCompletedModules([...completedModules, moduleId])
      setStatus(`✓ Módulo completado: ${learningModules.find(m => m.id === moduleId)?.title}`)
    }
  }
  
  const handleResetProgress = () => {
    setCompletedModules([])
    setStatus('Progreso reiniciado.')
  }
  
  const downloadGuide = () => {
    // Simulación de descarga
    setStatus('✓ Descargando guía de aprendizaje...')
    // En un entorno real, esto sería un enlace a un archivo PDF
    window.open('/manual/guia-rapida.pdf', '_blank')
  }
  
  // Filtra módulos por estado
  const availableModules = learningModules.filter(
    module => !completedModules.includes(module.id)
  )
  const nextModule = availableModules[0]
  
  return (
    <div className={`layout ${theme}`}>
      {/* Tutorial para nuevos usuarios */}
      {showTutorial && <TutorialTips />}
      
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="brand">
          <span className="brand-mark">CE</span>
          <div>
            <h2>Crypto E-Duty</h2>
            <p>Open Source • Educación • Interfaz Profesional</p>
          </div>
        </div>

        <nav className="side-nav">
          {menuItems.map(item => (
            <button
              key={item.id}
              className={activeSection === item.id ? 'nav-btn active' : 'nav-btn'}
              onClick={() => setActiveSection(item.id)}
            >
              {item.label}
            </button>
          ))}
          
          {/* Nuevas secciones */}
          <button
            className={activeSection === 'why' ? 'nav-btn active' : 'nav-btn'}
            onClick={() => setActiveSection('why')}
          >
            ¿Por qué este proyecto?
          </button>
          <button
            className={activeSection === 'learning' ? 'nav-btn active' : 'nav-btn'}
            onClick={() => setActiveSection('learning')}
          >
            Ruta de Aprendizaje
          </button>
          <button
            className={activeSection === 'tech' ? 'nav-btn active' : 'nav-btn'}
            onClick={() => setActiveSection('tech')}
          >
            Tecnología Usada
          </button>
        </nav>

        {/* Barra de progreso en sidebar */}
        <div className="sidebar-progress">
          <h4>Progreso de Aprendizaje</h4>
          <ProgressBar progress={completedCount} total={totalModules} />
          {completedCount > 0 && (
            <button className="reset-progress" onClick={handleResetProgress}>
              Reiniciar
            </button>
          )}
        </div>

        <div className="sidebar-card">
          <p>💡 Tips Rápidos:</p>
          <ul>
            {cryptoTips.slice(0, 3).map((tip, i) => (
              <li key={i}>{tip}</li>
            ))}
          </ul>
        </div>

        {/* Toggle de tema */}
        <div className="theme-toggle-container">
          <button className="theme-toggle" onClick={toggleTheme}>
            {theme === 'dark' ? '☀️ Modo Día' : '🌙 Modo Noche'}
          </button>
        </div>
      </aside>

      {/* Contenido Principal */}
      <main className="content">
        {/* Topbar */}
        <header className="topbar">
          <div className="breadcrumbs">
            {breadcrumbs.map((item, index) => (
              <span key={item}>
                {index > 0 && <span className="crumb-sep">/</span>}
                {item}
              </span>
            ))}
          </div>
          <div className="topbar-actions">
            <a href="#wallet" className="ghost-link">Ir a Wallet</a>
            <button className="ghost-link" onClick={downloadGuide}>
              📥 Descargar Guía PDF
            </button>
          </div>
        </header>

        {/* Sección Hero */}
        <section className="hero" id="home">
          <div className="hero-copy">
            <p className="eyebrow">Plataforma Educativa Open Source</p>
            <h1>Educación cripto clara, moderna y accesible</h1>
            <p>
              Crypto E-Duty es una plataforma de aprendizaje interactiva que combina 
              una billetera educativa con contenido profesional, diseñada para quienes 
              quieren entender el mundo cripto desde cero, sin riesgos.
            </p>
            <div className="hero-actions">
              <button className="primary-btn" onClick={handleCreateWallet}>
                Crear wallet educativa
              </button>
              <button 
                className="secondary-btn" 
                onClick={() => setActiveSection('learning')}
              >
                Comenzar Ruta de Aprendizaje
              </button>
            </div>
          </div>

          <div className="hero-panel">
            <div className="glow-card">
              <span>Estado de la demo</span>
              <strong>{wallet ? '✓ Activa' : 'Lista para iniciar'}</strong>
              <small>{wallet ? wallet.network : 'Presiona crear wallet'}</small>
              {wallet && (
                <div className="wallet-preview">
                  <span>Saldo: {wallet.balance} EDU</span>
                </div>
              )}
            </div>
            
            {/* Siguiente módulo sugerido */}
            {nextModule && (
              <div className="next-module-card">
                <span>Próximo módulo:</span>
                <strong>{nextModule.title}</strong>
                <small>{nextModule.level}</small>
              </div>
            )}
          </div>
        </section>

        {/* Sección: ¿Por qué este proyecto? */}
        {activeSection === 'why' && (
          <section className="glass-card" id="why">
            <h2>¿Por qué este proyecto?</h2>
            
            <div className="why-grid">
              <article>
                <h3>🎯 Importancia de Aprender sobre Criptomonedas</h3>
                <p>
                  En el siglo 21, las criptomonedas y la tecnología blockchain 
                  están transformando la forma en que interactuamos con el dinero 
                  y los activos digitales. Comprender estos conceptos no es opcional: 
                  es una necesidad para navegar con seguridad en el mundo financiero 
                  digital.
                </p>
                <p>
                  <strong>Beneficios:</strong>
                </p>
                <ul>
                  <li>🔒 Entender la custodia de tus activos</li>
                  <li>🛡️ Reconocer y evitar estafas comunes</li>
                  <li>📊 Tomar decisiones financieras informadas</li>
                  <li>🌍 Participar en la economía digital global</li>
                </ul>
              </article>

              <article>
                <h3>🏫 Utilidad para Entornos Educativos</h3>
                <p>
                  Crypto E-Duty está diseñado específicamente para entornos 
                  educativos, ofreciendo:
                </p>
                <ul>
                  <li><strong>Aprendizaje práctico:</strong> Usa fondos ficticios para simular operaciones reales</li>
                  <li><strong>Seguridad total:</strong> Sin riesgo de perder dinero real</li>
                  <li><strong>Enfoque progresivo:</strong> De conceptos básicos a avanzados</li>
                  <li><strong>Accesibilidad:</strong> Diseñado para todas las edades y niveles de experiencia</li>
                </ul>
              </article>

              <article>
                <h3>🔓 ¿Por qué Open Source?</h3>
                <p>
                  Ser open source significa que:
                </p>
                <ul>
                  <li><strong>Transparencia:</strong> Cualquiera puede auditar el código</li>
                  <li><strong>Colaboración:</strong> La comunidad puede contribuir y mejorar</li>
                  <li><strong>Accesibilidad:</strong> Gratis para todos, sin barreras</li>
                  <li><strong>Educación:</strong> Los estudiantes pueden aprender del código</li>
                  <li><strong>Confianza:</strong> No hay código oculto o malicioso</li>
                </ul>
                <p>
                  Este proyecto sigue la filosofía de que el conocimiento 
                  debe ser libre y accesible para todos.
                </p>
              </article>

              <article>
                <h3>💡 Oportunidades de Aprendizaje</h3>
                <p>
                  Al completar la ruta de aprendizaje, podrás:
                </p>
                <ul>
                  <li>Entender qué es una wallet y cómo funciona</li>
                  <li>Realizar transferencias de forma segura</li>
                  <li>Identificar proyectos serios de estafas</li>
                  <li>Comprender los conceptos básicos de blockchain</li>
                  <li>Explorar el mundo DeFi con confianza</li>
                  <li>Participar en la economía cripto de manera informada</li>
                </ul>
              </article>

              <article>
                <h3>🌐 ¿Por qué una Aplicación Web?</h3>
                <p>
                  Elegimos desarrollar una aplicación web porque:
                </p>
                <ul>
                  <li><strong>Accesibilidad:</strong> Funciona en cualquier dispositivo con navegador</li>
                  <li><strong>Sin instalación:</strong> No requiere descargar nada</li>
                  <li><strong>Actualizaciones automáticas:</strong> Siempre tienes la última versión</li>
                  <li><strong>Compartible:</strong> Fácil de compartir con otros</li>
                  <li><strong>Económico:</strong> Sin costos de desarrollo para múltiples plataformas</li>
                </ul>
                <p>
                  <strong>¿Por qué React?</strong> Porque ofrece:
                </p>
                <ul>
                  <li>Componentes reutilizables</li>
                  <li>Interfaz interactiva y dinámica</li>
                  <li>Comunidad grande y documentación extensa</li>
                  <li>Rendimiento excelente</li>
                  <li>Fácil de mantener y escalar</li>
                </ul>
              </article>
            </div>
          </section>
        )}

        {/* Sección: Ruta de Aprendizaje */}
        {activeSection === 'learning' && (
          <section className="glass-card" id="learning">
            <h2>📚 Ruta de Aprendizaje</h2>
            <p>
              Completa estos módulos para obtener una comprensión completa 
              de los conceptos básicos de criptomonedas y blockchain.
            </p>
            
            {/* Barra de progreso general */}
            <div className="learning-progress">
              <ProgressBar progress={completedCount} total={totalModules} />
              <span>
                {completedCount} de {totalModules} módulos completados
              </span>
            </div>

            {/* Módulos de aprendizaje */}
            <div className="modules-grid">
              {learningModules.map(module => (
                <LearningModuleCard
                  key={module.id}
                  module={module}
                  completed={completedModules.includes(module.id)}
                  onComplete={handleCompleteModule}
                />
              ))}
            </div>

            {/* Certificado de finalización */}
            {completedCount === totalModules && (
              <div className="completion-card">
                <h3>🎉 ¡Felicidades!</h3>
                <p>Has completado todos los módulos de aprendizaje.</p>
                <p>Ahora tienes una base sólida en conceptos de criptomonedas.</p>
                <button className="primary-btn" onClick={downloadGuide}>
                  📜 Obtener Certificado de Finalización
                </button>
              </div>
            )}
          </section>
        )}

        {/* Sección: Detalles del Proyecto */}
        {activeSection === 'project' && (
          <section className="section-grid" id="project">
            <article className="glass-card">
              <h2>Detalles del proyecto</h2>
              <p>
                Crypto E-Duty es una plataforma open source diseñada para 
                democratizar el acceso a la educación sobre criptomonedas. 
                Combina una interfaz profesional con contenido educativo 
                de calidad, todo en un entorno seguro y sin riesgos.
              </p>
              <p>
                <strong>Objetivos principales:</strong>
              </p>
              <ul>
                <li>Ofrecer una experiencia de aprendizaje interactiva</li>
                <li>Proporcionar una wallet educativa con fondos ficticios</li>
                <li>Explicar conceptos complejos de forma sencilla</li>
                <li>Ser accesible para personas de todas las edades</li>
                <li>Mantener un diseño profesional y moderno</li>
              </ul>
            </article>

            <article className="glass-card" id="purpose">
              <h2>Propósito</h2>
              <p>
                Democratizar la comprensión básica del ecosistema cripto, 
                evitando la complejidad innecesaria. La educación en cripto 
                es importante porque el siglo 21 exige usuarios capaces de 
                reconocer riesgos, entender custodia de activos y navegar 
                tecnologías digitales con criterio.
              </p>
              <p>
                <strong>Nuestra misión:</strong> Hacer que el mundo de las 
                criptomonedas sea accesible, comprensible y seguro para todos.
              </p>
            </article>
          </section>
        )}

        {/* Sección: Wallet Educativa */}
        {activeSection === 'wallet' || activeSection === 'home' ? (
          <section className="glass-card" id="wallet">
            <h2>💼 Wallet Open Source Educativa</h2>
            <p>
              Esta billetera usa saldos ficticios y simulación de operaciones 
              para centrarse en el aprendizaje. Conserva una estética seria, 
              minimalista y profesional, ideal para una presentación técnica.
            </p>

            <div className="wallet-grid">
              <div className="wallet-box">
                <span>🏷️ Dirección</span>
                <strong>{wallet ? wallet.address : 'Aún no creada'}</strong>
              </div>
              <div className="wallet-box">
                <span>🔑 Clave privada</span>
                <strong>{wallet ? wallet.privateKey : 'Oculta por seguridad'}</strong>
              </div>
              <div className="wallet-box">
                <span>💰 Saldo ficticio</span>
                <strong>{wallet ? `${wallet.balance} EDU` : '0.0000 EDU'}</strong>
              </div>
            </div>

            <div className="form-grid">
              <input
                value={to}
                onChange={(e) => setTo(e.target.value)}
                placeholder="Dirección destino ficticia"
              />
              <input
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Monto ficticio"
                inputMode="decimal"
              />
              <button className="primary-btn" onClick={handleTransfer}>
                Simular transferencia
              </button>
            </div>

            {wallet && (
              <div className="wallet-info">
                <p>
                  <strong>📝 Historia de operaciones:</strong>
                </p>
                <ul className="transaction-list">
                  <li>Creación de wallet - {wallet.balance} EDU (saldo inicial)</li>
                  {status.includes('Operación educativa') && (
                    <li>{status}</li>
                  )}
                </ul>
              </div>
            )}
          </section>
        ) : null}

        {/* Sección: Manual de Usuario */}
        {activeSection === 'manual' && (
          <section className="glass-card" id="manual">
            <h2>📖 Manual de Usuario</h2>
            <p>
              <strong>Instrucciones rápidas:</strong>
            </p>
            <ol className="manual-steps">
              <li>
                <strong>Crea una wallet educativa</strong> - Haz clic en el botón 
                "Crear wallet educativa" para generar una wallet con fondos ficticios.
              </li>
              <li>
                <strong>Revisa tu saldo</strong> - Observa tu dirección, clave privada 
                y saldo en la sección de wallet.
              </li>
              <li>
                <strong>Simula una operación</strong> - Ingresa una dirección de 
                destino y un monto para simular una transferencia.
              </li>
              <li>
                <strong>Aprende conceptos</strong> - Explora la ruta de aprendizaje 
                para entender los fundamentos.
              </li>
              <li>
                <strong>Descarga la guía</strong> - Obtén la guía completa en PDF 
                para aprendizaje offline.
              </li>
            </ol>
            
            <div className="manual-actions">
              <button className="primary-btn" onClick={downloadGuide}>
                📥 Descargar Manual Completo (PDF)
              </button>
              <button 
                className="secondary-btn" 
                onClick={() => setActiveSection('learning')}
              >
                Ver Ruta de Aprendizaje
              </button>
            </div>

            {/* FAQ */}
            <div className="faq-section">
              <h3>❓ Preguntas Frecuentes</h3>
              <div className="faq-grid">
                {faqItems.map((faq, i) => (
                  <div key={i} className="faq-item">
                    <h4>{faq.question}</h4>
                    <p>{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Sección: Tecnología Usada */}
        {activeSection === 'tech' && (
          <section className="glass-card" id="tech">
            <h2>🛠️ Tecnología Usada</h2>
            <SupportSection />
            
            <div className="tech-details">
              <article>
                <h3>Frontend</h3>
                <ul>
                  <li><strong>React 18:</strong> Biblioteca para construir interfaces de usuario</li>
                  <li><strong>Vite:</strong> Herramienta de construcción rápida</li>
                  <li><strong>CSS3:</strong> Estilos modernos con variables CSS</li>
                  <li><strong>HTML5:</strong> Estructura semántica</li>
                </ul>
              </article>

              <article>
                <h3>Características Técnicas</h3>
                <ul>
                  <li><strong>Responsive Design:</strong> Adapta a móvil, tablet y escritorio</li>
                  <li><strong>Modo Día/Noche:</strong> Toggle de tema con CSS variables</li>
                  <li><strong>Componentes Reutilizables:</strong> Arquitectura modular</li>
                  <li><strong>State Management:</strong> React hooks (useState, useContext)</li>
                  <li><strong>GitHub Pages:</strong> Despliegue automático</li>
                </ul>
              </article>

              <article>
                <h3>Estructura del Proyecto</h3>
                <pre className="project-structure">
{`cryptoeduty_project/
├── src/
│   ├── components/
│   │   ├── ThemeToggle.jsx
│   │   ├── ProgressBar.jsx
│   │   └── ...
│   ├── context/
│   │   └── content.jsx
│   ├── data/
│   │   ├── srcdatacontent.js
│   │   └── learningPath.js
│   ├── wallet/
│   │   └── srcwalletDemo.js
│   ├── srcApp.jsx
│   ├── srcmain.jsx
│   └── srcstyles.css
├── package.json
├── vite.config.js
└── index.html`}
                </pre>
              </article>
            </div>
          </section>
        )}

        {/* Sección: Biografía */}
        {activeSection === 'bio' && (
          <section className="glass-card" id="bio">
            <h2>👨‍💻 Biografía del Creador</h2>
            <p>{creatorBio.summary}</p>
            <p>{creatorBio.mediumTermGoal}</p>
            
            <div className="bio-details">
              <h3>Motivación</h3>
              <p>
                Este proyecto nació de la necesidad de tener una herramienta 
                educativa accesible que permitiera a las personas aprender sobre 
                criptomonedas sin el miedo a perder dinero real. Quería crear 
                algo que yo mismo hubiera deseado tener cuando empecé a aprender 
                sobre este fascinante mundo.
              </p>
            </div>
          </section>
        )}

        {/* Sección: Newsletter */}
        <section className="glass-card newsletter">
          <h2>📧 Registro de Correo</h2>
          <p>Recibe novedades del proyecto, actualizaciones y futuras mejoras.</p>
          <form onSubmit={handleNewsletter} className="newsletter-form">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="juansin0611@gmail.com"
            />
            <button className="primary-btn" type="submit">
              Registrar
            </button>
          </form>
        </section>

        {/* Sección: Novedades Crypto 2026 */}
        <section className="section-grid">
          <article className="glass-card">
            <h2>💡 Tips del mundo cripto</h2>
            <ul className="styled-list">
              {cryptoTips.map((tip, i) => (
                <li key={i}>{tip}</li>
              ))}
            </ul>
          </article>

          <article className="glass-card">
            <h2>📰 Novedades del mundo crypto 2026</h2>
            <ul className="styled-list">
              {cryptoNews2026.map((news, i) => (
                <li key={i}>{news}</li>
              ))}
            </ul>
          </article>
        </section>

        {/* Status Banner */}
        {status && (
          <div className="status-banner">
            {status}
          </div>
        )}

        {/* Footer */}
        <footer className="footer">
          <p>
            2026 • Licencia MIT • Proyecto open source para aprendizaje 
            y exploración responsable.
          </p>
          <p>
            Aprender con disciplina hoy construye mejores oportunidades mañana.
          </p>
          <div className="footer-links">
            <a href="https://github.com/JuansinJcy/cryptoeduty_project" target="_blank">
              GitHub
            </a>
            <span>•</span>
            <a href="#">Política de Privacidad</a>
            <span>•</span>
            <a href="#">Términos de Uso</a>
          </div>
        </footer>
      </main>
    </div>
  )
}

// ==================== EXPORTACIÓN PRINCIPAL ====================
function Root() {
  return (
    <ThemeProvider>
      <App />
    </ThemeProvider>
  )
}

export default Root
