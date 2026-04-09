import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import IncidentList from './pages/IncidentList';
import IncidentDetail from './pages/IncidentDetail';
import IncidentForm from './pages/IncidentForm';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <nav>
          <h1>Gestión de Incidencias</h1>
          <Link to="/">Ver Incidencias</Link>
          <Link to="/crear">Nueva Incidencia</Link>
        </nav>

        <main>
          <Routes>
            <Route path="/" element={<IncidentList />} />
            <Route path="/crear" element={<IncidentForm />} />
            <Route path="/editar/:id" element={<IncidentForm />} />
            <Route path="/incidencia/:id" element={<IncidentDetail />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;