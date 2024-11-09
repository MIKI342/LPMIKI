/**
 * Avatar Component
 * 
 * Este componente muestra un avatar personalizado, que puede ser una imagen, ícono, iniciales de un nombre, 
 * o un emoji. Ofrece múltiples opciones de personalización para ajustar el tamaño, la forma, y el contenido del avatar.
 * 
 * Relación con otros componentes y utilidades:
 * - `Flex`: Componente auxiliar para alinear elementos de manera flexible.
 * - `isIterableArray`: Función auxiliar para verificar si `src` es un array, permitiendo mostrar un collage 
 *   de imágenes.
 * - `FontAwesomeIcon`: Muestra un ícono de FontAwesome en el avatar si se define `icon`.
 * 
 * Propiedades de `Avatar`:
 * - `size`: Define el tamaño del avatar.
 * - `rounded`: Define la forma (e.g., `circle` para bordes redondeados).
 * - `src`: Imagen o array de imágenes para el avatar.
 * - `name`: Nombre o iniciales del usuario, mostrado si no hay imagen.
 * - `emoji`: Emoji a mostrar si no se proporciona una imagen o un nombre.
 * - `className`: Clase CSS adicional para el contenedor del avatar.
 * - `mediaClass`: Clase CSS adicional para el contenido del avatar.
 * - `isExact`: Muestra el nombre completo en lugar de las iniciales.
 * - `icon`: Ícono FontAwesome a mostrar en lugar de una imagen o texto.
 * 
 * AvatarGroup Component
 * 
 * Este componente muestra un grupo de avatares, con la opción de un diseño más compacto.
 * 
 * Propiedades de `AvatarGroup`:
 * - `children`: Contenido del grupo, generalmente avatares.
 * - `className`: Clase CSS adicional para el grupo.
 * - `dense`: Muestra los avatares en una disposición compacta.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { isIterableArray } from 'helpers/utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Flex from './Flex';
import classNames from 'classnames';

const Avatar = ({
  size,
  rounded,
  src,
  name,
  emoji,
  className,
  mediaClass,
  isExact,
  icon
}) => {
  const classNames = ['avatar', `avatar-${size}`, className].join(' ');
  const mediaClasses = [
    rounded ? `rounded-${rounded}` : 'rounded',
    mediaClass
  ].join(' ');

  const getAvatar = () => {
    if (src) {
      if (isIterableArray(src)) {
        return (
          <div className={`${mediaClasses} overflow-hidden h-100 d-flex`}>
            <div className="w-50 border-right">
              <img src={src[0]} alt="" />
            </div>
            <div className="w-50 d-flex flex-column">
              <img src={src[1]} alt="" className="h-50 border-bottom" />
              <img src={src[2]} alt="" className="h-50" />
            </div>
          </div>
        );
      } else {
        return <img className={mediaClasses} src={src} alt="" />;
      }
    }

    if (name) {
      return (
        <div className={`avatar-name ${mediaClasses}`}>
          <span>{isExact ? name : name.match(/\b\w/g).join('')}</span>
        </div>
      );
    }

    if (icon) {
      return (
        <Flex className={`avatar-name ${mediaClasses}`}>
          <FontAwesomeIcon icon={icon} />
        </Flex>
      );
    }

    return (
      <div className={`avatar-emoji ${mediaClasses}`}>
        <span role="img" aria-label="Emoji">
          {emoji}
        </span>
      </div>
    );
  };

  return <div className={classNames}>{getAvatar()}</div>;
};

export const AvatarGroup = ({ children, dense, className }) => {
  return (
    <div
      className={classNames(className, 'avatar-group', {
        'avatar-group-dense': dense
      })}
    >
      {children}
    </div>
  );
};

Avatar.propTypes = {
  size: PropTypes.oneOf(['s', 'm', 'l', 'xl', '2xl', '3xl', '4xl', '5xl']),
  rounded: PropTypes.string,
  src: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
  name: PropTypes.string,
  emoji: PropTypes.string,
  className: PropTypes.string,
  mediaClass: PropTypes.string,
  isExact: PropTypes.bool,
  icon: PropTypes.string
};

Avatar.defaultProps = {
  size: 'xl',
  rounded: 'circle',
  emoji: '😊',
  isExact: false
};

AvatarGroup.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  dense: PropTypes.bool
};

export default Avatar;
