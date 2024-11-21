import React from 'react';
import { Col } from 'react-bootstrap';
import CategoryCard from 'components/home/componentsHome/CategoryCard';

const TramiteCategory = ({ onCategoryClick }) => {
  return (
    <Col
      xs={6}
      md={4}
      className="px-3 py-2 category-col" // Misma clase que las demás categorías
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        className="category-card-wrapper" // Misma clase que las demás categorías
        onClick={() => onCategoryClick('Tramites')}
        style={{
          flex: 1,
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <CategoryCard
          category="TRÁMITES"
          image="/img/tramites.png" // Imagen específica para "Trámites"
        />
      </div>
    </Col>
  );
};

export default TramiteCategory;
