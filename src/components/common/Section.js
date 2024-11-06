/**
 * Section Component
 * 
 * Este componente representa una sección de la página con opciones flexibles de fondo, 
 * incluyendo imagen, video, y superposición (overlay). Utiliza el contenedor `Container` de Bootstrap para 
 * organizar su contenido y permite definir si el contenedor debe ser fluido o no.
 * 
 * Propiedades:
 * - `fluid`: Booleano que define si el contenedor `Container` de Bootstrap debe ser fluido.
 * - `bg`: Clase CSS para el color de fondo de Bootstrap (e.g., `primary`, `secondary`).
 * - `image`: Ruta de la imagen de fondo de la sección.
 * - `overlay`: Superposición opcional sobre el fondo, puede ser un booleano o una clase de color.
 * - `position`: Posición de la imagen de fondo, como cadena (`center`) o como objeto `{ x, y }`.
 * - `video`: Array de rutas de video para reproducir en el fondo de la sección.
 * - `bgClassName`: Clase CSS adicional para personalizar el fondo.
 * - `className`: Clase CSS adicional para el contenedor principal de la sección.
 * - `children`: Contenido que se muestra dentro del contenedor `Container`.
 * 
 * Ejemplo de uso:
 * ```jsx
 * <Section
 *   fluid
 *   bg="primary"
 *   image="/path/to/image.jpg"
 *   overlay="dark"
 *   className="custom-section"
 * >
 *   <h1>Bienvenido a la Sección</h1>
 *   <p>Contenido de la sección...</p>
 * </Section>
 * ```
 */

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Background from './Background';
import { Container } from 'react-bootstrap';

const Section = ({
  fluid,
  bg,
  image,
  overlay,
  position,
  video,
  bgClassName,
  className,
  children,
  ...rest
}) => {
  const bgProps = { image, overlay, position, video };
  bgClassName && (bgProps.className = bgClassName);

  return (
    <section className={classNames({ [`bg-${bg}`]: bg }, className)} {...rest}>
      {image && <Background {...bgProps} />}
      <Container fluid={fluid}>{children}</Container>
    </section>
  );
};

Section.propTypes = {
  fluid: PropTypes.bool,
  bg: PropTypes.string,
  image: PropTypes.string,
  overlay: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  position: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      x: PropTypes.string,
      y: PropTypes.string
    })
  ]),
  video: PropTypes.array,
  bgClassName: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node
};

Section.defaultProps = {
  fluid: false
};

export default Section;
