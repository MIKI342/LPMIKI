import React from 'react';
import PropTypes from 'prop-types';
import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { FaShoppingCart } from 'react-icons/fa';
import QuantityController from 'components/app/e-commerce/QuantityController';

const QuantityAndCart = ({
  isAvailable,
  productCount,
  onQuantityChange,
  onIncrease,
  onDecrease,
  onAddToCart,
}) => (
  <div
    className="d-flex align-items-center"
    style={{
      maxWidth: '350px',
      margin: '0 auto',
      justifyContent: 'flex-start',
      gap: '10px',
      paddingLeft: '50px',
    }}
  >
    <QuantityController
      quantity={productCount}
      handleChange={onQuantityChange}
      handleIncrease={onIncrease}
      handleDecrease={onDecrease}
      disabled={!isAvailable}
      className="flex-grow-1"
      style={{
        border: '1px solid #007BFF',
        borderRadius: '5px',
        padding: '5px',
        width: '100px',
      }}
    />
    <OverlayTrigger
      placement="top"
      overlay={<Tooltip>Añadir al carrito</Tooltip>}
    >
      <Button
        variant="outline-secondary"
        className="d-flex align-items-center justify-content-center"
        style={{
          borderRadius: '50%',
          width: '45px',
          height: '45px',
          backgroundColor: 'transparent',
          borderColor: '#0056B3',
          marginLeft: '5px',
        }}
        onClick={onAddToCart}
        disabled={!isAvailable}
      >
        <FaShoppingCart size={90} color="#0056B3" /> {/* Aumentamos el tamaño aquí */}
      </Button>
    </OverlayTrigger>
  </div>
);

QuantityAndCart.propTypes = {
  isAvailable: PropTypes.bool.isRequired,
  productCount: PropTypes.number.isRequired,
  onQuantityChange: PropTypes.func.isRequired,
  onIncrease: PropTypes.func.isRequired,
  onDecrease: PropTypes.func.isRequired,
  onAddToCart: PropTypes.func.isRequired,
};

export default QuantityAndCart;
