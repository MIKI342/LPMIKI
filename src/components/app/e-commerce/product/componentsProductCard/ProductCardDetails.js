//Muestra los detalles básicos del producto:
//Nombre del producto.
//Descripción (limitada a 40 caracteres con puntos suspensivos si es más larga).
//Rating con estrellas.
//Se encarga únicamente del contenido textual y la sección de calificaciones, manteniendo el diseño limpio.

import React from 'react';
import PropTypes from 'prop-types';
import StarRating from 'components/home/StarRating';

const ProductCardDetails = ({ product }) => {
  const { nombreProducto } = product;

  return (
    <>
      <h5
        style={{
          fontSize: '1.2rem',
          color: '#00274D',
          fontWeight: 'bold',
          whiteSpace: 'normal',
          overflowWrap: 'break-word'
        }}
      >
        {nombreProducto}
      </h5>
      <StarRating className="mb-2" />
      <br></br>{' '}
    </>
  );
};

ProductCardDetails.propTypes = {
  product: PropTypes.object.isRequired
};

export default ProductCardDetails;
