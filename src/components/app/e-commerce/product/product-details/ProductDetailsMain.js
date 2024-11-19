import React, { useState, useCallback } from 'react';
import { Button, Badge, OverlayTrigger, Tooltip, Row, Col, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import QuantityController from '../../QuantityController';
import { FaShoppingCart } from 'react-icons/fa';
import useProductHook from 'hooks/useProductHook';

const ProductDetailsMain = ({ product }) => {
  const {
    id,
    nombreProducto,
    precioUnitario,
    descuento,
    superPrecio = 20,
    precioMayoreo = 30,
    cantidad,
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
          {/* Nombre del Producto */}
          <h2 className="fw-bold text-dark text-center mb-5">{nombreProducto}</h2>

          {/* Precios */}
          <div className="mb-5 text-center">
            <h4 className="fw-bold text-warning">Super Precio: ${superPrecio.toFixed(2)}</h4>
            <p className="text-secondary fw-bold">Precio Mayoreo: ${precioMayoreo.toFixed(2)}</p>
            <p className="text-muted">
              Precio Unitario: ${precioConDescuento.toFixed(2)}
              {descuento && (
                <Badge bg="danger" pill className="ms-2">
                  -{descuento}%
                </Badge>
              )}
            </p>
          </div>

          {/* Disponibilidad */}
          <div className="mb-5 text-center">
            <strong>Disponibilidad:</strong>
            <span className={`ms-2 ${disponible ? 'text-success' : 'text-danger'}`}>
              {disponible ? 'Disponible' : 'Agotado'}
            </span>
          </div>

          {/* Control de Cantidad y Botón de Carrito */}
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
              overlay={<Tooltip id={`tooltip-add-to-cart-${id}`}>Añadir al carrito</Tooltip>}
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
    precioUnitario: PropTypes.number.isRequired,
    descuento: PropTypes.number,
    superPrecio: PropTypes.number,
    precioMayoreo: PropTypes.number,
    cantidad: PropTypes.number.isRequired,
  }).isRequired,
};

export default ProductDetailsMain;
