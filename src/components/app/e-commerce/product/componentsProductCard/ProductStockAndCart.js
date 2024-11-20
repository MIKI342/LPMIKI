import React from 'react';
import PropTypes from 'prop-types';
import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { FaShoppingCart } from 'react-icons/fa';

const ProductStockAndCart = ({ isAvailable, onAddToCart }) => (
  <div className="d-flex align-items-center justify-content-between mt-3">
    <p
      className={`fw-bold mb-0 ${isAvailable ? '' : 'text-danger'}`}
      style={{
        fontSize: '1rem',
        color: isAvailable ? '#28A745' : '#DC3545', // Verde si está en stock, rojo si no
      }}
    >
      {isAvailable ? 'En Stock' : 'Agotado'}
    </p>
    {isAvailable && (
      <OverlayTrigger
        placement="top"
        overlay={<Tooltip>Añadir al carrito</Tooltip>}
      >
        <Button
          variant="outline-secondary"
          style={{
            borderRadius: '50%',
            width: '45px', // Ajuste al tamaño del botón en QuantityAndCart
            height: '45px',
            backgroundColor: 'transparent',
            borderColor: '#0056B3', // Consistente con QuantityAndCart
            padding: 0,
          }}
          onClick={onAddToCart}
        >
          <FaShoppingCart size={20} color="#0056B3" /> {/* Mismo tamaño y color */}
        </Button>
      </OverlayTrigger>
    )}
  </div>
);

ProductStockAndCart.propTypes = {
  isAvailable: PropTypes.bool.isRequired,
  onAddToCart: PropTypes.func.isRequired,
};

export default ProductStockAndCart;
