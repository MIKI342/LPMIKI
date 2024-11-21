import React, { useContext, useState, useCallback } from 'react';
import { Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { ProductContext } from 'context/Context';
import useGroupedByCategory from 'hooks/useGroupedByCategory';
import useIsSmallScreen from 'hooks/useIsSmallScreen';
import { useCategoryLogic } from 'hooks/useCategoryLogic';
import DynamicCategories from 'components/home/componentsHome/CategoryGroupComponents/DynamicCategories';
import CategoryToggle from 'components/home/componentsHome/CategoryGroupComponents/CategoryToggle';
import 'components/home/componentsHome/css/CategoryGroup.css';

const CategoryGroup = () => {
  const { products, loading } = useContext(ProductContext);
  const groupedProducts = useGroupedByCategory(products);
  const navigate = useNavigate();
  const isSmallScreen = useIsSmallScreen();
  const [showAllCategories, setShowAllCategories] = useState(false);

  const { displayedDynamicCategories } = useCategoryLogic(
    groupedProducts,
    isSmallScreen,
    showAllCategories
  );

  const handleCategoryClick = useCallback(
    (category) => navigate(`/category/${category}`),
    [navigate]
  );

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <Card className="category-group-card fill-height" style={{ minHeight: '600px', width: '100%' }}>
      <Card.Body className="py-3">
        <h2 className="category-group-title">Descubre nuestras categorías</h2>

        {/* Renderizado de todas las categorías */}
        <DynamicCategories
          categories={displayedDynamicCategories}
          onCategoryClick={handleCategoryClick}
        />

        {/* Alternador para pantallas pequeñas */}
        {isSmallScreen && (
          <CategoryToggle
            showAllCategories={showAllCategories}
            toggleCategories={() => setShowAllCategories((prev) => !prev)}
          />
        )}
      </Card.Body>
    </Card>
  );
};

export default React.memo(CategoryGroup);
