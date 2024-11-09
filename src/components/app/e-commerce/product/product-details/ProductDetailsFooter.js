import React from 'react';
import { Tab, Nav } from 'react-bootstrap';
import PropTypes from 'prop-types';

const ProductDetailsFooter = ({
  product: {
    descripcionProducto,
    precioUnitario,
    cantidad,
    estado
  }
}) => {
  return (
    <div className="mt-4">
      <Tab.Container defaultActiveKey="description">
        <Nav variant="tabs" className="mb-3">
          <Nav.Item>
            <Nav.Link eventKey="description">Description</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="specifications">Specifications</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="reviews">Reviews</Nav.Link>
          </Nav.Item>
        </Nav>
        <Tab.Content>
          <Tab.Pane eventKey="description">
            <p>{descripcionProducto}</p>
          </Tab.Pane>
          <Tab.Pane eventKey="specifications">
            <p>Details about specifications.</p>
          </Tab.Pane>
          <Tab.Pane eventKey="reviews">
            <p>User reviews here.</p>
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>
    </div>
  );
};

ProductDetailsFooter.propTypes = {
  product: PropTypes.shape({
    descripcionProducto: PropTypes.string.isRequired,
    precioUnitario: PropTypes.number.isRequired,
    cantidad: PropTypes.number.isRequired,
    estado: PropTypes.string.isRequired
  }).isRequired
};

export default ProductDetailsFooter;
