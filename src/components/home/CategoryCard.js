// components/home/CategoryCard.js

import React, { useMemo } from 'react';
import { Card, Carousel } from 'react-bootstrap';
import PropTypes from 'prop-types';
import 'components/home/componentsHome/css/CategoryCard.css'; // Archivo CSS para estilos

// Mapeo de categorías con sus conjuntos de imágenes específicos
const categoryImageMapping = {
  'ELECTRÓNICA': ['/img/electronica/img1.png', '/img/electronica/img2.png', '/img/electronica/img3.png'],
  'PAPELERÍA': ['/img/papeleria/img1.png', '/img/papeleria/img2.png', '/img/papeleria/img3.png'],
  'REGALOS Y FIESTA': ['/img/regalosyfiesta/img1.png', '/img/regalosyfiesta/img2.png', '/img/regalosyfiesta/img3.png' ],
  'VAPE': ['/img/vape/img1.png','/img/vape/img2.png', '/img/vape/img3.png', '/img/vape/img4.png', '/img/vape/img5.png', '/img/vape/img6.png'],
  // Agrega más categorías e imágenes según sea necesario
};

const CategoryCard = ({ category }) => { 
  // Obtener las imágenes correspondientes a la categoría o una imagen por defecto
  const images = useMemo(() => categoryImageMapping[category] || ['/img/default.png'], [category]);

  return (
    <Card className="category-card">
      {/* Carrusel de imágenes con intervalo de 2 segundos */}
      <Carousel interval={2000}>
        {images.map((imgSrc, index) => (
          <Carousel.Item key={index}>
            <Card.Img variant="top" src={imgSrc} alt={`${category} Image ${index + 1}`} />
          </Carousel.Item>
        ))}
      </Carousel>

      <Card.Body className="category-card-body">
        {category.toUpperCase()}
      </Card.Body>
    </Card>
  );
};

CategoryCard.propTypes = {
  category: PropTypes.string.isRequired,
};

export default React.memo(CategoryCard);
