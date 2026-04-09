// src/components/NavBar.jsx
import { Link } from 'react-router-dom'
import './NavBar.css' // Opcional: para estilos

export default function NavBar() {
  return (
    <nav className="navbar">
      <h1>Gestión de Incidencias</h1>
      <div className="nav-links">
        <Link to="/">Inicio</Link>
        <Link to="/crear">Nueva Incidencia</Link>
        <Link to="/login">Login</Link>
      </div>
    </nav>
  )
}