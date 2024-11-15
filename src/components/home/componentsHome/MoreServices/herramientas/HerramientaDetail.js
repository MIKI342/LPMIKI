import React from 'react';
import { useParams } from 'react-router-dom';
import { useHerramientas } from 'context/useHerramientas';
import { Badge } from 'react-bootstrap';

const HerramientaDetail = () => {
  const { herramientaId } = useParams();
  const { herramientas } = useHerramientas();

  const herramienta = herramientas.find((item) => item.id === herramientaId);

  if (!herramienta) {
    return (
      <div style={{ textAlign: 'center', padding: '2rem' }}>
        <h2>Herramienta no encontrada</h2>
        <a href="/" className="btn btn-primary">Volver al inicio</a>
      </div>
    );
  }

  return (
    <div className="herramienta-detail" style={{ padding: '2rem', maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
      <img
        src={herramienta.mainImageUrl}
        alt={herramienta.nombreHerramienta}
        style={{ width: '100%', maxHeight: '500px', objectFit: 'cover', marginBottom: '1rem' }}
      />
      <h2 className="text-dark fw-bold">{herramienta.nombreHerramienta}</h2>
      <p className="text-muted fs-6 mb-3">{herramienta.descripcion}</p>
      <h3 className="text-warning fw-bold mb-3">${herramienta.precio}</h3>
      <Badge bg="info" className="mb-4">Costo</Badge>
    </div>
  );
};

export default HerramientaDetail;
