// CategoryGroup.js
import React, { useContext, useMemo, useCallback, useState, useEffect } from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { ProductContext } from 'context/Context';
import useGroupedByCategory from 'hooks/useGroupedByCategory';
import CategoryCard from 'components/home/componentsHome/CategoryCard';
import TramiteCategory from 'components/home/componentsHome/MoreServices/tramites/TramiteCategory';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'; // Importamos los iconos
import 'components/home/componentsHome/css/CategoryGroup.css';

// Hook personalizado para detectar el tamaño de pantalla
const useIsSmallScreen = () => {
  const [isSmall, setIsSmall] = useState(window.innerWidth < 768); // 768px como breakpoint para móviles

  useEffect(() => {
    const handleResize = () => {
      setIsSmall(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return isSmall;
};

const CategoryGroup = () => {
  const { products, loading } = useContext(ProductContext);
  const groupedProducts = useGroupedByCategory(products);
  const navigate = useNavigate();
  const isSmallScreen = useIsSmallScreen();
  const [showAllCategories, setShowAllCategories] = useState(false);

  const handleCategoryClick = useCallback(
    (category) => {
      navigate(`/category/${category}`);
    },
    [navigate]
  );

  // Obtener todas las categorías dinámicas
  const allDynamicCategories = useMemo(() => {
    return Object.keys(groupedProducts).map((key) => ({
      name: key,
      data: groupedProducts[key],
    }));
  }, [groupedProducts]);

  // Filtrar las categorías principales dinámicas (en este caso, solo "Vape")
  const mainDynamicCategories = useMemo(() => {
    return allDynamicCategories.filter(
      (category) => category.name.toLowerCase() === 'vape'
    );
  }, [allDynamicCategories]);

  // Determinar qué categorías dinámicas mostrar
  const displayedDynamicCategories = useMemo(() => {
    if (isSmallScreen) {
      return showAllCategories ? allDynamicCategories : mainDynamicCategories;
    }
    return allDynamicCategories;
  }, [isSmallScreen, showAllCategories, allDynamicCategories, mainDynamicCategories]);

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <Card
      className="category-group-card fill-height"
      style={{
        minHeight: '600px',
        width: '100%',
      }}
    >
      <Card.Body className="py-3">
        <h2 className="category-group-title">Descubre nuestras categorías</h2>

        <Row className="mx-n1 flex-grow-1">
          {/* Renderizado de categorías dinámicas */}
          {displayedDynamicCategories.map((category) => (
            <Col
              xs={6}
              md={4}
              className="px-3 py-2 category-col"
              key={category.name}
              style={{
                display: 'flex',
              }}
            >
              <div
                className="category-card-wrapper"
                onClick={() => handleCategoryClick(category.name)}
                style={{
                  flex: 1,
                  cursor: 'pointer',
                }}
              >
                <CategoryCard
                  category={category.name}
                  image="/img/category-default.png"
                />
              </div>
            </Col>
          ))}

          {/* Renderizado de la categoría estática "Trámites" */}
          <Col
            xs={12} // Ocupa todo el ancho en pantallas pequeñas y grandes
            className="px-3 py-2 category-col"
            key="tramites"
            style={{
              display: 'flex',
            }}
          >
            <div
              className="category-card-wrapper"
              onClick={() => handleCategoryClick('tramites')}
              style={{
                flex: 1,
                cursor: 'pointer',
              }}
            >
              <TramiteCategory onCategoryClick={handleCategoryClick} />
            </div>
          </Col>
        </Row>

        {/* Elemento para alternar entre ver todas las categorías y ver menos en pantallas pequeñas */}
        {isSmallScreen && (
          <div className="text-center mt-3">
            <div
              onClick={() => setShowAllCategories((prev) => !prev)}
              className="toggle-categories"
            >
              {showAllCategories ? 'Ver menos' : 'Ver todas las categorías'}
              <div className={`toggle-icon ${showAllCategories ? 'open' : ''}`}>
                {showAllCategories ? <FaChevronUp /> : <FaChevronDown />}
              </div>
            </div>
          </div>
        )}
      </Card.Body>
    </Card>
  );
};

export default React.memo(CategoryGroup);
