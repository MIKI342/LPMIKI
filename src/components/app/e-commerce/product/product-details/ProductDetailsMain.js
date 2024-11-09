import React, { useState } from 'react';
import { Col, Row, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import useProductHook from 'hooks/useProductHook';
import QuantityController from '../../QuantityController';
import IconButton from 'components/common/IconButton';

const ProductDetailsMain = ({ product }) => {
  const {
    nombreProducto,
    descripcionProducto,
    precioUnitario,
    descuento,
    precioMayoreo,
    unidadMayoreo,
    cantidad, // Asegurarse de que 'cantidad' está presente en el objeto 'product'
    CategoriaProducto,
  } = product;

  // Calcular el precio con descuento si aplica
  const precioConDescuento = descuento
    ? precioUnitario - (precioUnitario * descuento) / 100
    : precioUnitario;

  // Determinar la disponibilidad del producto
  const disponible = cantidad > 0;

  const [productCount, setProductCount] = useState(1);
  const { handleAddToCart } = useProductHook(product);

  const handleQuantityChange = (e) => {
    setProductCount(Math.max(1, parseInt(e.target.value)));
  };

  const handleQuantityIncrease = () => {
    setProductCount((prevCount) => prevCount + 1);
  };

  const handleQuantityDecrease = () => {
    setProductCount((prevCount) => (prevCount > 1 ? prevCount - 1 : 1));
  };

  return (
    <>
      <h4 className="text-dark fw-bold">{nombreProducto}</h4>

      {CategoriaProducto && (
        <Link to="#!" className="text-secondary d-block mb-3">
          {CategoriaProducto.nombre}
        </Link>
      )}

      <div className="d-flex align-items-center mb-3">
        <span className="fs-2 text-primary fw-bold">{`$${precioConDescuento.toFixed(2)}`}</span>
        {descuento && (
          <span className="ms-3 text-muted fs-5">
            <del>{`$${precioUnitario.toFixed(2)}`}</del> <Badge bg="success">-{descuento}%</Badge>
          </span>
        )}
      </div>

      <p className="text-muted mb-3">{descripcionProducto}</p>

      <div className="mb-3">
        <p><strong>Costo de Envío:</strong> $5</p>
        <p>
          <strong>Disponibilidad:</strong> 
          <span className={`ms-2 ${disponible ? 'text-success' : 'text-danger'}`}>
            {disponible ? 'Disponible' : 'Agotado'}
          </span>
        </p>
      </div>

      <div className="d-flex align-items-center mb-4">
        <QuantityController
          quantity={productCount}
          handleChange={handleQuantityChange}
          handleIncrease={handleQuantityIncrease}
          handleDecrease={handleQuantityDecrease}
          disabled={!disponible}
        />
        <IconButton
          iconClassName="me-1"
          variant={disponible ? 'primary' : 'secondary'}
          size="lg"
          icon="cart-plus"
          onClick={() =>
            disponible && handleAddToCart(productCount, true, false, nombreProducto, precioUnitario)
          }
          disabled={!disponible}
          className="ms-3"
        >
          Add To Cart
        </IconButton>
      </div>

      <div className="d-flex align-items-center">
        <span className="me-3">Tags:</span>
        <Badge bg="light" className="me-2 text-dark">Laptop</Badge>
        <Badge bg="light" className="me-2 text-dark">Apple</Badge>
        <Badge bg="light" className="me-2 text-dark">Tech</Badge>
      </div>
    </>
  );
};

ProductDetailsMain.propTypes = {
  product: PropTypes.shape({
    nombreProducto: PropTypes.string.isRequired,
    descripcionProducto: PropTypes.string.isRequired,
    precioUnitario: PropTypes.number.isRequired,
    descuento: PropTypes.number,
    precioMayoreo: PropTypes.number,
    unidadMayoreo: PropTypes.string,
    cantidad: PropTypes.number.isRequired, // Asegurarse de que 'cantidad' sea obligatorio
    CategoriaProducto: PropTypes.shape({
      id: PropTypes.string.isRequired,
      nombre: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default ProductDetailsMain;
