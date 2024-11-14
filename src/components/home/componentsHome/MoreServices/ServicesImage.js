import React from 'react';
import PropTypes from 'prop-types';
import { Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const ServicesImage = ({ data }) => {
  return (
    <Carousel>
      {data.map((item, index) => (
        <Carousel.Item key={index}>
          <Link to={`/tramite/${item.id}`}>
            <img
              className="d-block w-100"
              src={item.mainImageUrl || 'https://via.placeholder.com/300'}
              alt={item.nombre || item.nombreServicio}
            />
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

ServicesImage.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      mainImageUrl: PropTypes.string,
      nombre: PropTypes.string,
      nombreServicio: PropTypes.string,
    })
  ).isRequired,
};

export default ServicesImage;
