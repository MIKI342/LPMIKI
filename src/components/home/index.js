import React from 'react';
import { Col, Row } from 'react-bootstrap';
import CategoryGroup from 'components/home/componentsHome/CategoryGroup';
import Bienvenida from 'components/home/componentsHome/Bienvenida';
import Map from 'components/home/componentsHome/Map/map';
import MasServicios from 'components/home/componentsHome/MoreServices/MasServicios';

const Ecommerce = () => {
  return (
    <>
      <Row className="g-0 mb-1 justify-content-center"> {/* Sin cambios aquí */}
        <Col xs={12} md={6} className="mb-2"> {/* Agregamos mb-2 para espaciar solo el primer componente */}
          <Bienvenida />
        </Col>

        <Col xs={12} md={6} className="mb-2"> {/* Añadido para que MasServicios siga la misma distribución */}
          <MasServicios />
        </Col>

        <Col xs={12} md={6}> {/* Sin margen adicional para mantener el espacio actual con el tercer componente */}
          <CategoryGroup />
        </Col>
      </Row>

      <Row className="g-0 mb-0 justify-content-around" style={{ marginTop: '-10px' }}> {/* Ajuste en el tercer componente */}
        <Col lg={6}>
          <Map />
        </Col>
      </Row>
    </>
  );
};

export default Ecommerce;
