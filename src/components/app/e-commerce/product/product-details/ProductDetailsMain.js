import React, { useState, useCallback } from 'react';
import { Button, OverlayTrigger, Tooltip, Row, Col, Container } from 'react-bootstrap';
import PropTypes from 'prop-types';
import QuantityController from '../../QuantityController';
import { FaShoppingCart, FaTags, FaCoins, FaBox } from 'react-icons/fa';
import StarRating from 'components/home/StarRating'; // Importación del componente StarRating
import useProductHook from 'hooks/useProductHook';

const ProductDetailsMain = ({ product }) => {
  const {
    id,
    nombreProducto,
    descripcionProducto,
    precioUnitario,
    descuento,
    superPrecio,
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

  // Crear una lista de precios válidos con íconos
  let precios = [
    {
      label: 'Precio unitario',
      value: precioUnitario,
      color: '#FFA500', // Naranja brillante por defecto
      icon: <FaCoins style={{ marginRight: '5px' }} />
    },
    {
      label: 'Super precio',
      value: superPrecio,
      color: '#FFA500', // Naranja si es el más barato
      icon: <FaTags style={{ marginRight: '5px' }} />
    },
    {
      label: 'Precio mayoreo',
      value: precioMayoreo,
      color: '#007BFF', // Azul moderado
      icon: <FaBox style={{ marginRight: '5px' }} />
    }
  ].filter((precio) => precio.value != null); // Filtrar solo precios válidos

  // Ordenar precios para destacar el más barato y el más caro
  precios.sort((a, b) => a.value - b.value);

  if (precios.length > 1) {
    // El precio más barato será naranja brillante
    precios[0].color = '#FFA500';

    // El precio más caro será gris oscuro
    precios[precios.length - 1].color = '#6C757D';
  }

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        {/* Centramos todo el contenido */}
        <Col lg={8} className="text-center">
          <h2 className="fw-bold text-dark mb-5">{nombreProducto}</h2>
          <p className="text-muted mb-4" style={{ fontSize: '1.1rem' }}>
            {descripcionProducto}
          </p>
          <div className="mb-4">
            {/* Mostrar precios ordenados */}
            {precios.map((precio, index) => {
              const fontSize = index === 0 ? '1.4rem' : index === 1 ? '1.2rem' : '1rem';
              const fontWeight = index === 0 ? 'bold' : '500';
              const marginBottom = index === precios.length - 1 ? '8px' : '16px'; // Espaciado menor entre último precio y estrellas
              return (
                <h5
                  key={precio.label}
                  style={{
                    color: precio.color,
                    fontSize,
                    fontWeight,
                    marginBottom,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  {precio.icon}
                  {precio.label}: ${precio.value}
                </h5>
              );
            })}
          </div>
          <div className="mb-3">
            <StarRating />
          </div>
          <div className="mb-4">
            <span
              className={`ms-2 ${disponible ? 'text-success' : 'text-danger'}`}
            >
              {disponible ? 'Disponible' : 'Agotado'}
            </span>
          </div>
          {/* Controlador de cantidad y botón alineados */}
          <div
            className="d-flex flex-column flex-lg-row align-items-center gap-3"
            style={{ maxWidth: '350px', margin: '0 auto', marginLeft: '80px' }} // Ligeramente a la derecha
          >
            <QuantityController
              quantity={productCount}
              handleChange={handleQuantityChange}
              handleIncrease={handleQuantityIncrease}
              handleDecrease={handleQuantityDecrease}
              disabled={!disponible}
              className="flex-grow-1"
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
                style={{
                  borderRadius: '50%',
                  width: '50px',
                  height: '50px',
                  padding: 0,
                  backgroundColor: 'transparent',
                  borderColor: '#0056B3' // Azul oscuro
                }}
                onClick={handleAddToCartClick}
                disabled={!disponible}
                aria-label="Añadir al carrito"
              >
                <FaShoppingCart size={20} color="#0056B3" />
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
