import React from 'react';
import { Badge, Image } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Slider from 'react-slick';

const sliderSettings = {
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
};

const ProductDetailsMedia = ({ product: { imagen, files = [] } }) => {
  const productImages = files.length ? files : [{ src: imagen }];

  return (
    <div className="position-relative h-sm-100 overflow-hidden">
      <Slider {...sliderSettings}>
        {productImages.map((img, index) => (
          <div key={index}>
            <Image
              fluid
              className="fit-cover w-sm-100 h-sm-100"
              src={img.src}
              alt={`Product ${index + 1}`}
            />
          </div>
        ))}
      </Slider>
      <Badge
        pill
        bg="success"
        className="position-absolute top-0 end-0 me-2 mt-2 fs-11 z-index-2"
      >
        New
      </Badge>
    </div>
  );
};

ProductDetailsMedia.propTypes = {
  product: PropTypes.shape({
    imagen: PropTypes.string.isRequired,
    files: PropTypes.arrayOf(
      PropTypes.shape({
        src: PropTypes.string.isRequired,
      })
    ),
  }).isRequired,
};

export default ProductDetailsMedia;
