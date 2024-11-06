/**
 * Logo Component
 * 
 * Este componente muestra el logotipo de la aplicación, con opciones de estilo y tamaño específicos según el 
 * contexto donde se utilice (en la barra de navegación vertical, barra superior o en la sección de autenticación).
 * 
 * Propiedades:
 * - `at`: Define el contexto donde se muestra el logo (`navbar-vertical`, `navbar-top`, `auth`), aplicando estilos específicos.
 * - `width`: Controla el ancho de la imagen del logo.
 * - `className`: Clase CSS adicional para personalizar el contenedor del logo.
 * - `textClass`: Clase CSS adicional para el texto que pueda acompañar el logo.
 * 
 * Ejemplo de uso:
 * ```jsx
 * <Logo at="navbar-top" width={120} className="custom-logo-class" />
 * ```
 */

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Logo = ({ at, width, className, textClass }) => {
  const logoSrc = `${process.env.PUBLIC_URL}/img/logo.png`;  // Usar process.env.PUBLIC_URL para acceder a 'public'

  return (
    <div
      className={classNames(
        'd-flex logo-container',
        {
          'align-items-center py-3': at === 'navbar-vertical',
          'align-items-center': at === 'navbar-top',
          'flex-center fw-bolder fs-4 mb-4': at === 'auth'
        },
        className,
        'text-decoration-none'
      )}
    >
      <img className="me-2" src={logoSrc} alt="Logo" width={width} />
    </div>
  );
};

Logo.propTypes = {
  at: PropTypes.oneOf(['navbar-vertical', 'navbar-top', 'auth']),
  width: PropTypes.number,
  className: PropTypes.string,
  textClass: PropTypes.string
};

Logo.defaultProps = {
  at: 'auth',
  width: 100
};

export default Logo;
