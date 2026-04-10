import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default function IncidentForm() {
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
    if (id) {
      fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
        .then(res => res.json())
        .then(data => {
          setFormData({
            title: data.title,
            description: data.body,
            status: 'en proceso',
            priority: 'media'
          });
          setLoading(false);
        })
        .catch(err => console.error("Error cargando incidencia", err));
    }
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Datos a enviar:", formData);

    alert(`¡Incidencia ${id ? 'editada' : 'creada'} con éxito!`);

    navigate('/');
  };

  if (loading) return <p>Cargando datos de la incidencia...</p>;

  return (
    <div style={{ maxWidth: '500px', margin: '0 auto', textAlign: 'left' }}>
      <h2>{id ? 'Editar Incidencia' : 'Crear Nueva Incidencia'}</h2>

      <form
        onSubmit={handleSubmit}
        style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}
      >
        {/* TÍTULO */}
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

        {/* DESCRIPCIÓN */}
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

        {/* ESTADO */}
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

        {/* PRIORIDAD */}
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

        {/* BOTÓN */}
        <button
          type="submit"
          style={{
            padding: '10px',
            background: 'blue',
            color: 'white',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          {id ? 'Guardar Cambios' : 'Crear Incidencia'}
        </button>
      </form>
    </div>
  );
}