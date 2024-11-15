import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import tramiteData from 'components/home/componentsHome/MoreServices/tramites/data/tramiteData';
import { useServices } from 'context/useServices';
import { Carousel, Badge, Modal } from 'react-bootstrap';

const TramiteDetail = () => {
  const { tramiteId } = useParams();
  const { services } = useServices();

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

  const allImages = tramite.allImages || [tramite.mainImageUrl];
  const requisitos = tramite.requisitos || [];

  // Manejo unificado del precio
  const precio = tramite.costo || tramite.precio || 'No especificado';

  return (
    <div className="tramite-detail" style={{ padding: '2rem', maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
      {/* Carrusel de imágenes */}
      {allImages.length > 0 ? (
        <Carousel interval={3000} pause="hover" controls>
          {allImages.map((image, index) => (
            <Carousel.Item key={index}>
              <img
                src={image}
                alt={`${tramite.nombreServicio || tramite.nombre} ${index + 1}`}
                style={{ width: '100%', maxHeight: '500px', objectFit: 'cover', cursor: 'pointer' }}
                onClick={() => handleImageClick(image)} // Expande imagen al hacer clic
              />
            </Carousel.Item>
          ))}
        </Carousel>
      ) : (
        <p className="text-muted">No hay imágenes disponibles para este trámite.</p>
      )}

      {/* Detalles del trámite */}
      <h2 className="text-dark fw-bold mt-3">{tramite.nombreServicio || tramite.nombre}</h2>
      <p className="text-muted fs-6 mb-3">{tramite.descripcion}</p>
      <h3 className="text-warning fw-bold mb-3">${precio}</h3>

      {/* Lista de requisitos */}
      {requisitos.length > 0 ? (
        <div>
          <h5 className="text-secondary fw-bold">Requisitos:</h5>
          <ul className="list-unstyled">
            {requisitos.map((req, index) => (
              <li key={index} className="text-muted">
                <Badge bg="info" className="me-2">✔</Badge>
                {req}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p className="text-muted">No se requieren documentos adicionales para este trámite.</p>
      )}

      {/* Modal para imágenes en tamaño completo */}
      <Modal show={showModal} onHide={handleCloseModal} centered size="lg">
        <Modal.Body className="p-0">
          {selectedImage && (
            <img
              src={selectedImage}
              alt="Imagen seleccionada"
              style={{ width: '100%', maxHeight: '90vh', objectFit: 'contain' }}
            />
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default TramiteDetail;
