import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import StarRating from 'components/common/StarRating';

const ProductDetailsMain = ({ product }) => {
  const {
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
          className={`${
            cantidad > 0 ? 'text-success' : 'text-danger'
          }`}
        >
          {cantidad > 0 ? 'Disponible' : 'Agotado'}
        </strong>
      </p>
      {tags && (
        <p className="fs-10 mb-3">
          Tags:
          {tags.map((tag, index) => (
            <Link
              to="#!"
              key={tag}
              className={index === 0 ? 'ms-2' : 'ms-1'}
            >
              {tag}
              {index < tags.length - 1 && ','}
            </Link>
          ))}
        </p>
      )}
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
