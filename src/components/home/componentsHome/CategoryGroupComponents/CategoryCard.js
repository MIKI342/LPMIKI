// CategoryCard.js

import React, { useMemo, useCallback, useEffect, useState } from 'react';
import { Card, Carousel } from 'react-bootstrap';
import PropTypes from 'prop-types';
import 'components/home/componentsHome/css/CategoryCard.css';

const categoryImageMapping = {
  'TRÁMITES': [
    '/img/tramites/actasFoliadas/actaNacimiento/img1.png',
    '/img/tramites/actasFoliadas/matrimonio/img1.png',
    '/img/tramites/afiliacionImss/img1.png',
  ],
};

const DEFAULT_IMAGE = '/img/default.png';

const CategoryCard = ({ category, products, onImageClick }) => {
  const baseUrl = process.env.REACT_APP_BASE_URL || '';

  // Normalizamos el nombre de la categoría
  const normalizeCategoryName = (name) =>
    name
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .trim();

  const categoryNameNormalized = normalizeCategoryName(category);

  // Generamos un seed aleatorio al montar el componente
  const [randomSeed] = useState(Math.random());

  // Generamos las imágenes para el carrusel
  const images = useMemo(() => {
    if (categoryNameNormalized === 'tramites') {
      // Usamos el mapeo existente para "TRÁMITES"
      return categoryImageMapping['TRÁMITES'];
    } else {
      // Extraemos las imágenes de los productos asociados
      const allImages = [];

      products.forEach((product) => {
        const productImages = product.images || (product.imagen ? [product.imagen] : []);
        productImages.forEach((image) => {
          if (image) allImages.push(image);
        });
      });

      // Si no hay imágenes, usamos la imagen por defecto
      if (allImages.length === 0) {
        return [DEFAULT_IMAGE];
      }

      // Mezclamos las imágenes utilizando el randomSeed
      const shuffledImages = allImages.sort(() => 0.5 - randomSeed);

      // Limitamos el número de imágenes (por ejemplo, 10)
      const MAX_IMAGES = 10;
      const selectedImages = shuffledImages.slice(0, MAX_IMAGES);

      // Construimos las URLs completas de las imágenes
      return selectedImages.map((img) => {
        const imagePath = img.startsWith('/') ? img : `/${img}`;
        return `${baseUrl}${imagePath}`;
      });
    }
  }, [categoryNameNormalized, products, baseUrl, randomSeed]);

  // Manejamos el clic en la imagen
  const handleImageClick = useCallback(
    (e) => {
      e.stopPropagation();
      onImageClick();
    },
    [onImageClick]
  );

  return (
    <Card className="category-card">
      <Carousel interval={2000} touch pause={false}>
        {images.map((imgSrc, index) => (
          <Carousel.Item key={index}>
            <Card.Img
              variant="top"
              src={imgSrc}
              alt={`${category} Image ${index + 1}`}
              onClick={handleImageClick}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = DEFAULT_IMAGE;
              }}
              style={{
                height: '200px',
                width: '100%',
                objectFit: 'cover',
              }}
            />
          </Carousel.Item>
        ))}
      </Carousel>
      <Card.Body style={{ textAlign: 'center', fontSize: '14px', fontWeight: 'bold' }}>
        {category.toUpperCase()}
      </Card.Body>
    </Card>
  );
};

CategoryCard.propTypes = {
  category: PropTypes.string.isRequired,
  products: PropTypes.array.isRequired,
  onImageClick: PropTypes.func.isRequired,
};

export default React.memo(CategoryCard);
