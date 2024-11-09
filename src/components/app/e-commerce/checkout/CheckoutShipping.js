// Componente CheckoutShipping: Muestra la dirección de envío del cliente y permite seleccionar una dirección de envío para el checkout. 
// Este componente también permite agregar una nueva dirección de envío.

import IconButton from 'components/common/IconButton';
import React from 'react';
import { Card, Col, Form, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { shippingAddress } from 'data/ecommerce/checkoutData'; // Datos de direcciones de envío

const CheckoutShipping = () => {
  return (
    <Card className="mb-3">
      <Card.Header className="bg-body-tertiary">
        <Row className="flex-between-center g-2">
          <Col sm="auto">
            <h5 className="mb-0">Tu Dirección de Envío</h5> {/* Título de la sección de dirección de envío */}
          </Col>
          <Col sm="auto">
            <IconButton
              iconClassName="me-2"
              variant="falcon-default"
              size="sm"
              icon="plus"
              transform="shrink-2"
            >
              Agregar Nueva Dirección {/* Botón para agregar una nueva dirección de envío */}
            </IconButton>
          </Col>
        </Row>
      </Card.Header>
      <Card.Body>
        <Row>
          {shippingAddress.map((item, index) => (
            <Col key={item.id} md={6} className="mb-3 mb-md-0">
              <Form.Check
                type="radio"
                id={`address-${item.id}`} // ID único para cada dirección
                className="mb-0 form-check radio-select"
              >
                <Form.Check.Input
                  type="radio"
                  name="clientAddress"
                  defaultChecked={index === 0} // Marca la primera dirección como seleccionada por defecto
                />
                <Form.Check.Label className="mb-0 fw-bold d-block">
                  {item.name} {/* Nombre de la dirección */}
                  <span className="radio-select-content">
                    <span>
                      {item.street}, <br /> {item.city}, <br /> {item.state},{' '}
                      {item.zip}{' '}
                      <span className="d-block mb-0 pt-2">{item.phone}</span> {/* Información de contacto */}
                    </span>
                  </span>
                </Form.Check.Label>
                <Link to="#!" className="fs-10">
                  Editar {/* Enlace para editar la dirección */}
                </Link>
              </Form.Check>
            </Col>
          ))}
        </Row>
      </Card.Body>
    </Card>
  );
};

export default CheckoutShipping;
