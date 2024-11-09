// CartModal.js

import React, { useContext } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { ProductContext } from 'context/Context';
import { useNavigate } from 'react-router-dom';

const CartModal = () => {
  const { cartModal, dispatch } = useContext(ProductContext);
  const navigate = useNavigate();

  const handleClose = () => {
    dispatch({
      type: 'SHOW_CART_MODAL',
      payload: {
        show: false,
        product: {},
        quantity: 0,
        type: 'add',
      },
    });
  };

  const handleViewCart = () => {
    handleClose(); // Cerramos el modal
    navigate('/e-commerce/shopping-cart'); // Navegamos al carrito sin recargar la página
  };

  return (
    <Modal show={cartModal.show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          {cartModal.type === 'add' ? 'Producto Añadido' : 'Producto Actualizado'}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          Has {cartModal.type === 'add' ? 'añadido' : 'actualizado'} el producto{' '}
          {cartModal.product.name} al carrito.
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Seguir Comprando
        </Button>
        <Button variant="primary" onClick={handleViewCart}>
          Ver Carrito
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CartModal;
