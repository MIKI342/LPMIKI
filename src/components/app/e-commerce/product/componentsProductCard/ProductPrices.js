import React from 'react';
import PropTypes from 'prop-types';
import { FaShoppingCart, FaTags, FaCoins, FaBox } from 'react-icons/fa';

const ProductPrices = ({ product }) => {
  const { precioUnitario, superPrecio, precioMayoreo } = product;

  // Filtra y ordena los precios
  const precios = [
    { label: 'Super precio', value: superPrecio, icon: <FaTags /> },
    { label: 'Precio mayoreo', value: precioMayoreo, icon: <FaBox /> },
    { label: 'Precio unitario', value: precioUnitario, icon: <FaCoins /> },
  ]
    .filter((precio) => precio.value != null) // Filtrar precios válidos
    .sort((a, b) => a.value - b.value); // Ordenar de menor a mayor

  return (
    <>
      {precios.map((precio, index) => {
        // Ajusta los estilos dinámicamente con tamaños ligeramente mayores
        const fontSize = `${(1.4 - index * 0.1) * 0.85}rem`; // Reducción del 15%
        const fontWeight = index === 0 ? 'bold' : 'normal'; // El más barato en negrita
        const color =
          index === 0
            ? '#FFA500' // Naranja para el más barato
            : index === 1
            ? '#007BFF' // Azul para el intermedio
            : '#6C757D'; // Gris para el más caro

        return (
          <h5
            key={precio.label}
            style={{
              color,
              fontSize, // Tamaño ajustado
              fontWeight,
              display: 'flex',
              alignItems: 'center',
              marginBottom: '18px', // Ajuste del espacio entre precios
            }}
          >
            <span style={{ marginRight: '10px' }}>{precio.icon}</span> {/* Espacio entre el ícono y el texto */}
            {precio.label}: <span style={{ marginLeft: '5px' }}>${precio.value}</span>
          </h5>
        );
      })}
    </>
  );
};

ProductPrices.propTypes = {
  product: PropTypes.object.isRequired,
};

export default ProductPrices;