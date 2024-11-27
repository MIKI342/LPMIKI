import React, { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import PropTypes from 'prop-types';
import QuantityController from '../../QuantityController';
import classNames from 'classnames';

const ProductDetailsMain = ({ product }) => {
  const {
    nombreProducto,
    descripcionProducto,
    precioUnitario,
    precioMayoreo,
    superPrecio,
    cantidad,
  } = product;

  const [productCount, setProductCount] = useState(1);

  const handleQuantityChange = (e) => setProductCount(Math.max(1, parseInt(e.target.value) || 1));
  const handleQuantityIncrease = () => setProductCount(productCount + 1);
  const handleQuantityDecrease = () => setProductCount(Math.max(1, productCount - 1));

  return (
    <>
      <h4 className="text-1100 fw-bold">{nombreProducto}</h4>
      <p className="fs-10 text-muted">{descripcionProducto || 'Descripción no disponible'}</p>
      <h5 className="text-warning fw-bold mb-2">
        {`$${superPrecio || precioUnitario}`}
        {superPrecio && <span className="text-muted fs-6 ms-2"><del>${precioUnitario}</del></span>}
      </h5>
      <p className="fs-10 mb-2">Precio Mayoreo: <strong>${precioMayoreo}</strong></p>
      <p className="fs-10 mb-3">
        Stock:{' '}
        <span className={classNames({ 'text-success': cantidad > 0, 'text-danger': cantidad === 0 })}>
          {cantidad > 0 ? `${cantidad} disponibles` : 'Agotado'}
        </span>
      </p>
      <Row>
        <Col xs="auto">
          <QuantityController
            quantity={productCount}
            handleChange={handleQuantityChange}
            handleIncrease={handleQuantityIncrease}
            handleDecrease={handleQuantityDecrease}
          />
        </Col>
        <Col xs="auto">
          <button className="btn btn-primary">Agregar al carrito</button>
        </Col>
      </Row>
    </>
  );
};

ProductDetailsMain.propTypes = {
  product: PropTypes.shape({
    nombreProducto: PropTypes.string.isRequired,
    descripcionProducto: PropTypes.string,
    precioUnitario: PropTypes.number.isRequired,
    precioMayoreo: PropTypes.number.isRequired,
    superPrecio: PropTypes.oneOfType([PropTypes.number, PropTypes.null]),
    cantidad: PropTypes.number.isRequired,
  }).isRequired,
};

export default ProductDetailsMain;
