// ProductDetailsFooter.jsx
import React from 'react';
import { Tab, Nav, Row, Col, Table, Form, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import createMarkup from 'helpers/createMarkup';

const ProductDetailsFooter = ({
  product: { descripcionProducto, especificaciones = {}, comentarios = [] }
}) => {
  return (
    <div className="mt-4">
      <Tab.Container defaultActiveKey="description">
        <Nav variant="tabs">
          <Nav.Item>
            <Nav.Link
              eventKey="description"
              className="ps-0 cursor-pointer outline-none"
            >
              Descripción
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              eventKey="specifications"
              className="px-2 px-md-3 cursor-pointer outline-none"
            >
              Especificaciones
            </Nav.Link>
          </Nav.Item>
        </Nav>
        <Tab.Content>
          <Tab.Pane eventKey="description">
            <div
              className="mt-3"
              dangerouslySetInnerHTML={createMarkup(
                descripcionProducto || 'No hay descripción disponible.'
              )}
            />
          </Tab.Pane>
          <Tab.Pane eventKey="specifications">
            <Table className="fs-10 mt-3">
              <tbody>
                {Object.keys(especificaciones).map(spec => (
                  <tr key={spec}>
                    <td className="bg-100" style={{ width: '30%' }}>
                      {spec}
                    </td>
                    <td>{especificaciones[spec]}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>
    </div>
  );
};

ProductDetailsFooter.propTypes = {
  product: PropTypes.shape({
    descripcionProducto: PropTypes.string,
    especificaciones: PropTypes.object,
    comentarios: PropTypes.arrayOf(PropTypes.object)
  }).isRequired
};

export default ProductDetailsFooter;
  