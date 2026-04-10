import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function IncidentList() {
  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(res => {
        if (!res.ok) throw new Error('Error al cargar los datos');
        return res.json();
      })
      .then(data => {
        const enhanced = data.slice(0, 10).map(item => ({
          ...item,
          status: ['abierta', 'en proceso', 'resuelta', 'cerrada'][
            Math.floor(Math.random() * 4)
          ],
          priority: ['baja', 'media', 'alta', 'critica'][
            Math.floor(Math.random() * 4)
          ]
        }));

        setIncidents(enhanced);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const handleDelete = (id) => {
    if (window.confirm('¿Estás seguro de que deseas borrar esta incidencia?')) {
      setIncidents(incidents.filter(inc => inc.id !== id));
      alert('Incidencia borrada con éxito');
    }
  };

  const filteredIncidents = incidents.filter(incident =>
    incident.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status) => {
    switch (status) {
      case 'abierta': return '#3498db';
      case 'en proceso': return '#f39c12';
      case 'resuelta': return '#2ecc71';
      case 'cerrada': return '#7f8c8d';
      default: return '#ccc';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'baja': return '#2ecc71';
      case 'media': return '#f1c40f';
      case 'alta': return '#e67e22';
      case 'critica': return '#e74c3c';
      default: return '#ccc';
    }
  };

  if (loading) return <p>Cargando incidencias...</p>;
  if (error) return <p style={{ color: 'red' }}>Error: {error}</p>;

  return (
    <div className="incident-page">
      <h2>Listado de Incidencias</h2>

      {/* BUSCADOR */}
      <input
        className="search-input"
        type="text"
        placeholder="Buscar incidencias..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* GRID */}
      <div className="incident-grid">
        {filteredIncidents.map(incident => (
          <div key={incident.id} className="incident-card">

            {/* BADGES */}
            <div style={{ marginBottom: '10px' }}>
              <span
                className="badge"
                style={{ background: getStatusColor(incident.status) }}
              >
                {incident.status}
              </span>

              <span
                className="badge"
                style={{ background: getPriorityColor(incident.priority) }}
              >
                {incident.priority}
              </span>
            </div>

            {/* TÍTULO */}
            <h3>{incident.title}</h3>

            {/* ACCIONES */}
            <div style={{ marginTop: '10px' }}>
              <Link to={`/incidencia/${incident.id}`}>
                Ver detalle
              </Link>

              <button
                className="btn btn-danger"
                onClick={() => handleDelete(incident.id)}
                style={{ marginLeft: '10px' }}
              >
                Borrar
              </button>

              <Link
                className="btn btn-edit"
                to={`/editar/${incident.id}`}
                style={{ marginLeft: '10px' }}
              >
                Editar
              </Link>
            </div>
          </div>
        ))}

        {filteredIncidents.length === 0 && (
          <p>No se encontraron incidencias.</p>
        )}
      </div>
    </div>
  );
}