// Archivo: CategoryGroup.jsx

import React, { useContext, useMemo, useCallback } from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { ProductContext } from 'context/Context';
import useGroupedByCategory from 'hooks/useGroupedByCategory';
import CategoryCard from 'components/home/componentsHome/CategoryCard';
import 'components/home/componentsHome/css/CategoryGroup.css';

const CategoryGroup = () => {
  // Obtener los productos y estado de carga desde el contexto
  const { products, loading } = useContext(ProductContext);
  // Agrupar los productos por categoría utilizando el hook personalizado
  const groupedProducts = useGroupedByCategory(products);
  // Hook para manejar la navegación programática
  const navigate = useNavigate();

  // Función para manejar el clic en una categoría y navegar a la vista de esa categoría
  const handleCategoryClick = useCallback(
    (category) => {
      navigate(`/category/${category}`);
    },
    [navigate]
  );

  // Seleccionar las primeras seis categorías para mostrar, memorizando el resultado
  const categories = useMemo(() => {
    return Object.keys(groupedProducts)
      .slice(0, 6)
      .map((key) => ({
        name: key,
        data: groupedProducts[key],
      }));
  }, [groupedProducts]);

  // Mostrar mensaje de carga mientras los productos se están recuperando
  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <Card
      className="category-group-card fill-height" // Añadimos la clase personalizada
      style={{
        minHeight: '600px', // Aumenta la altura mínima si lo deseas
        width: '100%', // Aseguramos que ocupe el ancho completo
      }}
    >
      <Card.Body className="py-3">
        {/* Título impactante */}
        <h2 className="category-group-title">Descubre Nuestras Categorías</h2>

        <Row className="mx-n1 flex-grow-1">
          {/* Mapear cada categoría y renderizar un componente CategoryCard */}
          {categories.map((category) => (
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
                }}
              >
                <CategoryCard
                  category={category.name}
                  image="/img/category-default.png" // Puedes reemplazar con una lógica para asignar imágenes específicas
                />
              </div>
            </Col>
          ))}
        </Row>
      </Card.Body>
    </Card>
  );
};

// Memorización del componente para evitar re-renderizados innecesarios
export default React.memo(CategoryGroup);
