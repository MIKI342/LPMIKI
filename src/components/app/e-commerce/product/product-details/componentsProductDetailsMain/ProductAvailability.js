import React from 'react';
import PropTypes from 'prop-types';

const ProductAvailability = ({ isAvailable }) => (
  <div className="mb-4" style={{ fontSize: '1.2rem' }}>
    <span className={`ms-2 ${isAvailable ? 'text-success' : 'text-danger'}`}>
      {isAvailable ? 'Disponible' : 'Agotado'}
    </span>
  </div>
);

ProductAvailability.propTypes = {
  isAvailable: PropTypes.bool.isRequired,
};

export default ProductAvailability;
