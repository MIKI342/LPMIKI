// productReducer.js

export const productReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const productToAdd = action.payload;
      const existingProductIndex = state.cartItems.findIndex(
        item => item.id === productToAdd.id
      );

      if (existingProductIndex !== -1) {
        // El producto ya existe en el carrito, actualizamos la cantidad
        const updatedCartItems = [...state.cartItems];
        const existingProduct = updatedCartItems[existingProductIndex];

        existingProduct.quantity += productToAdd.quantity;

        if (existingProduct.quantity <= 0) {
          // Si la cantidad es 0 o menor, eliminamos el producto del carrito
          updatedCartItems.splice(existingProductIndex, 1);
        } else {
          existingProduct.totalPrice = existingProduct.unitPrice * existingProduct.quantity;
        }

        return {
          ...state,
          cartItems: updatedCartItems
        };
      } else {
        // El producto no existe en el carrito, lo agregamos
        return {
          ...state,
          cartItems: [
            ...state.cartItems,
            {
              ...productToAdd,
              totalPrice: productToAdd.unitPrice * productToAdd.quantity
            }
          ]
        };
      }
    }

    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cartItems: state.cartItems.filter(item => item.id !== action.payload.id)
      };

    case 'SHOW_CART_MODAL':
      return {
        ...state,
        cartModal: { ...action.payload }
      };

    // ... otras acciones ...

    default:
      return state;
  }
};

