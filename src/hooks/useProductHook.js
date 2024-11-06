// useProductHook.js

import { useContext } from 'react';
import { ProductContext } from 'context/Context';

const useProductHook = product => {
  const { cartItems, dispatch } = useContext(ProductContext);

  const handleAddToCart = (
    quantity = 1,
    showModal = true,
    add = true,
    nombreProducto,
    precioUnitario
  ) => {
    const existingProduct = cartItems.find(item => item.id === product.id);

    dispatch({
      type: 'ADD_TO_CART',
      payload: {
        id: product.id,
        name: nombreProducto,
        unitPrice: precioUnitario,
        quantity: add ? quantity : quantity - (existingProduct ? existingProduct.quantity : 0),
        files: product.files || [{ src: '/img/descarga.jpeg' }]
      }
    });

    if (showModal) {
      dispatch({
        type: 'SHOW_CART_MODAL',
        payload: {
          show: true,
          product: {
            id: product.id,
            name: nombreProducto,
            unitPrice: precioUnitario,
            files: product.files || [{ src: '/img/descarga.jpeg' }]
          },
          quantity,
          type: 'add'
        }
      });
    }
  };

  return { handleAddToCart };
};

export default useProductHook;
