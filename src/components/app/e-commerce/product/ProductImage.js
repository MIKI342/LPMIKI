import React, { useMemo } from 'react';
import { Badge, Image, Carousel } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { productImageMapping } from 'constants/productImageMapping';

const normalizeCategoryName = (name) => {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]/g, '');
};

const constructImagePath = (folderName, imageNumber) => {
  return `/img/${folderName}/img${imageNumber}.png`;
};

const MAX_IMAGES = 3;
const DEFAULT_IMAGE = '/img/default.png';

const ProductImage = ({ name, id, category, isNew, files, layout, className, style }) => {
  const imageList = useMemo(() => {
    if (files && files.length > 0) {
      // Priorizar imágenes de la API
      return files.map((file) => file.url);
    }

    // Usar rutas locales si no hay imágenes de la API
    let images = [];
    if (category && category.toLowerCase() === 'vape') {
      const trimmedName = name.trim();
      const imageFolder = productImageMapping[trimmedName] || null;

      if (imageFolder) {
        images = Array.from({ length: MAX_IMAGES }, (_, i) =>
          constructImagePath(imageFolder.toLowerCase(), i + 1)
        );
      }
    } else {
      const categoryFolder = normalizeCategoryName(category || 'Sin Categoría');
      images = Array.from({ length: MAX_IMAGES }, (_, i) =>
        constructImagePath(categoryFolder, i + 1)
      );
    }

    return images;
  }, [name, category, files]);

  return (
    <div className={classNames('overflow-hidden w-100 h-100', className)} style={style}>
      <Link
        to={`/e-commerce/product/product-details/${id}`}
        className="d-block w-100 h-100"
      >
        {imageList.length > 0 ? (
          imageList.length > 1 ? (
            <Carousel
              indicators={false}
              controls={true}
              interval={3000}
              fade={true}
              className="w-100 h-100"
            >
              {imageList.map((src, index) => (
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
              src={imageList[0]}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = DEFAULT_IMAGE;
              }}
              className="w-100 h-100"
              alt={name}
              loading="lazy"
              style={{ objectFit: 'cover' }}
            />
          )
        ) : (
          <Image
            src={DEFAULT_IMAGE}
            className="w-100 h-100"
            alt="Imagen por defecto"
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
  files: PropTypes.arrayOf(PropTypes.object).isRequired,
  layout: PropTypes.string.isRequired,
  className: PropTypes.string,
  style: PropTypes.object,
};

export default React.memo(ProductImage);
