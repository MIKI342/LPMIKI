// TramiteDetail.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import tramiteData from 'components/home/componentsHome/MoreServices/data/tramiteData';
import { useServices } from 'context/useServices';  // Usamos el hook del contexto
import { Carousel, Badge, Modal } from 'react-bootstrap';

const TramiteDetail = () => {
  const { tramiteId } = useParams();
  const { services } = useServices(); // Usamos el hook del contexto

  const tramite =
    tramiteData.find((item) => item.id === tramiteId) ||
    services.find((item) => item.id === tramiteId);

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

  if (!tramite) {
    return (
      <div style={{ textAlign: 'center', padding: '2rem' }}>
        <h2>Trámite no encontrado</h2>
        <a href="/" className="btn btn-primary">Volver al inicio</a>
      </div>
    );
  }

  return (
    <div className="tramite-detail" style={{ padding: '2rem', maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
      <img
        src={tramite.mainImageUrl}
        alt={tramite.nombreServicio}
        style={{ width: '100%', maxHeight: '500px', objectFit: 'cover', marginBottom: '1rem' }}
      />
      <h2 className="text-dark fw-bold">{tramite.nombreServicio}</h2>
      <p className="text-muted fs-6 mb-3">{tramite.descripcion}</p>
      <h3 className="text-warning fw-bold mb-3">${tramite.precio}</h3>
      <Badge bg="info" className="mb-4">Costo</Badge>
    </div>
  );
};

export default TramiteDetail;
