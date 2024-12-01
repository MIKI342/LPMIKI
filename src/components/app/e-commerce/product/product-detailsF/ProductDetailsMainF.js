// ProductDetailsMain.jsx
import classNames from 'classnames';
import IconButton from 'components/common/IconButton';
import React, { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import useProductHook from 'hooks/useProductHook';
import StarRating from 'components/common/StarRating';

const ProductDetailsMain = ({ product }) => {
  const {
    id,
    nombreProducto,
    descripcionProducto,
    precioUnitario,
    precioMayoreo,
    superPrecio,
    cantidad,
    categoria,
    rating,
    totalReview,
    tags
  } = product;

  const [productCount, setProductCount] = useState(1);
  const [isFavourite, setIsFavourite] = useState(false); // Estado local para manejar favoritos

  const { handleAddToCart, handleFavouriteClick } = useProductHook(product);

  const handleQuantityChange = e => {
    setProductCount(parseInt(e.target.value < 1 ? 1 : e.target.value));
  };

  const handleQuantityIncrease = () => {
    setProductCount(productCount + 1);
  };

  const handleQuantityDecrease = () => {
    productCount > 1 && setProductCount(productCount - 1);
  };

  // Función para manejar el click en el botón de favoritos
  const handleFavouriteToggle = () => {
    setIsFavourite(!isFavourite);
    handleFavouriteClick();
  };

  return (
    <>
      <h5>{nombreProducto}</h5>
      {categoria && (
        <Link to="#!" className="fs-10 mb-2 d-block">
          {categoria}
        </Link>
      )}
      {rating && (
        <div className="fs-11 mb-3 d-inline-block">
          <StarRating readonly rating={rating} />
          <span className="ms-1 text-600">({totalReview || 0})</span>
        </div>
      )}
      {descripcionProducto && <p className="fs-10">{descripcionProducto}</p>}
      <h4 className="d-flex align-items-center">
        <span className="text-warning me-2">
          {`$${superPrecio || precioUnitario}`}
        </span>
        {superPrecio && precioUnitario && (
          <span className="me-1 fs-10 text-500">
            <del className="me-1">{`$${precioUnitario}`}</del>
            <strong>
              -
              {(
                ((precioUnitario - superPrecio) / precioUnitario) *
                100
              ).toFixed(0)}
              %
            </strong>
          </span>
        )}
      </h4>
      {precioMayoreo && (
        <p className="fs-10 mb-1">
          <span>Precio Mayoreo:</span>
          <strong> ${precioMayoreo}</strong>
        </p>
      )}
      <p className="fs-10">
        Stock:{' '}
        <strong
          className={classNames({
            'text-success': cantidad > 0,
            'text-danger': cantidad === 0
          })}
        >
          {cantidad > 0 ? 'Disponible' : 'Agotado'}
        </strong>
      </p>
      {tags && (
        <p className="fs-10 mb-3">
          Tags:
          {tags?.map((tag, index) => (
            <Link
              to="#!"
              key={tag}
              className={classNames({
                'ms-2': index === 0,
                'ms-1': index > 0
              })}
            >
              {tag}
              {index < tags.length - 1 && ','}
            </Link>
          ))}
        </p>
      )}
      <Row>
        
        <Col xs="auto" className="px-2 px-md-3">
          <IconButton
            iconClassName="me-sm-2"
            variant="primary"
            size="sm"
            icon="cart-plus"
            onClick={() => handleAddToCart(productCount, true)}
          >
            <span className="d-none d-sm-inline-block">Agregar al carrito</span>
          </IconButton>
        </Col>
        <Col xs="auto" className="px-0">
          <IconButton
            className="border-300"
            iconClassName="me-1"
            variant="outline-danger"
            size="sm"
            icon={isFavourite ? 'heart' : ['far', 'heart']}
            onClick={handleFavouriteToggle}
          >
            Favorito
          </IconButton>
        </Col>
      </Row>
    </>
  );
};

ProductDetailsMain.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    nombreProducto: PropTypes.string.isRequired,
    descripcionProducto: PropTypes.string,
    precioUnitario: PropTypes.number.isRequired,
    precioMayoreo: PropTypes.number,
    superPrecio: PropTypes.number,
    cantidad: PropTypes.number.isRequired,
    categoria: PropTypes.string,
    rating: PropTypes.number,
    totalReview: PropTypes.number,
    tags: PropTypes.array
  }).isRequired
};

export default ProductDetailsMain;
