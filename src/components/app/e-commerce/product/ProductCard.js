import React, { memo, useCallback, useContext } from 'react';
import {
  Card,
  Button,
  Col,
  Row,
  OverlayTrigger,
  Tooltip
} from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import ProductImage from './ProductImage';
import classNames from 'classnames';
import useProductHook from 'hooks/useProductHook';
import StarRating from 'components/home/StarRating';
import { FaShoppingCart } from 'react-icons/fa';
import { ProductContext } from 'context/Context';

const ProductCard = memo(({ product, paginationState }) => {
  const {
    id,
    nombreProducto,
    descripcionProducto,
    precioUnitario,
    descuento,
    superPrecio = 70, // Simula un superPrecio como 10% de descuento
    precioMayoreo = 50, // Simula un precioMayoreo como 15% de descuento
    cantidad,
    CategoriaProducto
  } = product;

  const precioConDescuento = descuento
    ? precioUnitario - (precioUnitario * descuento) / 100
    : precioUnitario;

  const disponible = cantidad > 0;

  const { handleAddToCart } = useProductHook(product);
  const navigate = useNavigate();
  const { dispatch } = useContext(ProductContext);

  const handleCardClick = useCallback(() => {
    navigate(`/e-commerce/product/product-details/${id}`);
  }, [navigate, id]);

  const handleAddToCartClick = useCallback(
    event => {
      event.stopPropagation();
      if (paginationState) {
        const currentPage = paginationState.currentPage;
        handleAddToCart(1, true, true, nombreProducto, precioUnitario);
        dispatch({ type: 'STAY_ON_PAGE', payload: { page: currentPage } });
      } else {
        console.error('paginationState is undefined');
      }
    },
    [paginationState, dispatch, handleAddToCart, nombreProducto, precioUnitario]
  );

  return (
    <Card
      className="h-100 shadow-sm border"
      style={{ borderRadius: '25px', cursor: 'pointer' }}
      onClick={handleCardClick}
    >
      <Row className="g-0">
        <Col xs={12} className="p-0 m-0">
          <div
            className="ratio ratio-1x1"
            style={{
              borderTopLeftRadius: '24px',
              borderTopRightRadius: '24px',
              overflow: 'hidden'
            }}
          >
            <ProductImage
              name={nombreProducto}
              id={id}
              category={CategoriaProducto?.nombre || 'Sin Categoría'}
              files={product.images}
              layout="grid"
              className="w-100 h-100"
            />
          </div>
        </Col>
        <Col xs={12}>
          <Card.Body className="d-flex flex-column justify-content-between h-100">
            <div>
              <Card.Title
                style={{
                  fontSize: '1.3rem',
                  whiteSpace: 'normal',
                  overflowWrap: 'break-word'
                }}
              >
                {nombreProducto}
              </Card.Title>
              <div className="mb-2">
                <StarRating />
              </div>
              <Card.Text
                className="text-muted mb-1"
                style={{ fontSize: '1rem', whiteSpace: 'normal' }}
              >
                {descripcionProducto.length > 40
                  ? `${descripcionProducto.slice(0, 40)}...`
                  : descripcionProducto}
              </Card.Text>
              <h5
                style={{ color: '#FF8C00' }}
                className={classNames('fw-bold', { 'text-danger': descuento })}
              >
                ${precioConDescuento.toFixed(2)}
                {descuento && (
                  <small className="text-muted ms-2">
                    <del>${precioUnitario.toFixed(2)}</del> -{descuento}%
                  </small>
                )}
              </h5>
              {superPrecio && (
                <h6 className="text-primary fw-bold mb-1">
                  super precio: ${superPrecio.toFixed(2)}
                </h6>
              )}
              {precioMayoreo && (
                <h6 className="text-secondary fw-bold">
                  precio mayoreo: ${precioMayoreo.toFixed(2)}
                </h6>
              )}
              <div className="d-flex align-items-center justify-content-between mt-2">
                <Card.Text
                  className={classNames('fw-bold mb-0', {
                    'text-success': disponible,
                    'text-danger': !disponible
                  })}
                  style={{ fontSize: '1rem' }}
                >
                  {disponible ? 'En Stock' : 'Agotado'}
                </Card.Text>
                {disponible && (
                  <OverlayTrigger
                    placement="top"
                    overlay={
                      <Tooltip id={`tooltip-add-to-cart-${id}`}>
                        Añadir al carrito
                      </Tooltip>
                    }
                  >
                    <Button
                      variant="outline-secondary"
                      size="sm"
                      className="d-flex align-items-center justify-content-center ms-2"
                      style={{
                        borderRadius: '8px',
                        width: '40px',
                        height: '40px',
                        padding: 0
                      }}
                      onClick={handleAddToCartClick}
                      aria-label="Añadir al carrito"
                    >
                      <FaShoppingCart size={18} color="#6c757d" />
                    </Button>
                  </OverlayTrigger>
                )}
              </div>
            </div>
          </Card.Body>
        </Col>
      </Row>
    </Card>
  );
});

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    nombreProducto: PropTypes.string.isRequired,
    descripcionProducto: PropTypes.string.isRequired,
    precioUnitario: PropTypes.number.isRequired,
    descuento: PropTypes.number,
    superPrecio: PropTypes.number,
    precioMayoreo: PropTypes.number,
    images: PropTypes.arrayOf(PropTypes.shape({ url: PropTypes.string })),
    cantidad: PropTypes.number.isRequired,
    CategoriaProducto: PropTypes.shape({
      nombre: PropTypes.string
    })
  }).isRequired,
  paginationState: PropTypes.object
};

export default ProductCard;
