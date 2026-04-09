import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

export default function IncidentDetail() {
  const { id } = useParams();
  const [incident, setIncident] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then(res => res.json())
      .then(data => {
        setIncident(data);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Cargando detalle...</p>;
  if (!incident) return <p>No se encontró la incidencia.</p>;

  return (
    <div style={{ textAlign: 'left', maxWidth: '600px', margin: '0 auto' }}>
      <h2>Detalle de la Incidencia #{incident.id}</h2>
      
      <div style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '8px' }}>
        <h3>{incident.title}</h3>
        <p><strong>Descripción:</strong></p>
        <p>{incident.body}</p>
        
        <p><strong>Estado:</strong> <span style={{ background: 'orange', padding: '2px 5px', borderRadius: '4px' }}>Pendiente</span></p>
      </div>

      <div style={{ marginTop: '20px' }}>
        <Link to="/" style={{ marginRight: '15px' }}>⬅ Volver al listado</Link>
        <Link to={`/editar/${incident.id}`}>✏️ Editar</Link>
      </div>
    </div>
  );
}