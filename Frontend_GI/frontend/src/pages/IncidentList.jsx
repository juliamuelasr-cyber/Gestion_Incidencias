import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Eye, Edit3, Trash2, User, Calendar } from 'lucide-react';
import Swal from 'sweetalert2';

export default function IncidentList({ incidents, setIncidents }) {
  const [tempSearch, setTempSearch] = useState('');
  const [tempStatus, setTempStatus] = useState('');
  const [tempPriority, setTempPriority] = useState(''); // Estado para prioridad
  const [activeFilters, setActiveFilters] = useState({ search: '', status: '', priority: '' });

  const handleSearch = (e) => {
    e.preventDefault();
    setActiveFilters({ search: tempSearch, status: tempStatus, priority: tempPriority });
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: '¿Borrar incidencia?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'var(--kyocera-red)',
      confirmButtonText: 'Sí, eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        setIncidents(incidents.filter(inc => inc.id !== id));
        Swal.fire('Eliminado', '', 'success');
      }
    });
  };

  const filteredIncidents = incidents.filter(inc => {
    return inc.title.toLowerCase().includes(activeFilters.search.toLowerCase()) &&
           (activeFilters.status === '' || inc.status === activeFilters.status) &&
           (activeFilters.priority === '' || inc.priority === activeFilters.priority);
  });

  const getStatusColor = (s) => ({'abierta': '#3498db', 'en proceso': '#f39c12', 'resuelta': '#2ecc71', 'cerrada': '#646464'}[s] || '#ccc');
  const getPriorityColor = (p) => ({'baja': '#2ecc71', 'media': '#f1c40f', 'alta': '#e67e22', 'critica': '#e74c3c'}[p] || '#ccc');

  return (
    <div className="incident-page">
      <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>Listado de Incidencias</h2>

      <form onSubmit={handleSearch} style={{ display: 'flex', gap: '30px', marginBottom: '30px' }}>
        <input 
          className="search-input" 
          style={{ flex: 2 }} 
          type="text" 
          placeholder="Buscar título..." 
          value={tempSearch} 
          onChange={(e) => setTempSearch(e.target.value)} 
        />
        <select 
          className="search-input" 
          style={{ flex: 1 }} 
          value={tempStatus} 
          onChange={(e) => setTempStatus(e.target.value)}
        >
          <option value="">Estados</option>
          <option value="abierta">Abierta</option>
          <option value="en proceso">En proceso</option>
          <option value="resuelta">Resuelta</option>
          <option value="cerrada">Cerrada</option>
        </select>

        {/* SELECT DE PRIORIDAD AÑADIDO PARA QUE EL FILTRO FUNCIONE */}
        <select 
          className="search-input" 
          style={{ flex: 1 }} 
          value={tempPriority} 
          onChange={(e) => setTempPriority(e.target.value)}
        >
          <option value="">Prioridades</option>
          <option value="baja">Baja</option>
          <option value="media">Media</option>
          <option value="alta">Alta</option>
          <option value="critica">Crítica</option>
        </select>

        <button type="submit" className="btn-search">
          <Search size={18}/> Buscar
        </button>
      </form>

      <div className="incident-grid">
        {filteredIncidents.map(incident => (
          <div key={incident.id} className="incident-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
              <span style={{ color: getStatusColor(incident.status), fontWeight: 'bold', textDecoration: 'underline', fontSize: '16px', padding: '4px 15px' }}>
                {incident.status.toUpperCase()}
              </span>
              <span style={{ color: getPriorityColor(incident.priority), fontWeight: 'bold', textDecoration: 'underline', fontSize: '16px', padding: '4px 15px' }}>
                {incident.priority.toUpperCase()}
              </span>
            </div>
            
            <h3>{incident.title}</h3>
            
            <p style={{ fontSize: '16px', color: '#6582f7', marginTop: '15px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '12px', padding: '3px 20px', borderRadius: '60px', background: '#cce7fa' }}>
              <User size={20}/> Asignado a: {incident.assignedUser || 'Sin asignar'}
            </p>
            <p style={{ fontSize: '16px', color: '#f76580', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '12px', padding: '3px 20px', borderRadius: '60px', background: '#f2dbfc' }}>
              <Calendar size={20}/> Fecha creación: {incident.FechaCreacion}
            </p>
            
            <div className="card-actions">
              <Link className="btn btn-detail" to={`/incidencia/${incident.id}`}>
                <Eye size={14}/> Detalle
              </Link>
              <Link className="btn btn-edit" to={`/editar/${incident.id}`}>
                <Edit3 size={14}/> Editar
              </Link>
              <button className="btn btn-danger" onClick={() => handleDelete(incident.id)}>
                <Trash2 size={14}/> Borrar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}