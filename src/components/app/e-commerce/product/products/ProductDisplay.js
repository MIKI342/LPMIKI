import React from 'react';
import { Row } from 'react-bootstrap'; // Añadir la importación de Row
import ProductList from 'components/app/e-commerce/product/ProductListF';
import ProductGrid from 'components/app/e-commerce/product/ProductGridF';

const ProductDisplay = ({ products, isList, layout }) => (
  <Row className={isList ? 'g-0' : ''}>
    {products.map((product, index) =>
      layout === 'list' ? (
        <ProductList product={product} key={product.id} index={index} />
      ) : (
        <ProductGrid product={product} key={product.id} md={6} lg={4} index={index} />
      )
    )}
  </Row>
);

export default ProductDisplay;
