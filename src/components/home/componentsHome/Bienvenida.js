import React, { useContext, useMemo } from 'react';
import { Card, Carousel } from 'react-bootstrap';
import { ProductContext } from 'context/Context';
import useRandomProducts from 'hooks/useRandomProducts';
import ProductImage from 'components/app/e-commerce/product/ProductImage';

const Bienvenida = () => {
  // Memoizar el saludo para evitar cálculos innecesarios en cada render
  const greeting = useMemo(() => {
    const hour = new Date().getHours();
    return `¡Buenas ${hour < 12 ? 'días' : 'tardes'}, bienvenido de vuelta!`;
  }, []);

  const { products, loading } = useContext(ProductContext);

  // Llamar al hook useRandomProducts incondicionalmente
  const randomOffers = useRandomProducts(products, 10);

  // Condición de retorno después de los hooks
  if (loading) return <p>Cargando productos...</p>;

  return (
    <Card
      className="overflow-hidden shadow-lg mx-auto"
      style={{
        borderRadius: '15px',
        backgroundColor: '#f8f9fa',
        padding: '10px',
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
        maxWidth: '600px',
        width: '100%',
      }}
    >
      <Card.Header
        className="position-relative text-center"
        style={{
          backgroundColor: 'transparent',
          padding: '10px 15px',
          marginBottom: '10px',
        }}
      >
        <h3
          className="mb-1"
          style={{
            fontWeight: 'bold',
            fontSize: '1.6rem',
            color: '#333',
            textShadow: '0px 1px 3px rgba(0, 0, 0, 0.2)',
            marginBottom: '5px',
          }}
        >
          {greeting}
        </h3>
        <p
          className="mb-0"
          style={{
            fontSize: '1rem',
            color: '#555',
          }}
        >
          Descubre la variedad de productos que tenemos para ti:
        </p>
      </Card.Header>
      <Carousel interval={5000} pause="hover" indicators={false}>
        {randomOffers.map((offer) => (
          <Carousel.Item key={offer.id}>
            <div
              className="position-relative d-flex justify-content-center align-items-center"
              style={{ minHeight: '300px' }}
            >
              {/* Carrusel de imágenes */}
              <ProductImage
                name={offer.nombreProducto}
                id={offer.id}
                category={offer.CategoriaProducto?.nombre || 'Sin Categoría'}
                isNew={offer.isNew || false}
                files={offer.files || []}
                layout="carousel"
                style={{
                  objectFit: 'contain',
                  maxWidth: '100%',
                  maxHeight: '100%',
                }}
              />
              {/* Contenedor del texto siempre visible con fondo mejorado */}
              <div
                className="position-absolute bottom-0 w-100 text-center p-3"
                style={{
                  background: 'rgba(0, 0, 0, 0.4)',
                  borderBottomLeftRadius: '15px',
                  borderBottomRightRadius: '15px',
                  zIndex: 1,
                }}
              >
                <h4
                  className="mb-1"
                  style={{
                    color: '#FFFFFF',
                    fontSize: '1.6rem',
                    fontWeight: 'bold',
                    textShadow: '0px 0px 10px rgba(0, 0, 0, 0.9)',
                  }}
                >
                  {offer.nombreProducto}
                </h4>
                <p
                  className="mb-0"
                  style={{
                    color: '#FFFFFF',
                    fontSize: '1.2rem',
                    textShadow: '0px 0px 8px rgba(0, 0, 0, 0.8)',
                  }}
                >
                  {offer.descripcionProducto}
                </p>
              </div>
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </Card>
  );
};

// Envolver el componente con React.memo para memoización
export default React.memo(Bienvenida);
