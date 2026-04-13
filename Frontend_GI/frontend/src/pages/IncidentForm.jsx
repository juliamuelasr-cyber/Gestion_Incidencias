import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Save } from 'lucide-react';
import Swal from 'sweetalert2';

export default function IncidentForm({ onAdd, incidents = [], setIncidents }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ 
    title: '', 
    description: '', 
    status: 'abierta', 
    priority: 'media', 
    assignedUser: '', 
    FechaLimite: '' 
  });

  useEffect(() => {
    if (id) {
      const existing = incidents.find(inc => inc.id === parseInt(id));
      if (existing) setFormData(existing);
    }
  }, [id, incidents]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const now = new Date().toLocaleString();

    if (id) {
      setIncidents(incidents.map(inc => inc.id === parseInt(id) ? { ...formData, FechaActualizacion: now } : inc));
      Swal.fire({ icon: 'success', title: 'Actualizado', confirmButtonColor: 'var(--kyocera-red)' }).then(() => navigate('/'));
    } else {
      onAdd({ ...formData, id: Date.now(), FechaCreacion: now, FechaActualizacion: now, comments: [] });
      Swal.fire({ icon: 'success', title: '¡Creada!', confirmButtonColor: 'var(--kyocera-red)' }).then(() => navigate('/'));
    }
  };

  return (
    <div style={{ maxWidth: '500px', margin: '0 auto', textAlign: 'left' }}>
      <h2>{id ? 'Editar Incidencia' : 'Nueva Incidencia'}</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        
        {/* CAMPOS PARA NUEVA INCIDENCIA */}
        {!id && (
          <>
            <label>Título:</label>
            <input className="search-input" type="text" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} required />
            <label>Fecha Límite:</label>
            <input className="search-input" type="date" value={formData.FechaLimite} onChange={(e) => setFormData({...formData, FechaLimite: e.target.value})} required />
          </>
        )}

        <label>Descripción:</label>
        <textarea className="search-input" value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} required rows="4" />

        {/* CAMPO DE USUARIO ASIGNADO (Añadido aquí para que funcione) */}
        <label>Usuario Asignado:</label>
        <input 
          className="search-input" 
          type="text" 
          placeholder="Nombre del técnico..."
          value={formData.assignedUser} 
          onChange={(e) => setFormData({...formData, assignedUser: e.target.value})} 
        />

        <label>Prioridad:</label>
        <select className="search-input" value={formData.priority} onChange={(e) => setFormData({...formData, priority: e.target.value})}>
          <option value="baja">Baja</option>
          <option value="media">Media</option>
          <option value="alta">Alta</option>
          <option value="critica">Crítica</option>
        </select>

        {/* CAMPOS SOLO PARA EDICIÓN */}
        {id && (
          <>
            <label>Estado:</label>
            <select className="search-input" value={formData.status} onChange={(e) => setFormData({...formData, status: e.target.value})}>
              <option value="abierta">Abierta</option>
              <option value="en proceso">En proceso</option>
              <option value="resuelta">Resuelta</option>
              <option value="cerrada">Cerrada</option>
            </select>
          </>
        )}

        <button type="submit" className="btn-search" style={{ justifyContent: 'center' }}>
          <Save size={18}/> {id ? 'Guardar Cambios' : 'Registrar'}
        </button>
      </form>
    </div>
  );
}