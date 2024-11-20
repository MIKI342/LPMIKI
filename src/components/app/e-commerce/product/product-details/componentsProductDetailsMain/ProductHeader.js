import React from 'react';
import PropTypes from 'prop-types';

const ProductHeader = ({ product }) => {
  const { nombreProducto, descripcionProducto } = product;

  return (
    <>
      <h2 className="fw-bold text-dark mb-3">{nombreProducto}</h2> {/* Espacio reducido debajo del nombre */}
      <p className="text-muted mb-4" style={{ fontSize: '1.1rem' }}> {/* Espacio aumentado debajo de la descripción */}
        {descripcionProducto}
      </p>
    </>
  );
};

ProductHeader.propTypes = {
  product: PropTypes.object.isRequired,
};

export default ProductHeader;
