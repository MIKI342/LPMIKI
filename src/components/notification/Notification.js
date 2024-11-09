import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import createMarkup from 'helpers/createMarkup';
import Avatar from 'components/common/Avatar';

/**
 * Componente Notification para mostrar notificaciones individuales en la aplicación.
 * Incluye opciones para mostrar un avatar, emojis, tiempo de publicación y el contenido de la notificación.
 */
const Notification = ({
  avatar,         // Datos para el componente Avatar (imagen, nombre, etc.)
  time,           // Texto que indica el tiempo de la notificación
  className,      // Clases CSS adicionales
  unread,         // Indica si la notificación está sin leer
  flush,          // Controla si la notificación tiene estilo "flush" (sin relleno)
  emoji,          // Emoji opcional a mostrar junto al tiempo
  children        // Contenido principal de la notificación
}) => (
  <Link
    className={classNames(
      'notification',
      { 'notification-unread': unread, 'notification-flush': flush },
      className
    )}
    to="#!"
  >
    {/* Renderizar el avatar si está presente */}
    {avatar && (
      <div className="notification-avatar">
        <Avatar {...avatar} className="me-3" />
      </div>
    )}
    
    {/* Cuerpo de la notificación que contiene el texto y el tiempo */}
    <div className="notification-body">
      <p className="mb-1" dangerouslySetInnerHTML={createMarkup(children)} /> {/* Contenido HTML seguro */}
      
      {/* Mostrar el tiempo y el emoji (si existe) */}
      <span className="notification-time">
        {emoji && (
          <span className="me-2" role="img" aria-label="Emoji">
            {emoji}
          </span>
        )}
        {time} {/* Tiempo de la notificación */}
      </span>
    </div>
  </Link>
);

// Definición de las propiedades esperadas con PropTypes
Notification.propTypes = {
  avatar: PropTypes.shape(Avatar.propTypes), // Objeto que contiene la información para el Avatar
  time: PropTypes.string.isRequired,         // Tiempo en formato de texto
  className: PropTypes.string,               // Clases CSS adicionales para el componente
  unread: PropTypes.bool,                    // Indica si la notificación está sin leer
  flush: PropTypes.bool,                     // Controla si la notificación tiene estilo sin relleno
  emoji: PropTypes.string,                   // Emoji opcional a mostrar
  children: PropTypes.node                   // Contenido de la notificación en formato HTML seguro
};

// Valores predeterminados para algunas propiedades
Notification.defaultProps = { unread: false, flush: false };

export default Notification;
