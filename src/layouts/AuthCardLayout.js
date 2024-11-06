// AuthCardLayout.js - Componente de diseño para páginas de autenticación
// Este componente proporciona una estructura de tarjeta centrada verticalmente para las páginas de autenticación.
// Facilita la creación de interfaces de inicio de sesión, registro, o recuperación de contraseña
// al centralizar la tarjeta de autenticación en la pantalla y aplicar estilos consistentes.

// Parámetros:
// - `children`: elementos hijos que representan el contenido dentro de la tarjeta de autenticación (por ejemplo, formularios de inicio de sesión).

// Ejemplo de uso en una página de autenticación:
// ```jsx
// <AuthCardLayout>
//   <LoginForm />
// </AuthCardLayout>
// ```

import React from 'react';
import PropTypes from 'prop-types';
import { Card, Container } from 'react-bootstrap';

const AuthCardLayout = ({ children }) => {
  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Card className="p-4 shadow-sm" style={{ maxWidth: '400px', width: '100%' }}>
        {children} {/* Renderiza los elementos hijos dentro de la tarjeta */}
      </Card>
    </Container>
  );
};

AuthCardLayout.propTypes = {
  children: PropTypes.node.isRequired, // Validar que se pasen elementos hijos
};

export default AuthCardLayout;
