import React from 'react';
import PropTypes from 'prop-types';
import { Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const HerramientasImage = ({ data }) => {
  return (
    <Carousel>
      {data.map((item, index) => (
        <Carousel.Item key={index}>
          <Link to={`/herramienta/${item.id}`}>
            <img
              className="d-block w-100"
              src={item.mainImageUrl || 'https://via.placeholder.com/300'}
              alt={item.nombreHerramienta || 'Herramienta'}
            />
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

HerramientasImage.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      mainImageUrl: PropTypes.string,
      nombreHerramienta: PropTypes.string,
    })
  ).isRequired,
};

export default HerramientasImage;
