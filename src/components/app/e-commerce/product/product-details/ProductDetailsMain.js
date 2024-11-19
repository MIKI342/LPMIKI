import React, { useState, useCallback } from 'react';
import { Button, OverlayTrigger, Tooltip, Row, Col, Container } from 'react-bootstrap';
import PropTypes from 'prop-types';
import QuantityController from '../../QuantityController';
import { FaShoppingCart } from 'react-icons/fa';
import useProductHook from 'hooks/useProductHook';

import classNames from 'classnames'; // Asegúrate de importar classNames  

const ProductDetailsMain = ({ product }) => {
  const {
    id,
    nombreProducto,
    descripcionProducto,
    precioUnitario,
    descuento,
    superPrecio = 10, // Valor predeterminado si es null o undefined
    precioMayoreo,
    cantidad
  } = product;

  const precioConDescuento = descuento
    ? precioUnitario - (precioUnitario * descuento) / 100
    : precioUnitario;

  const disponible = cantidad > 0;

  const [productCount, setProductCount] = useState(1);
  const { handleAddToCart } = useProductHook(product);

  const handleAddToCartClick = useCallback(
    (event) => {
      event.stopPropagation();
      handleAddToCart(productCount, true, true, nombreProducto, precioUnitario);
    },
    [productCount, handleAddToCart, nombreProducto, precioUnitario]
  );

  const handleQuantityChange = (e) => {
    setProductCount(Math.max(1, parseInt(e.target.value, 10)));
  };

  const handleQuantityIncrease = () => {
    setProductCount((prevCount) => prevCount + 1);
  };

  const handleQuantityDecrease = () => {
    setProductCount((prevCount) => (prevCount > 1 ? prevCount - 1 : 1));
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col lg={10}>
          <h2 className="fw-bold text-dark text-center mb-5">{nombreProducto}</h2>
          <p className="text-muted text-center">{descripcionProducto}</p>
          <div className="mb-5 text-center">
            <h4
              className={classNames('fw-bold', { 'text-danger': descuento })}
              style={{ color: '#FF8C00' }}
            >
              ${precioConDescuento}
              {descuento && (
                <small className="text-muted ms-2">
                  <del>${precioUnitario}</del> -{descuento}%
                </small>
              )}
            </h4>
            <h6
              className="fw-bold mb-1"
              style={{ fontSize: '1.2rem', color: '#FF8C00' }}
            >
              super precio: ${superPrecio} {/* Siempre muestra "super precio" */}
            </h6>
            {precioMayoreo != null && (
              <h6
                className="text-secondary fw-bold"
                style={{ fontSize: '1.2rem' }}
              >
                precio mayoreo: ${precioMayoreo}
              </h6>
            )}
          </div>
          <div className="mb-5 text-center">
            <strong>Disponibilidad:</strong>
            <span
              className={`ms-2 ${disponible ? 'text-success' : 'text-danger'}`}
            >
              {disponible ? 'Disponible' : 'Agotado'}
            </span>
          </div>
          <div className="d-flex justify-content-center align-items-center gap-3">
            <QuantityController
              quantity={productCount}
              handleChange={handleQuantityChange}
              handleIncrease={handleQuantityIncrease}
              handleDecrease={handleQuantityDecrease}
              disabled={!disponible}
              className="w-50"
            />
            <OverlayTrigger
              placement="top"
              overlay={
                <Tooltip id={`tooltip-add-to-cart-${id}`}>
                  Añadir al carrito
                </Tooltip>
              }
            >
              <Button
                variant="outline-secondary"
                className="d-flex align-items-center justify-content-center"
                style={{ width: '60px', height: '60px', borderRadius: '50%' }}
                onClick={handleAddToCartClick}
                disabled={!disponible}
                aria-label="Añadir al carrito"
              >
                <FaShoppingCart size={22} color="#6c757d" />
              </Button>
            </OverlayTrigger>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

ProductDetailsMain.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    nombreProducto: PropTypes.string.isRequired,
    descripcionProducto: PropTypes.string.isRequired,
    precioUnitario: PropTypes.any,
    descuento: PropTypes.number,
    superPrecio: PropTypes.any,
    precioMayoreo: PropTypes.any,
    cantidad: PropTypes.number.isRequired,
  }).isRequired,
};

export default ProductDetailsMain;
