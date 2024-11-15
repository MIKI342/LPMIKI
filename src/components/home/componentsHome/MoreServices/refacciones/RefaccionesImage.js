import React from 'react';
import PropTypes from 'prop-types';
import { Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const RefaccionesImage = ({ data }) => {
  return (
    <Carousel>
      {data.map((item, index) => (
        <Carousel.Item key={index}>
          <Link to={`/refaccion/${item.id}`}>
            <img
              className="d-block w-100"
              src={item.mainImageUrl || 'https://via.placeholder.com/300'}
              alt={item.nombre || item.nombreRefaccion}
            />
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

RefaccionesImage.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      mainImageUrl: PropTypes.string,
      nombre: PropTypes.string,
      nombreRefaccion: PropTypes.string
    })
  ).isRequired
};

export default RefaccionesImage;
