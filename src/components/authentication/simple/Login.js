import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Container, Row, Col } from 'react-bootstrap';
import { FaTools } from 'react-icons/fa';

const Login = () => {
  
  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
      <Row>
        <Col>
          <Card className="text-center shadow-lg p-3">
            <Card.Body>
              <FaTools size={64} className="mb-3 text-primary" />
              <Card.Title className="mb-3">¡En Construcción!</Card.Title>
              <Card.Text>
                La funcionalidad de inicio de sesión aún está en desarrollo. 
                Estamos trabajando para traerla muy pronto.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
