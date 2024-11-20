import React from 'react';
import PropTypes from 'prop-types';
import { FaTags, FaCoins, FaBox } from 'react-icons/fa';

const ProductPrices = ({ product }) => {
  const { precioUnitario, superPrecio, precioMayoreo } = product;

  const precios = [
    { label: 'Super precio', value: superPrecio, icon: <FaTags /> },
    { label: 'Precio mayoreo', value: precioMayoreo, icon: <FaBox /> },
    { label: 'Precio unitario', value: precioUnitario, icon: <FaCoins /> },
  ]
    .filter((precio) => precio.value != null) // Filtra precios no válidos
    .sort((a, b) => a.value - b.value); // Ordena precios de menor a mayor

  return (
    <div className="mb-4">
      {precios.map((precio, index) => {
        // Ajusta dinámicamente el tamaño de letra
        const fontSize = `${1.4 - index * 0.1}rem`; // Disminuye 0.1rem por cada precio
        const fontWeight = index === 0 ? 'bold' : 'normal'; // El más barato en negrita

        return (
          <h5
            key={precio.label}
            style={{
              color: index === 0 ? '#FFA500' : index === 1 ? '#007BFF' : '#6C757D',
              fontSize, // Aplica el tamaño dinámico
              fontWeight,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center', // Asegura que el texto y el ícono estén centrados
              marginBottom: '20px', // Aumenta el espacio entre precios
            }}
          >
            <span style={{ marginRight: '10px' }}>{precio.icon}</span> {/* Espacio entre el icono y el texto */}
            {precio.label}: <span style={{ marginLeft: '5px' }}>${precio.value}</span>
          </h5>
        );
      })}
    </div>
  );
};

ProductPrices.propTypes = {
  product: PropTypes.object.isRequired,
};

export default ProductPrices;
