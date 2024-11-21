import React from 'react';
import { Row, Col } from 'react-bootstrap';
import CategoryCard from 'components/home/componentsHome/CategoryCard';
import TramiteCategory from 'components/home/componentsHome/MoreServices/tramites/TramiteCategory';

const DynamicCategories = ({ categories, onCategoryClick }) => {
  const categoryWrapperStyle = {
    flex: 1,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  };

  return (
    <Row className="mx-n1 flex-grow-1">
      {categories.map((category) => (
        <Col
          xs={6} // Dos categorías por fila en pantallas pequeñas
          md={4} // Tres categorías por fila en pantallas medianas y grandes
          className="px-3 py-2 category-col"
          key={category.name}
          style={{ display: 'flex' }}
        >
          <div className="category-card-wrapper" style={categoryWrapperStyle}>
            {/* Renderizado condicional para "Trámites" */}
            {category.name.toLowerCase() === 'trámites' ? (
              <TramiteCategory
                onCategoryClick={onCategoryClick}
                style={{
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              />
            ) : (
              <CategoryCard category={category.name} image="/img/category-default.png" />
            )}
          </div>
        </Col>
      ))}
    </Row>
  );
};

export default DynamicCategories;
