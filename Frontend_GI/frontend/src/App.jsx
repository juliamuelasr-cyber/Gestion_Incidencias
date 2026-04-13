import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom'
import { useState, useEffect } from 'react'
import IncidentList from './pages/IncidentList'
import IncidentDetail from './pages/IncidentDetail'
import IncidentForm from './pages/IncidentForm'
import Login from './components/Login'
import NavBar from './components/NavBar'
import kyoImg from './assets/Kyocera_logo.svg.png'
import './App.css'

function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  return (
    <div className="app-layout">
      {sidebarOpen ? <aside className="sidebar"><NavBar /></aside> : <aside className="sidebar-mini"></aside>}
      <div className="main-area">
        <header className="hero">
          <button className="toggle-btn" onClick={() => setSidebarOpen(!sidebarOpen)}>☰</button>
          <img src={kyoImg} className="base" alt="Kyocera Logo" />
          <h1>Gestión de Incidencias</h1>
        </header>
        <main className="main-content">
          <div className="page-wrapper"><Outlet /></div>
        </main>
      </div>
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