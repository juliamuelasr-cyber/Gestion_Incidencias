import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom'
import { useState, useEffect } from 'react'

import IncidentList from './pages/IncidentList'
import IncidentDetail from './pages/IncidentDetail'
import IncidentForm from './pages/IncidentForm'
import Login from './components/Login'
import NavBar from './components/NavBar'

import kyoImg from './assets/Kyocera_logo.svg.png'
import './App.css'

/* =========================
    LAYOUT PRINCIPAL (Sin cambios de estilo)
========================= */
function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <div className="app-layout">
      {sidebarOpen ? (
        <aside className="sidebar">
          <NavBar />
        </aside>
      ) : (
        <aside className="sidebar-mini"></aside>
      )}

      <div className="main-area">
        <header className="hero">
          <button
            className="toggle-btn"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            ☰
          </button>
          <img src={kyoImg} className="base" alt="Kyocera Logo" />
          <h1>Gestión de Incidencias</h1>
        </header>

        <main className="main-content">
          <div className="page-wrapper">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}

/* =========================
    APP ROUTER con LocalStorage
========================= */
function App() {
  // Cargamos las incidencias del localStorage al iniciar, si no hay nada, empezamos con lista vacía
  const [incidents, setIncidents] = useState(() => {
    const savedIncidents = localStorage.getItem('mis_incidencias');
    return savedIncidents ? JSON.parse(savedIncidents) : [];
  });

  // Cada vez que la lista de incidencias cambie, la guardamos en el localStorage
  useEffect(() => {
    localStorage.setItem('mis_incidencias', JSON.stringify(incidents));
  }, [incidents]);

  const addIncident = (newInc) => {
    setIncidents([...incidents, newInc]);
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route element={<AppLayout />}>
          <Route 
            path="/" 
            element={<IncidentList incidents={incidents} setIncidents={setIncidents} />} 
          />
          <Route 
            path="/crear" 
            element={<IncidentForm onAdd={addIncident} />} 
          />
          <Route 
            path="/editar/:id" 
            element={<IncidentForm incidents={incidents} setIncidents={setIncidents} />} 
          />
          <Route 
            path="/incidencia/:id" 
            element={<IncidentDetail incidents={incidents} />} 
          />
        </Route>
      </Routes>
    </Router>
  )
}

export default App