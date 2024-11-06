/**
 * SubtleBadge Component
 * 
 * Este componente muestra una insignia (`badge`) de estilo sutil con colores de fondo personalizables, 
 * además de la opción de redondear sus bordes (`pill`).
 * 
 * Propiedades:
 * - `bg`: Define el color de fondo de la insignia usando clases de Bootstrap (e.g., `primary`, `success`).
 * - `pill`: Booleano que, si es `true`, aplica un estilo redondeado (`rounded-pill`) a la insignia.
 * - `children`: Contenido que se muestra dentro de la insignia.
 * - `className`: Clase CSS adicional para personalizar la insignia.
 * 
 * Ejemplo de uso:
 * ```jsx
 * <SubtleBadge bg="success" pill>
 *   Activo
 * </SubtleBadge>
 * ```
 */

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const SubtleBadge = ({ bg = 'primary', pill, children, className }) => {
  return (
    <div
      className={classNames(className, `badge badge-subtle-${bg}`, {
        'rounded-pill': pill
      })}
    >
      {children}
    </div>
  );
};

SubtleBadge.propTypes = {
  bg: PropTypes.oneOf([
    'primary',
    'secondary',
    'success',
    'info',
    'warning',
    'danger',
    'light',
    'dark'
  ]),
  pill: PropTypes.bool,
  children: PropTypes.node,
  className: PropTypes.string
};

export default SubtleBadge;
