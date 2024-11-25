// CategoryCard.js
import React, { useMemo, useCallback } from 'react';
import { Card, Carousel } from 'react-bootstrap';
import PropTypes from 'prop-types';
import 'components/home/componentsHome/css/CategoryCard.css';

const categoryImageMapping = {
  'ELECTRÓNICA': ['/img/electronica/img1.png', '/img/electronica/img2.png', '/img/electronica/img3.png'],
  'PAPELERÍA': ['/img/papeleria/img1.png', '/img/papeleria/img2.png', '/img/papeleria/img3.png'],
  'REGALOS Y FIESTA': ['/img/regalosyfiesta/img1.png', '/img/regalosyfiesta/img2.png', '/img/regalosyfiesta/img3.png'],
  'VAPE': ['/img/vape/img1.png', '/img/vape/img2.png', '/img/vape/img3.png', '/img/vape/img4.png'],
  'TRÁMITES': [
    '/img/tramites/actasFoliadas/actaNacimiento/img1.png',
    '/img/tramites/actasFoliadas/matrimonio/img1.png',
    '/img/tramites/afiliacionImss/img1.png',
  ],
};

const CategoryCard = ({ category, onImageClick }) => {
  const images = useMemo(() => {
    return categoryImageMapping[category.toUpperCase()] || ['/img/default.png'];
  }, [category]);

  // Función memoizada para manejar clics en la imagen
  const handleImageClick = useCallback((e) => {
    // Prevenir que el clic se propague al Carousel para evitar conflictos con gestos de deslizamiento
    e.stopPropagation();
    onImageClick();
  }, [onImageClick]);

  return (
    <Card className="category-card">
      <Carousel interval={2000} touch={true} pause={false}>
        {images.map((imgSrc, index) => (
          <Carousel.Item key={index}>
            <Card.Img
              variant="top"
              src={imgSrc}
              alt={`${category} Image ${index + 1}`}
              onClick={handleImageClick}
              onError={(e) => {
                e.target.src = '/img/default.png'; // Fallback para imágenes faltantes
              }}
              style={{
                height: '200px', // Altura uniforme
                width: '100%', // Ancho completo
                objectFit: 'cover', // Ajusta las imágenes proporcionalmente
              }}
            />
          </Carousel.Item>
        ))}
      </Carousel>
      <Card.Body
        style={{
          textAlign: 'center',
          fontSize: '14px',
          fontWeight: 'bold',
        }}
      >
        {category.toUpperCase()}
      </Card.Body>
    </Card>
  );
};

CategoryCard.propTypes = {
  category: PropTypes.string.isRequired,
  onImageClick: PropTypes.func.isRequired,
};

export default React.memo(CategoryCard);
