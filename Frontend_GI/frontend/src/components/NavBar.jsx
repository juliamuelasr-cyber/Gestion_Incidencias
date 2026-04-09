// src/components/NavBar.jsx
import { Link } from 'react-router-dom';

export default function NavBar() {
  return (
    <nav className="navbar">
      {/* Eliminamos el h1 de aquí porque ya lo pusimos en App.jsx */}
      <div className="nav-links">
        <Link to="/">Inicio</Link>
        <Link to="/crear">Nueva Incidencia</Link>
      </div>
    </nav>
  );
}