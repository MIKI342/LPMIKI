// components/app/e-commerce/product/product-details/ProductDetails.jsx

import React, { useContext } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { Card, Col, Row, Spinner } from 'react-bootstrap';
import ProductDetailsMedia from './ProductDetailsMedia';
import ProductDetailsMain from 'components/app/e-commerce/product/product-details/componentsProductDetailsMain/ProductDetailsMain';
import ProductDetailsFooter from './ProductDetailsFooter';

import { ProductContext } from 'context/Context';
import CartModal from '../../cart/CartModal';
import Flex from 'components/common/Flex';

const ProductDetails = () => {
  const { productId } = useParams();
  const { products, loading } = useContext(ProductContext);

  if (loading) {
    return (
      <div className="d-flex justify-content-center my-5">
        <Spinner animation="border" variant="primary" />
        <span className="ms-2">Cargando producto...</span>
      </div>
    );
  }

  if (!products || products.length === 0) {
    return <div className="text-center mt-5">No hay productos disponibles</div>;
  }

  const product = products.find(product => product.id === productId);

  if (!product) {
    console.error('Producto no encontrado para el ID:', productId);
    return <Navigate to={`/e-commerce/product/product-details/${products[0].id}`} />;
  }

  const images = product.images || (product.imagen ? [product.imagen] : []);

  return (
    <>
      <Card className="shadow-sm mb-4">
        <Card.Body>
          {/* Información principal */}
          <Row>
            <Col lg={6} className="mb-4 mb-lg-0">
              <ProductDetailsMedia product={product} images={images} />
            </Col>
            <Col lg={6} as={Flex} justifyContent="between" direction="column">
              <ProductDetailsMain product={product} />
            </Col>
          </Row>

          {/* Footer alineado */}
          <Row className="mt-4">
            <Col>
              <ProductDetailsFooter product={product} />
            </Col>
          </Row>
        </Card.Body>
      </Card>
      <CartModal />
    </>
  );
};

export default ProductDetails;
