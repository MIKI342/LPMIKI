// hooks/useProductHook.js

import { useContext, useCallback } from 'react';
import { ProductContext } from 'context/Context';

const useProductHook = product => {
  const { cartItems, dispatch } = useContext(ProductContext);

  const handleAddToCart = useCallback(
    (
      quantity = 1,
      showModal = true,
      add = true,
      nombreProducto,
      precioUnitario
    ) => {
      console.log('handleAddToCart ejecutado'); // Log agregado
      const existingProduct = cartItems.find(item => item.id === product.id);

      dispatch({
        type: 'ADD_TO_CART',
        payload: {
          id: product.id,
          name: nombreProducto,
          unitPrice: precioUnitario,
          quantity: add ? quantity : (existingProduct ? -existingProduct.quantity : quantity),
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
    },
    [dispatch, cartItems, product]
  );

  return { handleAddToCart };
};

export default useProductHook;
