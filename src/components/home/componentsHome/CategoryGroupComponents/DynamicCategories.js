import React, { useCallback, useMemo } from 'react';
import { Row, Col } from 'react-bootstrap';
import CategoryCard from 'components/home/componentsHome/CategoryGroupComponents/CategoryCard';
import PropTypes from 'prop-types';

const DynamicCategories = ({ categories, onCategoryClick }) => {
  const categoryWrapperStyle = useMemo(
    () => ({
      flex: 1,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%',
    }),
    []
  );

  // Función para generar handlers memoizados por categoría
  const generateOnImageClick = useCallback(
    (categoryName) => {
      return () => onCategoryClick(categoryName);
    },
    [onCategoryClick]
  );

  return (
    <Row className="mx-n1 flex-grow-1">
      {categories.map((category) => (
        <Col
          xs={6}
          md={4}
          className="px-3 py-2 category-col"
          key={category.name}
          style={{ display: 'flex' }}
        >
          <div className="category-card-wrapper" style={categoryWrapperStyle}>
            <CategoryCard
              category={category.name}
              products={category.data} // Pasamos los productos asociados
              onImageClick={generateOnImageClick(category.name)}
            />
          </div>
        </Col>
      ))}
    </Row>
  );
};

DynamicCategories.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      data: PropTypes.array.isRequired, // Aseguramos que la categoría incluye sus productos
    })
  ).isRequired,
  onCategoryClick: PropTypes.func.isRequired,
};

export default React.memo(DynamicCategories);
