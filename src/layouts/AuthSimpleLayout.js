// AuthSimpleLayout.js - Componente de diseño simple para páginas de autenticación
// Este componente proporciona una estructura de página para formularios de autenticación (como inicio de sesión o registro),
// centralizando la tarjeta de autenticación y aplicando el branding de la aplicación con el logotipo en la parte superior.

// Características:
// - `Logo`: el componente `Logo` renderiza el logotipo de la aplicación en la parte superior.
// - `Outlet`: espacio donde se renderizan dinámicamente los componentes de rutas de autenticación (ej. formularios de inicio de sesión o registro).

// Ejemplo de uso en configuración de rutas:
// <Route path="auth/*" element={<AuthSimpleLayout />}>

// Este diseño es ideal para aplicaciones que requieren un flujo de autenticación simple y estilizado.

import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import Logo from 'components/common/Logo';
import Section from 'components/common/Section';
import { Outlet } from 'react-router-dom';

const AuthSimpleLayout = () => {
  return (
    <Section className="py-0">
      <Row className="flex-center min-vh-100 py-6">
        <Col sm={10} md={8} lg={6} xl={5} className="col-xxl-4">
          <Logo /> {/* Renderiza el logotipo en la parte superior */}
          <Card>
            <Card.Body className="p-4 p-sm-5">
              <Outlet /> {/* Renderiza dinámicamente los componentes de autenticación */}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Section>
  );
};

export default AuthSimpleLayout;
