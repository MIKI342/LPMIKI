// Archivo: Ecommerce.jsx

import React from 'react';
import { Col, Row, Container } from 'react-bootstrap';
import CategoryGroup from 'components/home/componentsHome/CategoryGroup';
import Bienvenida from 'components/home/componentsHome/Bienvenida';
import Map from 'components/home/componentsHome/Map/map';
import MasServicios from 'components/home/componentsHome/MoreServices/MasServicios';
import './Ecommerce.css'; // Asegúrate de importar tu hoja de estilos

const Ecommerce = () => {
  return (
    <Container fluid className="px-1" style={{ maxWidth: '100vw', margin: '0' }}>
      {/* Primera fila: Bienvenida a la izquierda, MasServicios y CategoryGroup a la derecha para pantallas grandes, apilados en pantallas pequeñas */}
      <Row
        className="g-0 justify-content-center"
        style={{
          margin: '0',
          padding: '0',
          width: '100%',
        }}
      >
        {/* Columna de Bienvenida */}
        <Col
          xs={12}
          lg={6}
          className="custom-margin-right mb-lg-0" // Agregar clase personalizada para márgenes en pantallas grandes
          style={{
            padding: '0',
          }}
        >
          <div className="spacing-bienvenida-masServicios">
            <Bienvenida />
          </div>
        </Col>

        {/* Columna de MasServicios y CategoryGroup */}
        <Col
          xs={12}
          lg={6}
          className="custom-margin-left mb-lg-0" // Agregar clase personalizada para márgenes en pantallas grandes
          style={{
            padding: '0',
          }}
        >
          {/* MasServicios con margen inferior reducido en pantallas pequeñas */}
          <div className="spacing-masServicios-categoryGroup">
            <MasServicios />
          </div>
          {/* CategoryGroup con margen inferior reducido en pantallas pequeñas */}
          <div className="spacing-categoryGroup-map">
            <CategoryGroup />
          </div>
        </Col>
      </Row>

      {/* Footer con Map */}
      <footer>
        <Row className="g-0 justify-content-center footer-row">
          <Col
            xs={12}
            lg={6}
            style={{
              padding: '0',
            }}
          >
            <Map />
          </Col>
        </Row>
      </footer>
    </Container>
  );
};

export default Ecommerce;
