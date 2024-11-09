import React from 'react';
import { Carousel, Image } from 'react-bootstrap';
import PropTypes from 'prop-types';

const ProductDetailsMedia = ({ product, imageList }) => {
  const defaultImage = '/img/default.png';

  return (
    <Carousel indicators={false} controls interval={2500} fade className="w-100 h-100">
      {imageList.length > 0
        ? imageList.map((src, index) => (
            <Carousel.Item key={index}>
              <Image
                src={src}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = defaultImage;
                }}
                className="w-100 h-100"
                alt={`${product.nombreProducto} - Imagen ${index + 1}`}
                loading="lazy"
                style={{ objectFit: 'cover' }}
              />
            </Carousel.Item>
          ))
        : (
          <Image
            src={defaultImage}
            className="w-100 h-100"
            alt="Imagen por defecto"
            loading="lazy"
            style={{ objectFit: 'cover' }}
          />
        )}
    </Carousel>
  );
};

ProductDetailsMedia.propTypes = {
  product: PropTypes.object.isRequired,
  imageList: PropTypes.array.isRequired,
};

export default ProductDetailsMedia;
