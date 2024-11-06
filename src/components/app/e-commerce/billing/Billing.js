// Componente Billing: Muestra la sección de facturación que incluye detalles de facturación y una tarjeta de facturación. 
// Este componente utiliza otros componentes para mostrar información relevante y también incluye una sección de preguntas frecuentes.

import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import BillingCard from './BillingCard'; // Componente que muestra la tarjeta de facturación
import BillingDetails from './BillingDetails'; // Componente que muestra los detalles de facturación
import BillingHeader from './BillingHeader'; // Componente que muestra el encabezado de la sección de facturación

const Billing = () => {
  return (
    <>
      <BillingHeader className="mb-3" /> {/* Renderiza el encabezado de facturación */}
      <Row className="g-3">
        <Col lg={8} className="pe-lg-2 mb-3">
          <Card className="h-100">
            <Card.Header>
              <h5 className="mb-0">Detalles de Facturación</h5> {/* Título de la sección de detalles de facturación */}
            </Card.Header>
            <Card.Body className="bg-body-tertiary">
              <BillingDetails /> {/* Renderiza los detalles de facturación */}
            </Card.Body>
          </Card>
        </Col>
        <Col lg={4} className="pe-lg-2 mb-3">
          <Card className="h-100">
            <Card.Header>
              <h5 className="mb-0">Facturación</h5> {/* Título de la sección de facturación */}
            </Card.Header>
            <Card.Body className="bg-body-tertiary">
              <BillingCard /> {/* Renderiza la tarjeta de facturación */}
            </Card.Body>
          </Card>
        </Col>
      </Row>
     
    </>
  );
};

Billing.propTypes = {};

export default Billing;
