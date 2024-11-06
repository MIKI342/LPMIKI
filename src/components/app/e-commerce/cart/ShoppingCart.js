// ShoppingCart.js

import React, { useContext, useEffect, useState } from 'react';
import { Button, Card, Col, Row, Form } from 'react-bootstrap';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CartItem from './CartItem';
import CartModal from './CartModal';
import { ProductContext } from 'context/Context';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from 'context/AuthContext';

const ShoppingCart = () => {
  const { cartItems, getCartTotal } = useContext(ProductContext); // No se llama como función
  const [totalCost, setTotalCost] = useState(0);
  const [promoCode, setPromoCode] = useState('');
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    setTotalCost(getCartTotal); // Asigna directamente el valor memorizado
  }, [cartItems, getCartTotal]);

  const handleCheckout = () => {
    if (!isAuthenticated) {
      toast(<CustomToastContent navigate={navigate} />, {
        position: "top-center",
        autoClose: false,
        closeOnClick: false,
        draggable: false,
        closeButton: false,
        toastId: 'authToast'
      });
    } else {
      navigate('/e-commerce/checkout');
    }
  };

  return (
    <>
      <Card>
        <Card.Header>
          <Row className="justify-content-between">
            <Col md="auto">
              <h5 className="mb-3 mb-md-0">Carrito de Compras ({cartItems.length} Artículos)</h5>
            </Col>
          </Row>
        </Card.Header>
        <Card.Body className="p-0">
          {cartItems.length > 0 ? (
            <>
              {cartItems.map(product => (
                <CartItem key={product.id} product={product} />
              ))}
              <Row className="fw-bold gx-card mx-0">
                <Col className="text-end">Total: ${totalCost.toFixed(2)}</Col>
              </Row>
            </>
          ) : (
            <p>No tienes artículos en tu carrito de compras.</p>
          )}
        </Card.Body>
        {cartItems.length > 0 && (
          <Card.Footer className="bg-body-tertiary d-flex justify-content-end">
            <Button onClick={handleCheckout} variant="primary" size="sm">
              Checkout
            </Button>
          </Card.Footer>
        )}
      </Card>
      <CartModal />
    </>
  );
};

const CustomToastContent = ({ navigate, closeToast }) => (
  <div>
    <p style={{ fontWeight: 'bold' }}>Para hacer la compra necesitas iniciar sesión.</p>
    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
      <Button 
        variant="primary" 
        size="sm" 
        onClick={() => {
          navigate('/authentication/simple/login');
          closeToast();
        }}
        style={{ marginRight: '10px' }}
      >
        Iniciar sesión
      </Button>
      <Button 
        variant="secondary" 
        size="sm" 
        onClick={closeToast}
      >
        Cancelar
      </Button>
    </div>
  </div>
);

export default ShoppingCart;
