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

// Función auxiliar para manejar valores nulos o indefinidos
const getDisplayValue = (value) => (value != null ? value : 'No disponible');

const ProductCard = memo(({ product, paginationState }) => {
  const {
    id,
    nombreProducto,
    descripcionProducto,
    superPrecio,
    cantidad,
    CategoriaProducto,
    images,
    precioUnitario,
    precioMayoreo
  } = product;

  const disponible = cantidad > 0;

  const { handleAddToCart } = useProductHook(product);
  const navigate = useNavigate();
  const { dispatch } = useContext(ProductContext);

  const handleCardClick = useCallback(() => {
    navigate(`/e-commerce/product/product-details/${id}`);
  }, [navigate, id]);

  const handleAddToCartClick = useCallback(
    (event) => {
      event.stopPropagation();
      if (paginationState) {
        const currentPage = paginationState.currentPage;
        handleAddToCart(1, true, true, nombreProducto, superPrecio);
        dispatch({ type: 'STAY_ON_PAGE', payload: { page: currentPage } });
      } else {
        console.error('paginationState is undefined');
      }
    },
    [paginationState, dispatch, handleAddToCart, nombreProducto, superPrecio]
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
              files={images}
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
                {descripcionProducto}
              </Card.Text>
              <p>Super Precio: {getDisplayValue(superPrecio)}</p>
              <p>Precio Unitario: {getDisplayValue(precioUnitario)}</p>
              <p>Precio Mayoreo: {getDisplayValue(precioMayoreo)}</p>
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
    superPrecio: PropTypes.any,
    precioUnitario: PropTypes.any,
    precioMayoreo: PropTypes.any,
    cantidad: PropTypes.number.isRequired,
    images: PropTypes.arrayOf(PropTypes.shape({ url: PropTypes.string })),
    CategoriaProducto: PropTypes.shape({
      nombre: PropTypes.string
    })
  }).isRequired,
  paginationState: PropTypes.object
};

export default ProductCard;
