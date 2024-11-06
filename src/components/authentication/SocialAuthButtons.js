// Componente SocialAuthButtons: Proporciona botones de autenticación social para registrarse o iniciar sesión usando Google o Facebook.

import React from 'react'; // Importa React
import { Form, Button, Col, Row } from 'react-bootstrap'; // Importa componentes de Bootstrap
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Importa iconos de FontAwesome

const SocialAuthButtons = () => (
  <Form.Group className="mb-0"> {/* Grupo para los botones de autenticación social */}
    <Row> {/* Fila para organizar los botones */}
      <Col sm={6} className="pe-sm-1"> {/* Columna para el botón de Google */}
        <Button
          variant="" // Variantes de botón vacías para personalización
          size="sm" // Tamaño pequeño
          className="btn-outline-google-plus mt-2 w-100" // Clases personalizadas para estilo
        >
          <FontAwesomeIcon
            icon={['fab', 'google-plus-g']} // Icono de Google
            transform="grow-8" // Efecto de crecimiento en el icono
            className="me-2" // Margen a la derecha
          />{' '}
          google {/* Texto del botón */}
        </Button>
      </Col>
      <Col sm={6} className="ps-sm-1"> {/* Columna para el botón de Facebook */}
        <Button
          variant="" // Variantes de botón vacías para personalización
          size="sm" // Tamaño pequeño
          className="btn-outline-facebook mt-2 w-100" // Clases personalizadas para estilo
        >
          <FontAwesomeIcon
            icon={['fab', 'facebook-square']} // Icono de Facebook
            transform="grow-8" // Efecto de crecimiento en el icono
            className="me-2" // Margen a la derecha
          />{' '}
          facebook {/* Texto del botón */}
        </Button>
      </Col>
    </Row>
  </Form.Group>
);

export default SocialAuthButtons; // Exporta el componente
