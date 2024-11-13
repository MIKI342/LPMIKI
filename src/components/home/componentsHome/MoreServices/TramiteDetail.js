import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import folderPaths from 'components/home/componentsHome/MoreServices/data/imagePaths';
import { Carousel, Badge, Modal } from 'react-bootstrap';

const TramiteDetail = () => {
  const { tramiteId } = useParams();
  const tramite = folderPaths[tramiteId]; // Usar tramiteId como índice

  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageClick = (image) => {
    setSelectedImage(image);
    setShowModal(true);
    window.history.pushState(null, ''); // Añade un estado en el historial para interceptar el retroceso
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedImage(null);
    window.history.back(); // Retrocede en el historial para mantener la navegación consistente
  };

  useEffect(() => {
    // Manejador del evento de popstate para el botón de retroceso
    const handlePopState = () => {
      if (showModal) {
        setShowModal(false);
        setSelectedImage(null);
      }
    };

    // Añade el evento de popstate al montarse el componente
    window.addEventListener('popstate', handlePopState);

    // Elimina el evento al desmontar el componente
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [showModal]);

  if (!tramite) {
    return <div>Trámite no encontrado.</div>;
  }

  return (
    <div className="tramite-detail" style={{ padding: '2rem', maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
      {/* Carrusel de imágenes como cabecera */}
      <div className="mb-4">
        <Carousel>
          {tramite.images.map((image, index) => (
            <Carousel.Item key={index}>
              <img
                src={`${process.env.PUBLIC_URL}/img/tramites/${tramite.path}/${image}`}
                alt={`${tramite.nombre} - Imagen ${index + 1}`}
                style={{ width: '100%', maxHeight: '700px', objectFit: 'cover', borderRadius: '8px', cursor: 'pointer' }}
                onClick={() => handleImageClick(`${process.env.PUBLIC_URL}/img/tramites/${tramite.path}/${image}`)}
              />
            </Carousel.Item>
          ))}
        </Carousel>
      </div>

      {/* Nombre del trámite */}
      <h2 className="text-dark fw-bold">{tramite.nombre}</h2>

      {/* Descripción del trámite */}
      <p className="text-muted fs-6 mb-3">{tramite.descripcion}</p>

      {/* Precio del trámite */}
      <div className="d-flex justify-content-center align-items-center mb-3">
        <h3 className="text-warning fw-bold">${tramite.costo}</h3>
        <Badge bg="info" pill className="ms-3">
          Costo
        </Badge>
      </div>

      {/* Lista de requisitos */}
      <div className="mb-4">
        <h4 className="fw-semibold">Requisitos:</h4>
        <ul className="text-muted fs-6" style={{ listStyleType: 'none', padding: 0 }}>
          {tramite.requisitos.map((requisito, index) => (
            <li key={index}>{requisito}</li>
          ))}
        </ul>
      </div>

      {/* Botón de acción */}
      <div className="d-flex justify-content-center mt-4">
        <button
          className="btn btn-outline-primary"
          style={{ padding: '0.5rem 2rem', fontSize: '1rem' }}
        >
          Iniciar Trámite
        </button>
      </div>

      {/* Modal para expandir la imagen */}
      <Modal show={showModal} onHide={handleCloseModal} centered size="lg">
        <Modal.Body style={{ padding: 0 }}>
          <img
            src={selectedImage}
            alt="Expanded"
            style={{ width: '100%', height: 'auto' }}
          />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default TramiteDetail;
