import React from 'react';
import { Carousel } from 'react-bootstrap';
import ProductImage from 'components/app/e-commerce/product/ProductImage';

const BienvenidaCarousel = ({ randomOffers }) => (
  <Carousel interval={5000} pause="hover" indicators={false}>
    {randomOffers.map((offer) => {
      const images = offer.images || (offer.imagen ? [offer.imagen] : []);
      return (
        <Carousel.Item key={offer.id}>
          <div
            className="position-relative d-flex justify-content-center align-items-center"
            style={{ minHeight: '400px' }}
          >
            {/* Carrusel de imágenes */}
            <ProductImage
              name={offer.nombreProducto}
              id={offer.id}
              category={offer.CategoriaProducto?.nombreCategoria || 'Sin Categoría'}
              isNew={offer.isNew || false}
              images={images}
              layout="carousel"
              style={{
                objectFit: 'contain',
                maxWidth: '100%',
                maxHeight: '100%',
              }}
            />
            {/* Contenedor del texto siempre visible con fondo mejorado */}
            <div
              className="position-absolute bottom-0 w-100 text-center p-3"
              style={{
                background: 'rgba(0, 0, 0, 0.4)',
                borderBottomLeftRadius: '15px',
                borderBottomRightRadius: '15px',
                zIndex: 1,
              }}
            >
              <h4
                className="mb-1"
                style={{
                  color: '#FFFFFF',
                  fontSize: '1.6rem',
                  fontWeight: 'bold',
                  textShadow: '0px 0px 10px rgba(0, 0, 0, 0.9)',
                }}
              >
                {offer.nombreProducto}
              </h4>
              <p
                className="mb-0"
                style={{
                  color: '#FFFFFF',
                  fontSize: '1.2rem',
                  textShadow: '0px 0px 8px rgba(0, 0, 0, 0.8)',
                }}
              >
                {offer.descripcionProducto}
              </p>
            </div>
          </div>
        </Carousel.Item>
      );
    })}
  </Carousel>
);

export default React.memo(BienvenidaCarousel);
