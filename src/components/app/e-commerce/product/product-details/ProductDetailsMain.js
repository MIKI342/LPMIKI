import React, { useState, useCallback } from 'react';
import { Button, Badge, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import QuantityController from '../../QuantityController';
import { FaShoppingCart } from 'react-icons/fa';
import useProductHook from 'hooks/useProductHook';

const ProductDetailsMain = ({ product }) => {
  const {
    id,
    nombreProducto,
    descripcionProducto,
    precioUnitario,
    descuento,
    superPrecio = 20,
    precioMayoreo = 30,
    cantidad,
    CategoriaProducto,
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
    <div
      className="product-details"
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        margin: '0',
        padding: '2rem',
        boxSizing: 'border-box',
      }}
    >
      {/* Nombre del Producto */}
      <h2 className="text-dark fw-bold">{nombreProducto}</h2>

      {/* Categoría del Producto */}
      {CategoriaProducto && (
        <Link to="#!" className="text-secondary d-block mb-2 fs-6">
          {CategoriaProducto.nombre}
        </Link>
      )}

      {/* Precios */}
      <div className="d-flex flex-column mb-4">
        <h5 className="text-warning fw-bold mb-1">
          Super Precio: ${superPrecio.toFixed(2)}
        </h5>
        <h6 className="text-secondary fw-bold mb-1">
          Precio Mayoreo: ${precioMayoreo.toFixed(2)}
        </h6>
        <div className="d-flex align-items-center">
          <h6 className="text-muted mb-0">
            Precio Unitario: ${precioConDescuento.toFixed(2)}
          </h6>
          {descuento && (
            <Badge bg="danger" pill className="discount-badge ms-2">
              -{descuento}%
            </Badge>
          )}
        </div>
      </div>

      {/* Descripción del Producto */}
      <p className="text-muted fs-6 mb-4">{descripcionProducto}</p>

      {/* Información adicional */}
      <div className="additional-info mb-4">
        <p>
          <strong>Costo de Envío:</strong> <span className="text-info">$5</span>
        </p>
        <p>
          <strong>Disponibilidad:</strong>
          <span className={`ms-2 ${disponible ? 'text-success' : 'text-danger'}`}>
            {disponible ? 'Disponible' : 'Agotado'}
          </span>
        </p>
      </div>

      {/* Control de Cantidad y Botón de Carrito */}
      <div className="d-flex align-items-center mt-4">
        <QuantityController
          quantity={productCount}
          handleChange={handleQuantityChange}
          handleIncrease={handleQuantityIncrease}
          handleDecrease={handleQuantityDecrease}
          disabled={!disponible}
        />
        <OverlayTrigger
          placement="top"
          overlay={<Tooltip id={`tooltip-add-to-cart-${id}`}>Añadir al carrito</Tooltip>}
        >
          <Button
            variant="outline-secondary"
            className="d-flex align-items-center justify-content-center ms-3"
            style={{ width: '50px', height: '50px', borderRadius: '50%' }}
            onClick={handleAddToCartClick}
            disabled={!disponible}
            aria-label="Añadir al carrito"
          >
            <FaShoppingCart size={22} color="#6c757d" />
          </Button>
        </OverlayTrigger>
      </div>
    </div>
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
    CategoriaProducto: PropTypes.shape({
      nombre: PropTypes.string,
    }),
  }).isRequired,
};

export default ProductDetailsMain;
