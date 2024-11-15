import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useRefacciones } from 'context/useRefacciones'; // Usamos el contexto de refacciones
import { Carousel, Badge, Modal } from 'react-bootstrap';

const RefaccionDetail = () => {
  const { refaccionId } = useParams();
  const { refacciones } = useRefacciones(); // Accedemos al contexto de refacciones

  const refaccion = refacciones.find((item) => item.id === refaccionId);

  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageClick = (image) => {
    setSelectedImage(image);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedImage(null);
  };

  useEffect(() => {
    const handlePopState = () => {
      if (showModal) {
        setShowModal(false);
        setSelectedImage(null);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [showModal]);

  if (!refaccion) {
    return (
      <div style={{ textAlign: 'center', padding: '2rem' }}>
        <h2>Refacción no encontrada</h2>
        <a href="/" className="btn btn-primary">Volver al inicio</a>
      </div>
    );
  }

  return (
    <div className="refaccion-detail" style={{ padding: '2rem', maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
      <img
        src={refaccion.mainImageUrl}
        alt={refaccion.nombreRefaccion}
        style={{ width: '100%', maxHeight: '500px', objectFit: 'cover', marginBottom: '1rem' }}
      />
      <h2 className="text-dark fw-bold">{refaccion.nombreRefaccion}</h2>
      <p className="text-muted fs-6 mb-3">{refaccion.descripcion}</p>
      <h3 className="text-warning fw-bold mb-3">${refaccion.precio}</h3>
      <Badge bg="info" className="mb-4">Costo</Badge>
    </div>
  );
};

export default RefaccionDetail;
