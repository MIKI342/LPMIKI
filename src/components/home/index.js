

import React from 'react';
import { Col, Row } from 'react-bootstrap';
import CategoryGroup from 'components/home/componentsHome/CategoryGroup';
import Bienvenida from 'components/home/componentsHome/Bienvenida';
import Map from 'components/home/componentsHome/Map/map';

const Ecommerce = () => {
  return (
    <>
      <Row className="g-4 mb-5 justify-content-center">
        <Col xs={12} md={6}>
          <Bienvenida />
        </Col>
        <Col xs={12} md={6}> 
          <CategoryGroup/>
        </Col>
      </Row>
      <Row className="g-5 mb-5 justify-content-around">
        <Col lg={6}>
          <Map/>
        </Col>
      </Row>
    </>
  );
};

export default Ecommerce;
