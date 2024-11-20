  import React, { useContext, useMemo, useCallback } from 'react';
  import { Card, Row, Col } from 'react-bootstrap';
  import { useNavigate } from 'react-router-dom';
  import { ProductContext } from 'context/Context';
  import useGroupedByCategory from 'hooks/useGroupedByCategory';
  import CategoryCard from 'components/home/componentsHome/CategoryCard';
  import TramiteCategory from 'components/home/componentsHome/MoreServices/tramites/TramiteCategory'; // Importamos el subcomponente TramiteCategory
  import 'components/home/componentsHome/css/CategoryGroup.css';

  const CategoryGroup = () => {
    const { products, loading } = useContext(ProductContext);
    const groupedProducts = useGroupedByCategory(products);
    const navigate = useNavigate();

    const handleCategoryClick = useCallback(
      category => {
        navigate(`/category/${category}`);
      },
      [navigate]
    );

    const categories = useMemo(() => {
      return Object.keys(groupedProducts)
        .slice(0, 6)
        .map(key => ({
          name: key,
          data: groupedProducts[key]
        }));
    }, [groupedProducts]);

    if (loading) {
      return <div>Cargando...</div>;
    }

    return (
      <Card
        className="category-group-card fill-height"
        style={{
          minHeight: '600px',
          width: '100%'
        }}
      >
        <Card.Body className="py-3">
          <h2 className="category-group-title">Descubre nuestras categorías</h2>

          <Row className="mx-n1 flex-grow-1">
            {/* Renderizamos las categorías dinámicas */}
            {categories.map(category => (
              <Col
                xs={6}
                md={4}
                className="px-3 py-2 category-col"
                key={category.name}
                style={{
                  display: 'flex'
                }}
              >
                <div
                  className="category-card-wrapper"
                  onClick={() => handleCategoryClick(category.name)}
                  style={{
                    flex: 1
                  }}
                >
                  <CategoryCard
                    category={category.name}
                    image="/img/category-default.png"
                  />
                </div>
              </Col>
            ))}

            {/* Renderizamos la categoría estática "Trámites" */}
            <TramiteCategory onCategoryClick={handleCategoryClick} />
          </Row>
        </Card.Body>
      </Card>
    );
  };

  export default React.memo(CategoryGroup);
