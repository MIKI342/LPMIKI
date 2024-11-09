/**
 * Background Component
 * 
 * Este componente muestra un fondo personalizable para una sección, que puede incluir una imagen, un video de fondo, 
 * y opciones de superposición (overlay). Permite ajustar la posición de la imagen y aplicar estilos adicionales.
 * 
 * Propiedades:
 * - `image`: Ruta de la imagen de fondo (obligatorio).
 * - `overlay`: Controla la superposición, permitiendo un overlay booleano (sí/no) o un overlay específico (`'dark'`, `'light'`, etc.).
 * - `position`: Controla la posición de la imagen de fondo, puede ser una cadena (e.g., `'center'`) o un objeto `{ x, y }`.
 * - `video`: Array de rutas de video que se reproducen en bucle y sin sonido detrás del fondo.
 * - `className`: Clase CSS adicional para el contenedor.
 * - `style`: Objeto de estilos CSS personalizado.
 * 
 * Ejemplo de uso:
 * ```jsx
 * <Background 
 *   image="/path/to/image.jpg" 
 *   overlay="dark" 
 *   position={{ x: 'center', y: 'top' }} 
 *   video={['/path/to/video.mp4']} 
 * />
 * ```
 */

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Background = ({ image, overlay, position, video, className, style }) => {
  const bgStyle = { backgroundImage: `url(${image})`, ...style };
  if (typeof position === 'string') {
    bgStyle.backgroundPosition = position;
  } else if (typeof position === 'object') {
    position.x && (bgStyle.backgroundPositionX = position.x);
    position.y && (bgStyle.backgroundPositionY = position.y);
  }

  return (
    <div
      className={classNames(
        'bg-holder',
        {
          overlay: overlay,
          [`overlay-${overlay}`]: typeof overlay === 'string'
        },
        className
      )}
      style={bgStyle}
    >
      {video && (
        <video className="bg-video" autoPlay loop muted playsInline>
          {video.map((src, index) => (
            <source
              key={index}
              src={src}
              type={`video/${src.split('.').pop()}`}
            />
          ))}
        </video>
      )}
    </div>
  );
};

Background.propTypes = {
  image: PropTypes.string.isRequired,
  overlay: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  position: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      x: PropTypes.string,
      y: PropTypes.string
    })
  ]),
  video: PropTypes.array,
  className: PropTypes.string,
  style: PropTypes.object
};

export default Background;
