/**
 * Flex Component
 * 
 * Este componente facilita la creación de un contenedor flexible utilizando clases de Bootstrap para `display: flex`.
 * Permite personalizar la alineación, dirección, envoltura y otros estilos de flexbox a través de propiedades, 
 * generando clases dinámicamente.
 * 
 * Propiedades:
 * - `justifyContent`: Define la alineación horizontal de los elementos (`start`, `center`, `between`, etc.).
 * - `alignItems`: Define la alineación vertical de los elementos (`start`, `center`, `end`, etc.).
 * - `alignContent`: Ajusta la alineación de múltiples líneas dentro del contenedor flexible.
 * - `inline`: Booleano para cambiar entre `inline-flex` y `flex`.
 * - `wrap`: Define la envoltura (`nowrap`, `wrap`, `wrap-reverse`).
 * - `className`: Clases CSS adicionales para personalización.
 * - `tag`: Etiqueta HTML que se renderizará (por defecto es `div`).
 * - `breakpoint`: Punto de quiebre para aplicar clases de Bootstrap (e.g., `sm`, `md`).
 * - `direction`: Dirección de flex (`row`, `column`, `row-reverse`, `column-reverse`).
 * - `children`: Contenido del contenedor.
 * 
 * Ejemplo de uso:
 * ```jsx
 * <Flex justifyContent="center" alignItems="center" wrap="wrap" direction="row">
 *   <div>Elemento 1</div>
 *   <div>Elemento 2</div>
 * </Flex>
 * ```
 */

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Flex = ({
  justifyContent,
  alignItems,
  alignContent,
  inline,
  wrap,
  className,
  tag: Tag = 'div',
  children,
  breakpoint,
  direction,
  ...rest
}) => {
  return (
    <Tag
      className={classNames(
        {
          [`d-${breakpoint ? breakpoint + '-' : ''}flex`]: !inline,
          [`d-${breakpoint ? breakpoint + '-' : ''}inline-flex`]: inline,
          [`flex-${direction}`]: direction,
          [`justify-content-${justifyContent}`]: justifyContent,
          [`align-items-${alignItems}`]: alignItems,
          [`align-content-${alignContent}`]: alignContent,
          [`flex-${wrap}`]: wrap
        },
        className
      )}
      {...rest}
    >
      {children}
    </Tag>
  );
};

Flex.propTypes = {
  children: PropTypes.node.isRequired,
  justifyContent: PropTypes.string,
  inline: PropTypes.bool,
  alignItems: PropTypes.string,
  alignContent: PropTypes.string,
  wrap: PropTypes.string,
  className: PropTypes.string,
  tag: PropTypes.string,
  breakpoint: PropTypes.string,
  direction: PropTypes.string
};

export default Flex;
