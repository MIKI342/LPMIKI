import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import logoutImg from 'assets/img/icons/spot-illustrations/45.png'; // Asegúrate de que la ruta sea correcta

const LogoutContent = ({ layout, titleTag: TitleTag }) => {
  return (
    <>
      <img
        className="d-block mx-auto mb-4" // Estilos para centrar la imagen
        src={logoutImg} // Ruta de la imagen de cierre de sesión
        alt="shield" // Texto alternativo para la imagen
        width={100} // Ancho de la imagen
      />
      <TitleTag>¡Hasta pronto!</TitleTag> {/* Título visible para el usuario */}
      <p>
        Gracias por usar la aplicación. Ahora estás <br className="d-none d-sm-block" />
        desconectado con éxito. {/* Mensaje de éxito de cierre de sesión */}
      </p>
      <Button
        as={Link} // El botón se comporta como un enlace
        variant="primary" // Corregido a variant para usar correctamente con Bootstrap
        size="sm" // Tamaño del botón
        className="mt-3" // Clase de Bootstrap para margen superior
        to={`/authentication/${layout}/login`} // Ruta a la página de inicio de sesión
      >
        <FontAwesomeIcon
          icon="chevron-left" // Ícono de FontAwesome
          transform="shrink-4 down-1" // Transformación del ícono
          className="me-1" // Clase para margen a la derecha del ícono
        />
        Regresar a iniciar sesión {/* Texto del botón */}
      </Button>
    </>
  );
};

LogoutContent.propTypes = {
  layout: PropTypes.string, // Propiedad para definir el diseño
  titleTag: PropTypes.elementType, // Cambiado a elementType para usar como componente
};

LogoutContent.defaultProps = {
  layout: 'simple', // Valor predeterminado para la propiedad layout
  titleTag: 'h4', // Valor predeterminado para la propiedad titleTag
};

export default LogoutContent;
