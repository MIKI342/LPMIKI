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
        color: isAvailable ? '#28A745' : '#DC3545',
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
          size="sm"
          style={{
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            padding: 0,
          }}
          onClick={onAddToCart}
        >
          <FaShoppingCart size={18} />
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
