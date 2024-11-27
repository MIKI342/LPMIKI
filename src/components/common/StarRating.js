import React, { useMemo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Rating from 'react-rating';
import PropTypes from 'prop-types';
import { useAppContext } from 'Main';

const StarRating = ({ fractions = 2, handleChange, ...rest }) => {
  const {
    config: { isRTL }
  } = useAppContext();

  // Generar un valor aleatorio para las estrellas (5 estrellas completas o 4 estrellas)
  const simulatedRating = useMemo(() => (Math.random() > 0.2 ? 5 : 4), []);

  return (
    <Rating
      fractions={fractions}
      initialRating={simulatedRating} // Usamos el valor simulado
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
  handleChange: PropTypes.func
};

export default StarRating;
