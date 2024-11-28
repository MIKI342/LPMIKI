// ProductDetailsMedia.jsx
import React from 'react';
import { Badge, Image } from 'react-bootstrap';
import PropTypes from 'prop-types';

const ProductDetailsMedia = ({ product: { imagen, esNuevo } }) => {
  return (
    <div className="position-relative h-sm-100 overflow-hidden">
      {imagen ? (
        <div className="d-flex justify-content-center align-items-center">
          <Image
            fluid
            className="rounded"
            src={imagen}
            alt="product media"
            style={{ maxHeight: '1000px', maxWidth: '1000px', width: 'auto', height: 'auto' }}
          />
        </div>
      ) : (
        <p>No hay imagen disponible</p>
      )}
      {esNuevo && (
        <Badge
          pill
          bg="success"
          className="position-absolute top-0 end-0 me-2 mt-2 fs-11 z-index-2"
        >
          Nuevo
        </Badge>
      )}
    </div>
  );
};

ProductDetailsMedia.propTypes = {
  product: PropTypes.shape({
    imagen: PropTypes.string.isRequired,
    esNuevo: PropTypes.bool
  }).isRequired
};

export default ProductDetailsMedia;
