import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';
import useProductHook from 'hooks/useProductHook';
import ProductHeader from 'components/app/e-commerce/product/product-details/componentsProductDetailsMain/ProductHeader';
import ProductPrices from 'components/app/e-commerce/product/product-details/componentsProductDetailsMain/ProductPrices';
import ProductAvailability from 'components/app/e-commerce/product/product-details/componentsProductDetailsMain/ProductAvailability';
import ProductRating from 'components/app/e-commerce/product/product-details/componentsProductDetailsMain/ProductRating';
import QuantityAndCart from 'components/app/e-commerce/product/product-details/componentsProductDetailsMain/QuantityAndCart';

const ProductDetailsMain = ({ product }) => {
  const { cantidad } = product;

  const [productCount, setProductCount] = useState(1);
  const { handleAddToCart } = useProductHook(product);

  const handleQuantityChange = (e) => {
    setProductCount(Math.max(1, parseInt(e.target.value, 10)));
  };

  const handleQuantityIncrease = () => {
    setProductCount((prevCount) => prevCount + 1);
  };

  const handleQuantityDecrease = () => {
    setProductCount((prevCount) => (prevCount > 1 ? prevCount - 1 : 1));
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col lg={8} className="text-center">
          <ProductHeader product={product} />
          <ProductPrices product={product} />
          <ProductRating />
          <ProductAvailability isAvailable={cantidad > 0} />
          <QuantityAndCart
            isAvailable={cantidad > 0}
            productCount={productCount}
            onQuantityChange={handleQuantityChange}
            onIncrease={handleQuantityIncrease}
            onDecrease={handleQuantityDecrease}
            onAddToCart={() => handleAddToCart(productCount, true, true, product.nombreProducto, product.precioUnitario)}
          />
        </Col>
      </Row>
    </Container>
  );
};

ProductDetailsMain.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    nombreProducto: PropTypes.string.isRequired,
    descripcionProducto: PropTypes.string.isRequired,
    precioUnitario: PropTypes.any,
    descuento: PropTypes.number,
    superPrecio: PropTypes.any,
    precioMayoreo: PropTypes.any,
    cantidad: PropTypes.number.isRequired,
  }).isRequired,
};

export default ProductDetailsMain;
