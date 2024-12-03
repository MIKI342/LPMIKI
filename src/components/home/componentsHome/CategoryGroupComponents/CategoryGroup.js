import React, { useContext, useCallback } from 'react';
import { Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { ProductContext } from 'context/Context';
import useGroupedByCategory from 'hooks/useGroupedByCategory';
import useIsSmallScreen from 'hooks/useIsSmallScreen';
import { useCategoryLogic } from 'hooks/useCategoryLogic';
import DynamicCategories from 'components/home/componentsHome/CategoryGroupComponents/DynamicCategories';
import 'components/home/componentsHome/css/CategoryGroup.css';

const CategoryGroup = () => {
  const { products, loading, error } = useContext(ProductContext);
  const groupedProducts = useGroupedByCategory(products);
  const navigate = useNavigate();
  const isSmallScreen = useIsSmallScreen();

  const { displayedDynamicCategories } = useCategoryLogic(
    groupedProducts,
    isSmallScreen
  );

  // Función memoizada para manejar el clic en una categoría
  const handleCategoryClick = useCallback(
    (category) => navigate(`/category/${category}`),
    [navigate]
  );

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>Error al cargar las categorías: {error.message}</div>;
  }

  return (
    <Card className="category-group-card">
      <Card.Body className="py-3 d-flex flex-column">
        <h2 className="category-group-title">Descubre nuestras categorías</h2>

        {/* Contenedor scrollable para categorías */}
        <div className="categories-scroll-container">
          <DynamicCategories
            categories={displayedDynamicCategories}
            onCategoryClick={handleCategoryClick}
          />
        </div>
      </Card.Body>
    </Card>
  );
};

export default React.memo(CategoryGroup);
