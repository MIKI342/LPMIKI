import React, { useMemo } from 'react';
import { Card, Carousel } from 'react-bootstrap';
import PropTypes from 'prop-types';
import 'components/home/componentsHome/css/CategoryCard.css';

const categoryImageMapping = {
  'ELECTRÓNICA': ['/img/electronica/img1.png', '/img/electronica/img2.png', '/img/electronica/img3.png'],
  'PAPELERÍA': ['/img/papeleria/img1.png', '/img/papeleria/img2.png', '/img/papeleria/img3.png'],
  'REGALOS Y FIESTA': ['/img/regalosyfiesta/img1.png', '/img/regalosyfiesta/img2.png', '/img/regalosyfiesta/img3.png'],
  'VAPE': ['/img/vape/img1.png', '/img/vape/img2.png', '/img/vape/img3.png', '/img/vape/img4.png', '/img/vape/img5.png', '/img/vape/img6.png'],
};

const tramitesImageMapping = [
  '/img/tramites/actasFoliadas/actaNacimiento/img1.png',
  '/img/tramites/actasFoliadas/defuncion/img1.png',
  '/img/tramites/actasFoliadas/divorcio/img1.png',
  '/img/tramites/actasFoliadas/matrimonio/img1.png',
  '/img/tramites/afiliacionImss/img3.png',
  '/img/tramites/afiliacionIsste/img2.png',
  '/img/tramites/antecedentesPenales/img3.png',
  '/img/tramites/cartaInfonavit/img2.png',
  '/img/tramites/cfe/img3.png',
  '/img/tramites/cuentaInfonavit/img2.png',
  '/img/tramites/nss/img2.png',
];

const CategoryCard = ({ category }) => {
  const images = useMemo(() => {
    if (category === 'TRÁMITES') {
      return tramitesImageMapping.filter((imgSrc) => imgSrc);
    }
    return categoryImageMapping[category] || ['/img/default.png'];
  }, [category]);

  return (
    <Card className="category-card">
      <Carousel interval={2000}>
        {images.map((imgSrc, index) => (
          <Carousel.Item key={index}>
            <Card.Img
              variant="top"
              src={imgSrc}
              alt={`${category} Image ${index + 1}`}
              onError={(e) => {
                e.target.src = '/img/default.png'; // Fallback para imágenes faltantes
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
      <Card.Body
        className="category-card-body"
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
};

export default React.memo(CategoryCard);




