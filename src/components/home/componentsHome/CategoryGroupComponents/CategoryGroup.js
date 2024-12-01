import React, { useContext, useState, useCallback } from 'react';
import { Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { ProductContext } from 'context/Context';
import useGroupedByCategory from 'hooks/useGroupedByCategory';
import useIsSmallScreen from 'hooks/useIsSmallScreen';
import { useCategoryLogic } from 'hooks/useCategoryLogic';
import DynamicCategories from 'components/home/componentsHome/CategoryGroupComponents/DynamicCategories';
import CategoryToggle from 'components/home/componentsHome/CategoryGroupComponents/CategoryToggle';
import 'components/home/componentsHome/css/CategoryGroup.css';

const CategoryGroup = () => {
  const { products, loading, error } = useContext(ProductContext);
  const groupedProducts = useGroupedByCategory(products);
  const navigate = useNavigate();
  const isSmallScreen = useIsSmallScreen();
  const [showAllCategories, setShowAllCategories] = useState(false);

  const { displayedDynamicCategories } = useCategoryLogic(
    groupedProducts,
    isSmallScreen,
    showAllCategories
  );

  // Función memoizada para manejar el clic en una categoría
  const handleCategoryClick = useCallback(
    (category) => navigate(`/category/${category}`),
    [navigate]
  );

  // Función memoizada para alternar la visualización de categorías
  const toggleCategories = useCallback(() => {
    setShowAllCategories((prev) => !prev);
  }, []);

  // Función para manejar la cantidad de categorías a mostrar
  const categoriesToDisplay = showAllCategories ? displayedDynamicCategories : displayedDynamicCategories.slice(0, 6);

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

        {/* Renderizar las categorías */}
        <DynamicCategories
          categories={categoriesToDisplay}
          onCategoryClick={handleCategoryClick}
        />

        {/* Mostrar el botón de "Ver todas las categorías" solo cuando no se muestran todas */}
        {!isSmallScreen && !showAllCategories && (
          <Button variant="link" onClick={toggleCategories} className="text-decoration-none">
            Ver todas las categorías
          </Button>
        )}

        {/* Mostrar el botón de "Ver menos" solo cuando se muestran todas */}
        {!isSmallScreen && showAllCategories && (
          <Button variant="link" onClick={toggleCategories} className="text-decoration-none">
            Ver menos
          </Button>
        )}

        {/* Alternador para pantallas pequeñas */}
        {isSmallScreen && (
          <CategoryToggle
            showAllCategories={showAllCategories}
            toggleCategories={toggleCategories}
          />
        )}
      </Card.Body>
    </Card>
  );
};

export default React.memo(CategoryGroup);
