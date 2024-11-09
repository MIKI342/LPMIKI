/**
 * Divider Component
 * 
 * Este componente muestra una línea divisora horizontal centrada con contenido opcional en el centro, ideal 
 * para dividir secciones de contenido. El contenido (si se proporciona) aparecerá centrado sobre la línea divisoria.
 * 
 * Propiedades:
 * - `className`: Clase CSS adicional para personalizar el contenedor del divisor.
 * - `children`: Contenido que se muestra centrado sobre la línea divisoria, como texto o íconos.
 * 
 * Ejemplo de uso:
 * ```jsx
 * <Divider className="my-custom-divider">Texto en el centro</Divider>
 * ```
 */

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Divider = ({ className, children }) => (
  <div className={classNames('w-100 position-relative text-center', className)}>
    <hr className="text-300" />
    <div className="divider-content-center">{children}</div>
  </div>
);

Divider.propTypes = {
  className: PropTypes.string, // Clase CSS adicional para personalizar
  children: PropTypes.node // Contenido centrado opcional
};

export default Divider;
