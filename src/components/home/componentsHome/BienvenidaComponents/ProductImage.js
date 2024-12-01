// components/app/e-commerce/product/ProductImage.jsx
//Aqui aun tengo la duda de como se esta utilizando

import React, { useMemo } from 'react';
import { Badge, Image, Carousel } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

const DEFAULT_IMAGE = '/img/default.png';

const ProductImage = ({
  name,
  id,
  category,
  isNew,
  images,
  layout,
  className,
  style,
}) => {
  const baseUrl = process.env.REACT_APP_BASE_URL || '';

  const imageUrls = useMemo(() => {
    if (images && images.length > 0) {
      return images.map((img) => `${baseUrl}${img}`);
    } else {
      return [DEFAULT_IMAGE];
    }
  }, [images, baseUrl]);

  return (
    <div className={classNames('overflow-hidden w-100 h-100', className)} style={style}>
      <Link to={`/e-commerce/product/product-detailsF/${id}`} className="d-block w-100 h-100">
        {imageUrls.length > 1 ? (
          <Carousel
            indicators={false}
            controls={true}
            interval={3000}
            fade={true}
            className="w-100 h-100"
          >
            {imageUrls.map((src, index) => (
              <Carousel.Item key={index}>
                <Image
                  src={src}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = DEFAULT_IMAGE;
                  }}
                  className="w-100 h-100"
                  alt={`${name} - Imagen ${index + 1}`}
                  loading="lazy"
                  style={{ objectFit: 'cover' }}
                />
              </Carousel.Item>
            ))}
          </Carousel>
        ) : (
          <Image
            src={imageUrls[0]}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = DEFAULT_IMAGE;
            }}
            className="w-100 h-100"
            alt={name}
            loading="lazy"
            style={{ objectFit: 'cover' }}
          />
        )}
      </Link>
      {isNew && (
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

ProductImage.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  category: PropTypes.string.isRequired,
  isNew: PropTypes.bool,
  images: PropTypes.arrayOf(PropTypes.string),
  layout: PropTypes.string.isRequired,
  className: PropTypes.string,
  style: PropTypes.object,
};

export default React.memo(ProductImage);
