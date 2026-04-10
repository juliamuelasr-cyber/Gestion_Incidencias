import { Link } from 'react-router-dom';
import './NavBar.css';
import logoMenu from '../assets/Kyocera_logo.svg.png';

export default function NavBar() {
  return (
    <nav className="sidebar">
      <div className="logo-menu">
        <img src={logoMenu} className="logo-menu" alt="Logo" />
      </div>
      <div className="nav-links">
        <Link to="/">Ver Incidencias</Link>
        <Link to="/crear">Nueva Incidencia</Link>
        <Link to="/login">Cerrar Sesión</Link>
      </div>
    </nav>
  );
}