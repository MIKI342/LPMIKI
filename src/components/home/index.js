// Archivo: Ecommerce.jsx

import React from 'react';
import { Col, Row, Container } from 'react-bootstrap';
import CategoryGroup from 'components/home/componentsHome/CategoryGroupComponents/CategoryGroup';
import Bienvenida from 'components/home/componentsHome/BienvenidaComponents/Bienvenida';
import Map from 'components/home/componentsHome/Map/map';
import 'components/home/componentsHome/css/Ecommerce.css';

const Ecommerce = () => {
  return (
    <Container fluid className="px-0" style={{ maxWidth: '100vw', margin: '0' }}>
      <Row
        className="justify-content-center equal-height-row"
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
          className="mb-lg-0 equal-height-col"
          style={{
            paddingLeft: '0',
            paddingRight: '10px', // Agrega padding derecho
          }}
        >
          <div className="spacing-bienvenida-masServicios fill-height">
            <Bienvenida />
          </div>
        </Col>

        {/* Columna de CategoryGroup */}
        <Col
          xs={12}
          lg={6}
          className="mb-lg-0 equal-height-col"
          style={{
            paddingRight: '0',
            paddingLeft: '10px', // Agrega padding izquierdo
          }}
        >
          <div className="spacing-categoryGroup-map fill-height">
            <CategoryGroup />
          </div>
        </Col>
      </Row>

      {/* Footer con Map */}
      <footer>
        <Row className="g-0 justify-content-center footer-row">
          <Col
            xs={12}
            lg={12}
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
