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
import useProductHook from 'hooks/useProductHook';
import StarRating from 'components/home/StarRating';
import { FaShoppingCart, FaTags, FaCoins, FaBox } from 'react-icons/fa';
import { ProductContext } from 'context/Context';

const ProductCard = memo(({ product, paginationState }) => {
  const {
    id,
    nombreProducto,
    descripcionProducto,
    precioUnitario,
    superPrecio,
    precioMayoreo,
    cantidad,
    CategoriaProducto,
    images
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
        handleAddToCart(1, true, true, nombreProducto, precioUnitario);
        dispatch({ type: 'STAY_ON_PAGE', payload: { page: currentPage } });
      } else {
        console.error('paginationState is undefined');
      }
    },
    [paginationState, dispatch, handleAddToCart, nombreProducto, precioUnitario]
  );

  // Crear una lista de precios válidos con íconos
  let precios = [
    {
      label: 'Precio unitario',
      value: precioUnitario,
      color: '#FFA500', // Naranja brillante por defecto
      icon: <FaCoins style={{ marginRight: '5px' }} />
    },
    {
      label: 'Super precio',
      value: superPrecio,
      color: '#FFA500', // Naranja si es el más barato
      icon: <FaTags style={{ marginRight: '5px' }} />
    },
    {
      label: 'Precio mayoreo',
      value: precioMayoreo,
      color: '#007BFF', // Azul moderado
      icon: <FaBox style={{ marginRight: '5px' }} />
    }
  ].filter((precio) => precio.value != null); // Filtrar solo precios válidos

  // Ordenar precios para destacar el más barato y el más caro
  precios.sort((a, b) => a.value - b.value);

  if (precios.length > 1) {
    // El precio más barato será naranja brillante
    precios[0].color = '#FFA500';

    // El precio más caro será gris oscuro
    precios[precios.length - 1].color = '#6C757D';
  }

  return (
    <Card
      className="h-100 shadow-sm"
      style={{
        borderRadius: '10px',
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
        backgroundColor: '#F7F7F7' // Fondo gris claro
      }}
      onClick={handleCardClick}
    >
      <Row className="g-0">
        <Col xs={12} className="p-0 m-0">
          <div
            className="ratio ratio-1x1"
            style={{
              borderTopLeftRadius: '10px',
              borderTopRightRadius: '10px',
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
                  fontSize: '1.2rem',
                  color: '#00274D', // Azul oscuro
                  fontWeight: 'bold',
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
                className="text-muted mb-3"
                style={{
                  fontSize: '1rem' // Aumentar tamaño
                }}
              >
                {descripcionProducto.length > 40
                  ? `${descripcionProducto.slice(0, 40)}...`
                  : descripcionProducto}
              </Card.Text>

              {/* Mostrar precios ordenados, destacando el más barato y el más caro */}
              {precios.map((precio, index) => {
                const fontSize = index === 0 ? '1.1rem' : index === 1 ? '1rem' : '0.9rem';
                const fontWeight = index === 0 ? 'bold' : '500';
                const marginBottom = '8px'; // Espacio entre precios
                return (
                  <h5
                    key={precio.label}
                    style={{
                      color: precio.color,
                      fontSize,
                      fontWeight,
                      marginBottom,
                      display: 'flex',
                      alignItems: 'center'
                    }}
                  >
                    {precio.icon}
                    {precio.label}: ${precio.value}
                  </h5>
                );
              })}

              <div className="d-flex align-items-center justify-content-between mt-3">
                <Card.Text
                  className={`fw-bold mb-0 ${
                    disponible ? '' : 'text-danger'
                  }`}
                  style={{
                    fontSize: '1rem',
                    color: disponible ? '#28A745' : '#DC3545' // Verde suave para "En stock"
                  }}
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
                        borderRadius: '50%',
                        width: '40px',
                        height: '40px',
                        padding: 0,
                        backgroundColor: 'transparent',
                        borderColor: '#0056B3' // Azul oscuro para el botón
                      }}
                      onClick={handleAddToCartClick}
                      aria-label="Añadir al carrito"
                    >
                      <FaShoppingCart size={18} color="#0056B3" />
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
    superPrecio: PropTypes.number,
    precioMayoreo: PropTypes.number,
    cantidad: PropTypes.number.isRequired,
    images: PropTypes.arrayOf(PropTypes.shape({ url: PropTypes.string })),
    CategoriaProducto: PropTypes.shape({
      nombre: PropTypes.string
    })
  }).isRequired,
  paginationState: PropTypes.object
};

export default ProductCard;
