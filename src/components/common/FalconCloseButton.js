/**
 * FalconCloseButton Component
 * 
 * Este componente muestra un botón de cierre (`CloseButton`) personalizable, con opciones para el tamaño, 
 * el color en temas oscuros, y estilos sin contorno (outline). Su apariencia cambia dinámicamente 
 * según el contexto del tema oscuro o claro de la aplicación.
 * 
 * Propiedades:
 * - `size`: Define el tamaño del botón (`'sm'` o `'lg'`).
 * - `onClick`: Función que se ejecuta al hacer clic en el botón.
 * - `noOutline`: Booleano que, si es `true`, desactiva el contorno del botón.
 * - `variant`: Variante de color del botón; `white` es una opción útil para temas oscuros.
 * - `className`: Clase CSS adicional para personalización.
 * 
 * Ejemplo de uso:
 * ```jsx
 * <FalconCloseButton size="lg" variant="white" noOutline onClick={() => console.log("Cerrado")} />
 * ```
 */

import React from 'react';
import { useAppContext } from 'Main';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { CloseButton } from 'react-bootstrap';

const FalconCloseButton = ({
  size,
  onClick,
  noOutline,
  variant,
  className,
  ...rest
}) => {
  const {
    config: { isDark }
  } = useAppContext();
  
  return (
    <CloseButton
      variant={variant ? variant : isDark ? 'white' : undefined}
      className={classNames('btn', {
        [`btn-${size}`]: size,
        'outline-none': noOutline,
        [className]: className
      })}
      onClick={onClick && onClick}
      {...rest}
    />
  );
};

FalconCloseButton.propTypes = {
  size: PropTypes.oneOf(['sm', 'lg']),
  noOutline: PropTypes.bool,
  variant: PropTypes.string, // use 'white' for white variant
  onClick: PropTypes.func,
  className: PropTypes.string
};

export default FalconCloseButton;
