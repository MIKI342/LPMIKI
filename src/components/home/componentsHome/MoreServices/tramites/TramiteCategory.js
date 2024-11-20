import React from 'react';
import { Col } from 'react-bootstrap';
import CategoryCard from 'components/home/componentsHome/CategoryCard'; // Reutilizamos el mismo componente para consistencia
import 'components/home/componentsHome/css/CategoryGroup.css';

const TramiteCategory = ({ onCategoryClick }) => {
  return (
    <Col
      xs={6}
      md={4}
      className="px-3 py-2 category-col"
      style={{
        display: 'flex',
      }}
    >
      <div
        className="category-card-wrapper"
        onClick={() => onCategoryClick('Tramites')}
        style={{
          flex: 1,
        }}
      >
        {/* Reutilizamos el componente CategoryCard */}
        <CategoryCard
          category="TRÁMITES"
          image="/img/tramites.png" // Imagen específica para "Trámites"
        />
      </div>
    </Col>
  );
};

export default TramiteCategory;




