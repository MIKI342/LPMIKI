// ProductDetailsFooter.jsx
import React from 'react';
import { Tab, Nav, Row, Col, Table, Form, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import StarRating from 'components/common/StarRating';
import createMarkup from 'helpers/createMarkup';

const ProductDetailsFooter = ({
  product: { descripcionLarga, especificaciones = {}, comentarios = [] }
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
          <Nav.Item>
            <Nav.Link
              eventKey="reviews"
              className="px-2 px-md-3 cursor-pointer outline-none"
            >
              Comentarios
            </Nav.Link>
          </Nav.Item>
        </Nav>
        <Tab.Content>
          <Tab.Pane eventKey="description">
            <div
              className="mt-3"
              dangerouslySetInnerHTML={createMarkup(
                descripcionLarga || 'No hay descripción disponible.'
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
          <Tab.Pane eventKey="reviews">
            <Row className="mt-3">
              <Col lg={6} className="mb-4 mb-lg-0">
                {comentarios.map((comentario, index) => (
                  <div key={comentario.id}>
                    <div className="mb-1">
                      <StarRating
                        className="fs-10"
                        readonly
                        rating={comentario.rating}
                      />
                      <span className="ms-3 text-1100 fw-semibold">
                        {comentario.titulo}
                      </span>
                    </div>
                    <p className="fs-10 mb-2 text-600">
                      Por {comentario.autor} • {comentario.fecha}
                    </p>
                    <p className="mb-0">{comentario.texto}</p>
                    {!(index === comentarios.length - 1) && (
                      <hr className="my-4" />
                    )}
                  </div>
                ))}
              </Col>
              <Col lg={6} className="ps-lg-5">
                <Form>
                  <h5 className="mb-3">Escribe tu comentario</h5>
                  <Form.Group className="mb-3">
                    <Form.Label className="mb-0">Rating:</Form.Label>
                    <StarRating className="d-block fs-6" rating={0} />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Nombre:</Form.Label>
                    <Form.Control type="text" />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Email:</Form.Label>
                    <Form.Control type="email" />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Comentario:</Form.Label>
                    <Form.Control as="textarea" rows="3" />
                  </Form.Group>
                  <Button variant="primary" type="submit">
                    Enviar
                  </Button>
                </Form>
              </Col>
            </Row>
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>
    </div>
  );
};

ProductDetailsFooter.propTypes = {
  product: PropTypes.shape({
    descripcionLarga: PropTypes.string,
    especificaciones: PropTypes.object,
    comentarios: PropTypes.arrayOf(PropTypes.object)
  }).isRequired
};

export default ProductDetailsFooter;
