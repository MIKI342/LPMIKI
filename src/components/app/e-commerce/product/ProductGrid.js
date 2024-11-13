import React, { memo } from 'react';
import { Col } from 'react-bootstrap';
import ProductCard from 'components/app/e-commerce/product/ProductCard';
import Skeleton from 'react-loading-skeleton';

const ProductGrid = memo(({ product, paginationState, dispatch }) => {
  if (!product) {
    return (
      <Col xs={6} lg={4} className="mb-4">
        <Skeleton height={300} />
        <Skeleton count={5} />
      </Col>
    );
  }

  return (
    <Col xs={6} lg={4} className="mb-4">
      <ProductCard product={product} paginationState={paginationState} dispatch={dispatch} />
    </Col>
  );
});

export default ProductGrid;