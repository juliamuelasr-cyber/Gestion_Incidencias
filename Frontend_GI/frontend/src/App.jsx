import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom'
import { useState, useEffect } from 'react'
import IncidentList from './pages/IncidentList'
import IncidentDetail from './pages/IncidentDetail'
import IncidentForm from './pages/IncidentForm'
import Login from './components/Login'
import Header from './components/Header' // <--- Importamos el Header nuevo
import './App.css'

function AppLayout() {
  return (
    <div className="app-layout">
      {/* 1. El Header ahora contiene el logo y la navegación */}
      <Header /> 
      
      <main className="main-content">
        {/* 2. El Outlet renderiza las páginas (Listado, Formulario, etc.) */}
        <div className="page-wrapper">
          <Outlet />
        </div>
      </main>
    </div>
  )
}

function App() {
  const [incidents, setIncidents] = useState(() => {
    const saved = localStorage.getItem('kyocera_incidents');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('kyocera_incidents', JSON.stringify(incidents));
  }, [incidents]);

  const addIncident = (newInc) => setIncidents([...incidents, newInc]);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<AppLayout />}>
          <Route path="/" element={<IncidentList incidents={incidents} setIncidents={setIncidents} />} />
          <Route path="/crear" element={<IncidentForm onAdd={addIncident} />} />
          <Route path="/editar/:id" element={<IncidentForm incidents={incidents} setIncidents={setIncidents} />} />
          <Route path="/incidencia/:id" element={<IncidentDetail incidents={incidents} setIncidents={setIncidents} />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App;