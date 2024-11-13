import React from 'react';
import PropTypes from 'prop-types';
import { Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const ServicesImage = ({ folderPaths }) => {
  const imageUrls = folderPaths.map(folder => `${process.env.PUBLIC_URL}/img/tramites/${folder}/img1.png`);

  return (
    <Carousel>
      {imageUrls.map((url, index) => (
        <Carousel.Item key={index}>
          <Link to={`/tramite/${index}`}>
            <img
              className="d-block w-100"
              src={url}
              alt={`Service Image ${index + 1}`}
            />
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

ServicesImage.propTypes = {
  folderPaths: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default ServicesImage;
