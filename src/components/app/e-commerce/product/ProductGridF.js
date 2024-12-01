import React from 'react';
import PropTypes from 'prop-types';
import Flex from 'components/common/Flex';
import { Link } from 'react-router-dom';
import { Col } from 'react-bootstrap';
import classNames from 'classnames';
import StarRating from 'components/common/StarRating';

const ProductGrid = ({ product, ...rest }) => {
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

  // Lógica para determinar el precio más bajo (si alguno es null, lo ignoramos)
  const preciosDisponibles = [precioUnitario, precioMayoreo, superPrecio].filter(price => price != null);

  // Obtener el precio más bajo de los precios disponibles
  const precioMasBarato = Math.min(...preciosDisponibles);

  return (
    <Col className="mb-4" {...rest}>
      <Flex
        direction="column"
        justifyContent="between"
        className="border rounded-1 h-100 pb-3"
        style={{ minHeight: '550px' }} // Incrementar altura de la tarjeta
      >
        <div className="overflow-hidden">
          {/* Imagen del producto */}
          <div
            className="position-relative"
            style={{
              height: '400px', // Incrementar espacio disponible para la imagen
              width: '100%'
            }}
          >
            <img
              src={imagen}
              alt={nombreProducto}
              className="img-fluid rounded-top"
              style={{ height: '100%', width: '100%', objectFit: 'cover' }}
            />
          </div>
          <div className="p-3">
            {/* Nombre del producto */}
            <h5 className="fs-9">
              <Link
                className="text-1100"
                to={`/e-commerce/product/product-detailsF/${id}`}
              >
                {nombreProducto}
              </Link>
            </h5>
            {/* Descripción del producto */}
            <p className="fs-10 mb-3 text-muted">
              {descripcionProducto || 'No description available'}
            </p>
            {/* Solo mostrar el precio más barato */}
            <h5 className="fs-md-7 text-warning mb-0 d-flex align-items-center mb-3">
              {`$${precioMasBarato}`}
            </h5>
            {/* Cantidad en stock */}
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
        {/* Calificación */}
        <Flex alignItems="center" className="px-3 justify-content-between">
          {/* StarRating */}
          <StarRating />
        </Flex>
      </Flex>
    </Col>
  );
};


ProductGrid.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.string.isRequired,
    nombreProducto: PropTypes.string.isRequired,
    descripcionProducto: PropTypes.string,
    precioUnitario: PropTypes.number.isRequired,
    precioMayoreo: PropTypes.number.isRequired,
    superPrecio: PropTypes.oneOfType([PropTypes.number, PropTypes.null]),
    cantidad: PropTypes.number.isRequired,
    imagen: PropTypes.string.isRequired
  })
};

export default ProductGrid;
