import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom'
import IncidentList from './pages/IncidentList'
import IncidentDetail from './pages/IncidentDetail'
import IncidentForm from './pages/IncidentForm'
import Login from './components/Login'
import NavBar from './components/NavBar'
import kyoImg from './assets/Kyocera_logo.svg.png'
import './App.css'

/* =========================
   LAYOUT PRINCIPAL (SIDEBAR + HEADER)
========================= */
function AppLayout() {
  return (
    <div className="app-layout">

      {/* SIDEBAR */}
      <aside className="sidebar">
        <NavBar />
      </aside>

      {/* CONTENIDO PRINCIPAL */}
      <div className="main-area">

        {/* HEADER */}
        <header className="hero">
          <img src={kyoImg} className="base" alt="Kyocera Logo" />
          <h1>Gestión de Incidencias</h1>
        </header>

        {/* PÁGINAS */}
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
   APP ROUTER
========================= */
function App() {
  return (
    <Router>
      <Routes>

        {/* LOGIN SIN SIDEBAR */}
        <Route path="/login" element={<Login />} />

        {/* APP CON SIDEBAR + HEADER */}
        <Route element={<AppLayout />}>
          <Route path="/" element={<IncidentList />} />
          <Route path="/crear" element={<IncidentForm />} />
          <Route path="/editar/:id" element={<IncidentForm />} />
          <Route path="/incidencia/:id" element={<IncidentDetail />} />
        </Route>

      </Routes>
    </Router>
  )
}

export default App