// Componente ConfirmMailContent: Muestra un mensaje que indica al usuario que debe revisar su correo electrónico
// para restablecer su contraseña. Incluye un botón para regresar a la página de inicio de sesión.

import React from 'react';
import PropTypes from 'prop-types'; // Para validar los tipos de las propiedades
import { Button } from 'react-bootstrap'; // Componente de botón de Bootstrap
import { Link } from 'react-router-dom'; // Para enlaces de navegación
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Para íconos de Font Awesome
import envelope from 'assets/img/icons/spot-illustrations/16.png'; // Imagen de ilustración

const ConfirmMailContent = ({ email, layout, titleTag: TitleTag }) => (
  <>
    <img
      className="d-block mx-auto mb-4" // Clases para centrar la imagen y agregar margen inferior
      src={envelope} // Imagen que representa el correo enviado
      alt="sent" // Texto alternativo para la imagen
      width={100} // Ancho de la imagen
    />
    <TitleTag>¡Por favor, revisa tu correo electrónico!</TitleTag> {/* Título que indica al usuario que debe revisar su correo */}
    <p>
      Se ha enviado un correo electrónico a <strong>{email}</strong>. Por favor, haz clic en el enlace incluido para restablecer tu contraseña. {/* Mensaje informativo */}
    </p>
    <Button
      as={Link} // Define el botón como un enlace
      color="primary" // Color del botón
      size="sm" // Tamaño del botón
      className="mt-3" // Margen superior
      to={`/authentication/${layout}/login`} // Ruta de navegación al inicio de sesión
    >
      <FontAwesomeIcon
        icon="chevron-left" // Ícono de flecha izquierda
        transform="shrink-4 down-1" // Transformación del ícono
        className="me-1" // Margen derecho
      />
      Regresar a inicio de sesión {/* Texto del botón */}
    </Button>
  </>
);

ConfirmMailContent.propTypes = {
  email: PropTypes.string.isRequired, // Propiedad obligatoria para el correo electrónico
  layout: PropTypes.string, // Propiedad opcional para el diseño
  titleTag: PropTypes.string // Propiedad opcional para la etiqueta del título
};

ConfirmMailContent.defaultProps = { 
  layout: 'simple', // Valor predeterminado para la propiedad layout
  titleTag: 'h4' // Valor predeterminado para la etiqueta del título
};

export default ConfirmMailContent;
