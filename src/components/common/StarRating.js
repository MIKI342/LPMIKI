/**
 * StarRating Component
 * 
 * Este componente muestra un sistema de calificación por estrellas utilizando el componente `Rating`. 
 * Es interactivo y permite especificar la fracción de calificación y manejar cambios en la calificación.
 * 
 * Propiedades:
 * - `fractions`: Número de divisiones por estrella (por defecto 2) para permitir calificaciones parciales.
 * - `rating`: Valor inicial de la calificación, usado para determinar la cantidad de estrellas activas.
 * - `handleChange`: Función de callback que se ejecuta cuando se cambia la calificación.
 * 
 * Configuración de contexto:
 * - `isRTL`: Determina si la dirección del componente es de derecha a izquierda (`rtl`) o izquierda a derecha (`ltr`).
 * 
 * Ejemplo de uso:
 * ```jsx
 * <StarRating
 *   fractions={2}
 *   rating={4.5}
 *   handleChange={(newRating) => console.log("Nueva calificación:", newRating)}
 * />
 * ```
 */

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Rating from 'react-rating';
import PropTypes from 'prop-types';
import { useAppContext } from 'Main';

const StarRating = ({ fractions = 2, rating, handleChange, ...rest }) => {
  const {
    config: { isRTL }
  } = useAppContext();

  return (
    <Rating
      fractions={fractions}
      initialRating={rating}
      fullSymbol={<FontAwesomeIcon icon="star" className="text-warning" />}
      emptySymbol={<FontAwesomeIcon icon="star" className="text-300" />}
      onChange={handleChange}
      direction={isRTL ? 'rtl' : 'ltr'}
      {...rest}
    />
  );
};

StarRating.propTypes = {
  fractions: PropTypes.number,
  rating: PropTypes.number.isRequired,
  handleChange: PropTypes.func
};

export default StarRating;
