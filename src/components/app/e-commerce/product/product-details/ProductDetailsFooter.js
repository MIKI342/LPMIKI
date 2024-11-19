import React from 'react';
import { Tab, Nav, Table } from 'react-bootstrap';
import PropTypes from 'prop-types';
import createMarkup from 'helpers/createMarkup';

const ProductDetailsFooter = ({ product: { descripcionProducto, specification = {} } }) => {
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
          {/* Descripción */}
          <Tab.Pane eventKey="description">
            <div
              className="mt-3"
              dangerouslySetInnerHTML={createMarkup(descripcionProducto || 'No hay descripción disponible.')}
            />
          </Tab.Pane>

          {/* Especificaciones */}
          <Tab.Pane eventKey="specifications">
            <Table className="fs-10 mt-3">
              <tbody>
                {Object.keys(specification).length > 0 ? (
                  Object.keys(specification).map((spec) => (
                    <tr key={spec}>
                      <td className="bg-100" style={{ width: '30%' }}>
                        {spec}
                      </td>
                      <td>{specification[spec]}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="2" className="text-center text-muted">
                      Aquí irán especificaciones de cómo conseguir el super precio o precio mayoreo,
                      por ejemplo, "En la compra de 10 se aplica el precio mayoreo" 
                      
                    </td>
                  </tr>
                )}
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
    descripcionProducto: PropTypes.string, // Cambiado para usar descripcionProducto
    specification: PropTypes.object,
  }),
};

export default ProductDetailsFooter;
