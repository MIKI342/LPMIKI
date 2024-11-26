// Tramites.js

import React, { useState } from 'react';
import { Container, Row, Col, Card, Modal } from 'react-bootstrap';
import folderPaths from 'data/imagePaths'; // Ajusta la ruta según la ubicación real
import CategoryHeader from 'components/home/componentsHome/CategoryProductsComponents/CategoryHeader'; // Ajusta la ruta según la ubicación real
import useContactNumbers from 'hooks/useContactNumbers'; // Ajusta la ruta según la ubicación real

const Tramites = () => {
  const { getContactNumberByCategory } = useContactNumbers();
  const contactNumber = getContactNumberByCategory('Trámites');

  // Estados para manejar el modal y la imagen seleccionada
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');

  // Función para manejar el clic en la imagen
  const handleImageClick = (imagePath) => {
    setSelectedImage(imagePath);
    setShowModal(true);
  };

  return (
    <Container className="my-4">
      {/* Integración del componente CategoryHeader */}
      <CategoryHeader category="Trámites" contact={contactNumber} />
  
      <Row>
        {folderPaths.map((tramite) => (
          <Col key={tramite.path} md={6} lg={4} className="mb-4">
            <Card
              className="tramite-card h-100"
              style={{
                borderRadius: '10px', // Bordes redondeados
                border: '1px solid black', // Margen negro delgado
                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', // Sombra ligera
                backgroundColor: '#F7F7F7', // Fondo de la tarjeta
              }}
            >
              {/* Ruta actualizada para las imágenes */}
              <Card.Img
                variant="top"
                src={`/img/tramites/${tramite.path}/${tramite.images[0]}`} // Ruta actualizada
                alt={tramite.nombre}
                className="tramite-image"
                onClick={() =>
                  handleImageClick(`/img/tramites/${tramite.path}/${tramite.images[0]}`)
                }
                style={{ cursor: 'pointer' }} // Cambiamos el cursor para indicar que es clickeable
              />
              <Card.Body>
                <Card.Title>{tramite.nombre}</Card.Title>
                <Card.Text>{tramite.descripcion}</Card.Text>
                <ul>
                  <li>
                    <strong>Costo:</strong> ${tramite.costo}
                  </li>
                  <li>
                    <strong>Requisitos:</strong>
                    <ul>
                      {tramite.requisitos.map((req, index) => (
                        <li key={index}>{req}</li>
                      ))}
                    </ul>
                  </li>
                </ul>
                {/* Opcional: Agregar un botón para más detalles */}
                {/* <Button variant="primary" href={`/tramite/${tramite.path}`}>
                    Más detalles
                  </Button> */}
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
  
      {/* Modal para mostrar la imagen ampliada */}
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        centered
        size="lg"
      >
        <Modal.Body className="p-0">
          <img
            src={selectedImage}
            alt="Trámite ampliado"
            className="img-fluid w-100"
          />
        </Modal.Body>
      </Modal>
    </Container>
  );
  
};

export default Tramites;
