//Muestra los productos actuales según la categoría y la página seleccionada.
//Recibe los productos paginados, el estado de la paginación y la función dispatch como props.
//Retorna un mensaje si no hay productos en la categoría.

import React from 'react';
import { Col } from 'react-bootstrap';
import ProductCard from 'components/app/e-commerce/product/ProductGridF';

const ProductList = ({ products, dispatch, paginationState }) => {
  if (!products.length) {
    return <p>No hay productos en esta categoría.</p>;
  }

  return products.map(product => (
    <Col key={product.id} xs={6} md={4}>
      <ProductCard product={product} paginationState={paginationState} dispatch={dispatch} />
    </Col>
  ));
};

export default ProductList;
