import React, { useContext } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { Card, Col, Row } from 'react-bootstrap';
import ProductDetailsMedia from './ProductDetailsMediaF';
import ProductDetailsMain from './ProductDetailsMainF';
import ProductDetailsFooter from './ProductDetailsFooterF';
import { ProductContext } from 'context/Context';
import Flex from 'components/common/Flex';

const ProductDetails = () => {
  const { productId } = useParams();

  const {
    products
  } = useContext(ProductContext);

  const product = products.find(product => product.id === productId);

  return product ? (
    <>
      <Card>
        <Card.Body>
          <Row>
            <Col lg={6} className="mb-4 mb-lg-0">
              <ProductDetailsMedia product={product} />
            </Col>
            <Col lg={6} as={Flex} justifyContent="between" direction="column">
              <ProductDetailsMain product={product} />
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <ProductDetailsFooter product={product} />
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </>
  ) : (
    <Navigate to={`/e-commerce/product/product-detailsF/${products[0]?.id}`} />
  );
};

export default ProductDetails;
