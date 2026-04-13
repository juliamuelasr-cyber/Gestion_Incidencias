import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2'; // Importamos SweetAlert2

export default function IncidentForm({ onAdd, incidents = [], setIncidents }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'abierta',
    priority: 'media'
  });

  const [loading, setLoading] = useState(!!id);

  useEffect(() => {
    if (id && incidents.length > 0) {
      const existingIncident = incidents.find(inc => inc.id === parseInt(id));
      if (existingIncident) {
        setFormData({
          title: existingIncident.title,
          description: existingIncident.description || existingIncident.body,
          status: existingIncident.status,
          priority: existingIncident.priority
        });
      }
      setLoading(false);
    } else if (id) {
      setLoading(false);
    }
  }, [id, incidents]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (id) {
      // LÓGICA DE EDICIÓN
      const updatedIncidents = incidents.map(inc => 
        inc.id === parseInt(id) ? { ...formData, id: parseInt(id) } : inc
      );
      setIncidents(updatedIncidents);

      // POP-UP DE EDICIÓN
      Swal.fire({
        icon: 'success',
        title: 'Incidencia actualizada',
        text: 'Los cambios se han guardado correctamente',
        confirmButtonColor: 'var(--kyocera-red)' // Usamos tu variable de color
      }).then(() => {
        navigate('/');
      });

    } else {
      // LÓGICA DE CREACIÓN
      const newIncident = {
        ...formData,
        id: Date.now(),
      };
      onAdd(newIncident);

      // POP-UP DE CREACIÓN
      Swal.fire({
        icon: 'success',
        title: '¡Registrada!',
        text: 'La nueva incidencia ha sido creada con éxito',
        confirmButtonColor: 'var(--kyocera-red)'
      }).then(() => {
        navigate('/');
      });
    }
  };

  if (loading) return <p>Cargando datos de la incidencia...</p>;

  return (
    <div style={{ maxWidth: '500px', margin: '0 auto', textAlign: 'left' }}>
      <h2>{id ? 'Editar Incidencia' : 'Crear Nueva Incidencia'}</h2>

      <form
        onSubmit={handleSubmit}
        style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}
      >
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label htmlFor="title">Título:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            style={{ padding: '8px' }}
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label htmlFor="description">Descripción:</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows="5"
            style={{ padding: '8px' }}
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label htmlFor="status">Estado:</label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            style={{ padding: '8px' }}
          >
            <option value="abierta">Abierta</option>
            <option value="en proceso">En proceso</option>
            <option value="resuelta">Resuelta</option>
            <option value="cerrada">Cerrada</option>
          </select>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label htmlFor="priority">Prioridad:</label>
          <select
            id="priority"
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            style={{ padding: '8px' }}
          >
            <option value="baja">Baja</option>
            <option value="media">Media</option>
            <option value="alta">Alta</option>
            <option value="critica">Crítica</option>
          </select>
        </div>

        <button
          type="submit"
          style={{
            padding: '10px',
            background: 'var(--kyocera-red)', // Cambiado a tu color corporativo
            color: 'white',
            border: 'none',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          {id ? 'Guardar Cambios' : 'Crear Incidencia'}
        </button>
      </form>
    </div>
  );
}