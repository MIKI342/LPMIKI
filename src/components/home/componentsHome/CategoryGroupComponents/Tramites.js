import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import folderPaths from 'data/imagePaths'; // Ajusta la ruta según la ubicación real
import CategoryHeader from 'components/home/componentsHome/CategoryProductsComponents/CategoryHeader'; // Ajusta la ruta según la ubicación real
import useContactNumbers from 'hooks/useContactNumbers'; // Ajusta la ruta según la ubicación real

const Tramites = () => {
  const { getContactNumberByCategory } = useContactNumbers();
  const contactNumber = getContactNumberByCategory('Trámites');

  return (
    <Container className="my-4">
      {/* Integración del componente CategoryHeader */}
      <CategoryHeader category="Trámites" contact={contactNumber} />

      <Row>
        {folderPaths.map((tramite) => (
          <Col key={tramite.path} md={6} lg={4} className="mb-4">
            <Card className="tramite-card h-100">
              {/* Ruta actualizada para las imágenes */}
              <Card.Img
                variant="top"
                src={`/img/tramites/${tramite.path}/${tramite.images[0]}`} // Ruta actualizada
                alt={tramite.nombre}
                className="tramite-image"
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
    </Container>
  );
};

export default Tramites;
