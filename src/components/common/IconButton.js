/**
 * IconButton Component
 * 
 * Este componente es un botón (`Button`) que integra un ícono de FontAwesome junto al texto. Permite posicionar el ícono 
 * a la izquierda, derecha o en el centro, ofreciendo flexibilidad para la disposición de contenido.
 * 
 * Propiedades:
 * - `icon`: Ícono de FontAwesome (obligatorio), puede ser una cadena o un array para especificar el icono.
 * - `iconAlign`: Controla la alineación del ícono (`left`, `right`, `middle`).
 * - `iconClassName`: Clase CSS adicional para personalizar el estilo del ícono.
 * - `transform`: Define transformaciones aplicadas al ícono, como rotación o escalado (e.g., `"rotate-90"`).
 * - `children`: Contenido adicional del botón, generalmente un texto.
 * - `...rest`: Cualquier otra propiedad de `Button` de React Bootstrap que se aplique al componente.
 * 
 * Ejemplo de uso:
 * ```jsx
 * <IconButton icon="coffee" variant="primary" iconAlign="left">
 *   Click aquí
 * </IconButton>
 * ```
 */

import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const IconButton = forwardRef(
  (
    { icon, iconAlign = 'left', iconClassName, transform, children, ...rest },
    ref
  ) => (
    <Button {...rest} ref={ref}>
      {iconAlign === 'right' && children}
      <FontAwesomeIcon
        icon={icon}
        className={classNames(iconClassName, {
          'me-1': children && iconAlign === 'left',
          'ms-1': children && iconAlign === 'right'
        })}
        transform={transform}
      />
      {iconAlign === 'left' || iconAlign === 'middle' ? children : false}
    </Button>
  )
);

IconButton.propTypes = {
  ...Button.propTypes,
  icon: PropTypes.oneOfType([PropTypes.string, PropTypes.array]).isRequired,
  children: PropTypes.any,
  iconAlign: PropTypes.oneOf(['left', 'right', 'middle']),
  iconClassName: PropTypes.string,
  transform: PropTypes.string
};

export default IconButton;
