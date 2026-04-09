import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default function IncidentForm() {
  const { id } = useParams(); // Si hay ID en la URL, significa que estamos editando
  const navigate = useNavigate(); // Para redirigir al usuario después de guardar
  
  // Manejo de estado del formulario
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'Pendiente'
  });
  const [loading, setLoading] = useState(!!id); // Inicializar loading en true si hay id (modo edición)

  // Si estamos en modo edición, cargamos los datos de la API
  useEffect(() => {
    if (id) {
      // Consumo de API: simulamos cargar los datos
      fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
        .then(res => res.json())
        .then(data => {
          setFormData({ 
            title: data.title, 
            description: data.body, 
            status: 'En progreso' // Simulado
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
    // Aquí harías tu llamada API real (POST para crear, PUT para editar)
    console.log("Datos a enviar:", formData);
    
    // Feedback al usuario (mensaje de éxito)
    alert(`¡Incidencia ${id ? 'editada' : 'creada'} con éxito!`);
    
    // Navegación: volver al listado
    navigate('/');
  };

  if (loading) return <p>Cargando datos de la incidencia...</p>;

  return (
    <div style={{ maxWidth: '500px', margin: '0 auto', textAlign: 'left' }}>
      <h2>{id ? 'Editar Incidencia' : 'Crear Nueva Incidencia'}</h2>
      
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
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
            <option value="Pendiente">Pendiente</option>
            <option value="En progreso">En progreso</option>
            <option value="Resuelta">Resuelta</option>
          </select>
        </div>

        <button type="submit" style={{ padding: '10px', background: 'blue', color: 'white', border: 'none', cursor: 'pointer' }}>
          {id ? 'Guardar Cambios' : 'Crear Incidencia'}
        </button>
      </form>
    </div>
  );
}