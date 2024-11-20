//Renderiza un conjunto de "placeholders" de carga cuando los productos aún no están disponibles.
//Se parametriza con la cantidad de elementos (count) para mantener flexibilidad.

import React from 'react';
import { Col } from 'react-bootstrap';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const SkeletonLoader = ({ count }) => {
  return Array(count)
    .fill(null)
    .map((_, index) => (
      <Col key={index} xs={6} md={4}>
        <Skeleton height={350} />
      </Col>
    ));
};

export default SkeletonLoader;
