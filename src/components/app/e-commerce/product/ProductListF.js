import React from 'react';
import PropTypes from 'prop-types';
import { Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import StarRating from 'components/common/StarRating'; // Asegúrate de importar el componente
import Flex from 'components/common/Flex';

const ProductList = ({ product, index }) => {
  const {
    id,
    nombreProducto,
    descripcionProducto,
    precioUnitario,
    precioMayoreo,
    superPrecio,
    cantidad,
    imagen
  } = product;

  return (
    <>
      <Col
        xs={12}
        className={classNames('p-x1', {
          'bg-100': index % 2 !== 0 // Alternar el color de fondo
        })}
      >
        <Row>
          {/* Columna para la imagen del producto */}
          <Col sm={5} md={4}>
            <div
              className="position-relative"
              style={{
                height: '300px', // Incrementar espacio para la imagen
                width: '100%'
              }}
            >
              <img
                src={imagen}
                alt={nombreProducto}
                className="img-fluid rounded"
                style={{
                  height: '100%',
                  width: '100%',
                  objectFit: 'cover' // Asegurarse de que la imagen ocupe todo el espacio disponible
                }}
              />
            </div>
          </Col>

          {/* Columna para la información del producto */}
          <Col sm={7} md={8}>
            <Row className="h-100">
              <Col lg={8}>
                {/* Nombre del producto */}
                <h5 className="mt-3 mt-sm-0">
                  <Link
                    to={`/e-commerce/product/product-detailsF/${id}`}
                    className="text-1100 fs-9 fs-lg-8"
                  >
                    {nombreProducto}
                  </Link>
                </h5>
                {/* Descripción del producto */}
                <p className="fs-10 mb-2 mb-md-3 text-muted">
                  {descripcionProducto || 'No description available'}
                </p>

                {/* Lista de características adicionales */}
                <ul className="list-unstyled d-none d-lg-block">
                  <li>
                    <FontAwesomeIcon icon="circle" transform="shrink-12" />
                    <span>Cantidad disponible: {cantidad}</span>
                  </li>
                  <li>
                    <FontAwesomeIcon icon="circle" transform="shrink-12" />
                    <span>Precio Mayoreo: ${precioMayoreo}</span>
                  </li>
                </ul>
              </Col>

              {/* Columna para precios, calificación y acciones */}
              <Col lg={4} as={Flex} justifyContent="between" direction="column">
                <div>
                  {/* Precio del producto */}
                  <h4 className="fs-8 fs-md-7 text-warning mb-0">
                    {`$${superPrecio || precioUnitario}`}
                  </h4>
                  {superPrecio && (
                    <h5 className="fs-10 text-500 mb-0 mt-1">
                      <del>{`$${precioUnitario}`}</del>
                    </h5>
                  )}

                  {/* Calificación del producto */}
                  <div className="mb-2 mt-3">
                    <StarRating readonly />
                  </div>

                  {/* Stock */}
                  <div className="d-none d-lg-block">
                    <p className="fs-10 mb-1">
                      Stock:{' '}
                      <strong
                        className={classNames({
                          'text-success': cantidad > 0,
                          'text-danger': cantidad === 0
                        })}
                      >
                        {cantidad > 0 ? `${cantidad} disponibles` : 'Agotado'}
                      </strong>
                    </p>
                  </div>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </Col>
    </>
  );
};

ProductList.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.string.isRequired,
    nombreProducto: PropTypes.string.isRequired,
    descripcionProducto: PropTypes.string,
    precioUnitario: PropTypes.number.isRequired,
    precioMayoreo: PropTypes.number.isRequired,
    superPrecio: PropTypes.oneOfType([PropTypes.number, PropTypes.null]),
    cantidad: PropTypes.number.isRequired,
    imagen: PropTypes.string.isRequired
  }),
  index: PropTypes.number
};

export default ProductList;
