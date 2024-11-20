import React from 'react';
import PropTypes from 'prop-types';
import { FaShoppingCart, FaTags, FaCoins, FaBox } from 'react-icons/fa';

const ProductPrices = ({ product }) => {
  const { precioUnitario, superPrecio, precioMayoreo } = product;

  const precios = [
    { label: 'Precio unitario', value: precioUnitario, icon: <FaCoins /> },
    { label: 'Super precio', value: superPrecio, icon: <FaTags /> },
    { label: 'Precio mayoreo', value: precioMayoreo, icon: <FaBox /> },
  ].filter((p) => p.value != null);

  precios.sort((a, b) => a.value - b.value);

  return (
    <>
      {precios.map((precio, index) => (
        <h5
          key={precio.label}
          style={{
            color: index === 0 ? '#FFA500' : '#6C757D',
            fontSize: index === 0 ? '1.1rem' : '0.9rem',
            fontWeight: index === 0 ? 'bold' : '500',
          }}
        >
          {precio.icon} {precio.label}: ${precio.value}
        </h5>
      ))}
    </>
  );
};

ProductPrices.propTypes = {
  product: PropTypes.object.isRequired,
};

export default ProductPrices;
