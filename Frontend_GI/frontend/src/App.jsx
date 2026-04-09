import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import IncidentList from './pages/IncidentList';
import IncidentDetail from './pages/IncidentDetail';
import IncidentForm from './pages/IncidentForm';
import Login from './components/Login'; // Importamos tu componente de login
import NavBar from './components/NavBar'; // Importamos tu NavBar
import './App.css';

// Este componente controla qué se muestra según la ruta
function AppContent() {
  const location = useLocation();
  
  // Si la ruta es '/login', no mostramos el NavBar
  const isLoginPage = location.pathname === '/login';

  return (
    <div className="app-container">
      {/* El título h1 ahora es global y aparecerá siempre */}
      <header>
        <h1>Gestión de Incidencias</h1>
      </header>

      {/* Solo renderiza el NavBar si NO es la página de login */}
      {!isLoginPage && <NavBar />}

      <main>
        <Routes>
          <Route path="/" element={<IncidentList />} />
          <Route path="/crear" element={<IncidentForm />} />
          <Route path="/editar/:id" element={<IncidentForm />} />
          <Route path="/incidencia/:id" element={<IncidentDetail />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </main>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;