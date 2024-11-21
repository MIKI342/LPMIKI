import React from 'react';
import { Row, Col } from 'react-bootstrap';
import CategoryCard from 'components/home/componentsHome/CategoryCard';

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
          xs={6} // 2 categorías por fila en pantallas pequeñas
          md={4} // 3 categorías por fila en pantallas medianas y grandes
          className="px-3 py-2 category-col"
          key={category.name}
          style={{ display: 'flex' }}
        >
          <div
            className="category-card-wrapper"
            style={categoryWrapperStyle}
            onClick={() => onCategoryClick(category.name)}
          >
            <CategoryCard category={category.name} image="/img/category-default.png" />
          </div>
        </Col>
      ))}
    </Row>
  );
};

export default DynamicCategories;
