import React from 'react';
import { Card } from 'react-bootstrap';
import BienvenidaCarousel from './BienvenidaCarousel';

const BienvenidaDesign = ({ greeting, randomOffers }) => (
  <Card
    className="bienvenida-card overflow-hidden shadow-lg fill-height"
    style={{
      borderRadius: '15px',
      backgroundColor: '#f8f9fa',
      padding: '0px',
      boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
      width: '100%',
      minHeight: '500px',
    }}
  >
    <Card.Header
      className="position-relative text-center"
      style={{
        backgroundColor: 'transparent',
        padding: '10px 15px',
        marginBottom: '10px',
      }}
    >
      <h3
        className="mb-1"
        style={{
          fontWeight: 'bold',
          fontSize: '1.6rem',
          color: '#333',
          textShadow: '0px 1px 3px rgba(0, 0, 0, 0.2)',
          marginBottom: '5px',
        }}
      >
        {greeting}
      </h3>
      <p
        className="mb-0"
        style={{
          fontSize: '1rem',
          color: '#555',
        }}
      >
        Descubre la variedad de productos y servicios que tenemos para ti:
      </p>
    </Card.Header>
    {/* Subcomponente del carrusel */}
    <BienvenidaCarousel randomOffers={randomOffers} />
  </Card>
);

export default React.memo(BienvenidaDesign);

