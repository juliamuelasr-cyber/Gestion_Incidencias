import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MessageSquareText, CalendarClock, History, User2, ArrowLeft, ShieldAlert } from 'lucide-react';

export default function IncidentDetail({ incidents, setIncidents }) {
  const { id } = useParams();
  const [newComment, setNewComment] = useState('');
  const incident = incidents.find(inc => inc.id === parseInt(id));

  const addComment = () => {
    if (!newComment.trim()) return;
    const updated = incidents.map(inc => 
      inc.id === incident.id ? { ...inc, comments: [...(inc.comments || []), { text: newComment, date: new Date().toLocaleString() }] } : inc
    );
    setIncidents(updated);
    setNewComment('');
  };

  if (!incident) return <p>Incidencia no encontrada.</p>;

  return (
    <div style={{ textAlign: 'left', maxWidth: '700px', margin: '0 auto' }}>
      <div style={{ border: '1px solid #ddd', padding: '30px', borderRadius: '16px', background: '#fff', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
          <h2 style={{ margin: 0 }}>{incident.title}</h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#e60012', fontSize: '13px', fontWeight: 'bold' }}>
            <ShieldAlert size={16} /> Límite: {incident.FechaLimite}
          </div>
        </div>

        <p style={{ color: '#444', lineHeight: '1.6' }}>{incident.description}</p>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '20px', color: '#666' }}>
          <User2 size={18} /> <strong>Técnico asignado:</strong> {incident.assignedUser || 'Pendiente'}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginTop: '25px', padding: '15px', background: '#f8f9fa', borderRadius: '10px' }}>
          <div style={{ fontSize: '12px', color: '#777', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <CalendarClock size={14} /> Creada: {incident.FechaCreacion}
          </div>
          <div style={{ fontSize: '12px', color: '#777', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <History size={14} /> Actualizada: {incident.FechaActualizacion}
          </div>
        </div>

        <hr style={{ margin: '30px 0', border: 'none', borderTop: '1px solid #eee' }} />
        
        <h4 style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <MessageSquareText size={20} color="var(--kyocera-red)" /> Historial de Comentarios
        </h4>

        <div style={{ maxHeight: '200px', overflowY: 'auto', marginBottom: '20px', padding: '10px', background: '#fafafa', borderRadius: '8px' }}>
          {incident.comments?.length > 0 ? (
            incident.comments.map((c, i) => (
              <div key={i} style={{ marginBottom: '12px', paddingBottom: '8px', borderBottom: '1px solid #f0f0f0' }}>
                <div style={{ fontSize: '11px', color: '#999', marginBottom: '4px' }}>{c.date}</div>
                <div style={{ fontSize: '13px', color: '#333' }}>{c.text}</div>
              </div>
            ))
          ) : (
            <p style={{ fontSize: '13px', color: '#999', textAlign: 'center' }}>No hay comentarios todavía.</p>
          )}
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <input 
            className="search-input" 
            style={{ flex: 1, marginBottom: 0 }} 
            value={newComment} 
            onChange={(e) => setNewComment(e.target.value)} 
            placeholder="Escribe una actualización..." 
          />
          <button onClick={addComment} className="btn-search" style={{ width: 'auto' }}>Enviar</button>
        </div>
      </div>

      <div style={{ marginTop: '25px', display: 'flex', justifyContent: 'center' }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none', color: '#666', fontWeight: 'bold' }}>
          <ArrowLeft size={18} /> Volver al listado principal
        </Link>
      </div>
    </div>
  );
}