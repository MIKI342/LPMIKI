import React, { memo, useCallback, useContext } from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { ProductContext } from 'context/Context';
import useProductHook from 'hooks/useProductHook';
import ProductCardImage from 'components/app/e-commerce/product/componentsProductCard/ProductCardImage';
import ProductCardDetails from 'components/app/e-commerce/product/componentsProductCard/ProductCardDetails';
import ProductPrices from 'components/app/e-commerce/product/componentsProductCard/ProductPrices';
import ProductStockAndCart from 'components/app/e-commerce/product/componentsProductCard/ProductStockAndCart';

const ProductCard = memo(({ product, paginationState }) => {
  const { id, nombreProducto, precioUnitario, cantidad } = product;

  const { handleAddToCart } = useProductHook(product);
  const navigate = useNavigate();
  const { dispatch } = useContext(ProductContext);

  const handleCardClick = useCallback(() => {
    navigate(`/e-commerce/product/product-details/${id}`);
  }, [navigate, id]);

  const handleAddToCartClick = useCallback(
    (event) => {
      event.stopPropagation();
      if (paginationState) {
        handleAddToCart(1, true, true, nombreProducto, precioUnitario);
        dispatch({ type: 'STAY_ON_PAGE', payload: { page: paginationState.currentPage } });
      } else {
        console.error('paginationState is undefined');
      }
    },
    [paginationState, dispatch, handleAddToCart, nombreProducto, precioUnitario]
  );

  return (
    <Card
   
      className="h-100 shadow-sm"
      style={{
        borderRadius: '10px', // Bordes redondeados
        border: '1px solid black', // Margen negro delgado
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', // Sombra original
        backgroundColor: '#F7F7F7', // Fondo de la tarjeta
      }}
      
      onClick={handleCardClick}
    >
      <Row className="g-0">
        <Col xs={12}>
          <ProductCardImage product={product} />
        </Col>
        <Col xs={12}>
          <Card.Body className="d-flex flex-column justify-content-between h-100">
            <ProductCardDetails product={product} />
            <ProductPrices product={product} />
            <ProductStockAndCart
              isAvailable={cantidad > 0}
              onAddToCart={handleAddToCartClick}
            />
          </Card.Body>
        </Col>
      </Row>
    </Card>
  );
});

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    nombreProducto: PropTypes.string.isRequired,
    descripcionProducto: PropTypes.string.isRequired,
    precioUnitario: PropTypes.number.isRequired,
    superPrecio: PropTypes.number,
    precioMayoreo: PropTypes.number,
    cantidad: PropTypes.number.isRequired,
    images: PropTypes.arrayOf(PropTypes.shape({ url: PropTypes.string })),
    CategoriaProducto: PropTypes.shape({
      nombre: PropTypes.string,
    }),
  }).isRequired,
  paginationState: PropTypes.object,
};

export default ProductCard;
