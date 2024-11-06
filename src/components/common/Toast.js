/**
 * CloseButton Component
 * 
 * Este componente muestra un botón de cierre (`FontAwesomeIcon`) para los mensajes de notificación 
 * de `react-toastify`, permitiendo al usuario cerrar la notificación.
 * 
 * Propiedades:
 * - `closeToast`: Función que se ejecuta al hacer clic en el botón, cerrando el mensaje de notificación.
 * 
 * Transiciones:
 * - `Fade`: Exporta una transición de entrada y salida (`fadeIn` y `fadeOut`) que se puede usar para 
 *   animar las notificaciones de `react-toastify`.
 * 
 * Ejemplo de uso:
 * ```jsx
 * <ToastContainer closeButton={<CloseButton />} transition={Fade} />
 * ```
 */

import React from 'react';
import PropTypes from 'prop-types';
import { cssTransition } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Transición de entrada y salida para react-toastify
export const Fade = cssTransition({ enter: 'fadeIn', exit: 'fadeOut' });

// Botón de cierre personalizado para las notificaciones
export const CloseButton = ({ closeToast }) => (
  <FontAwesomeIcon
    icon="times"
    className="my-2 fs-11"
    style={{ opacity: 0.5 }}
    onClick={closeToast}
  />
);

CloseButton.propTypes = { closeToast: PropTypes.func };

