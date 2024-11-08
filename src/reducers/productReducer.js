// productReducer.js

export const productReducer = (state, action) => {
  console.log('Acción recibida en reducer:', action.type, 'Con payload:', action.payload);
  console.log('Estado anterior del carrito:', JSON.stringify(state.cartItems, null, 2));

  switch (action.type) {
    case 'ADD_TO_CART': {
      const productToAdd = action.payload;
      const existingProductIndex = state.cartItems.findIndex(
        (item) => item.id === productToAdd.id
      );

      if (existingProductIndex !== -1) {
        // El producto ya existe en el carrito, actualizamos la cantidad
        const updatedCartItems = [...state.cartItems];
        const existingProduct = { ...updatedCartItems[existingProductIndex] };

        console.log(`Producto existente encontrado en el carrito: ID ${existingProduct.id}, Cantidad actual: ${existingProduct.quantity}`);

        existingProduct.quantity += productToAdd.quantity;

        console.log(`Cantidad después de la actualización: ${existingProduct.quantity}`);

        if (existingProduct.quantity <= 0) {
          // Si la cantidad es 0 o menor, eliminamos el producto del carrito
          updatedCartItems.splice(existingProductIndex, 1);
          console.log(`Producto ID ${existingProduct.id} eliminado del carrito debido a cantidad <= 0`);
        } else {
          existingProduct.totalPrice = existingProduct.unitPrice * existingProduct.quantity;
          console.log(`Precio total actualizado para el producto ID ${existingProduct.id}: ${existingProduct.totalPrice}`);
          updatedCartItems[existingProductIndex] = existingProduct;
        }

        console.log('Estado actualizado del carrito después de ADD_TO_CART:', JSON.stringify(updatedCartItems, null, 2));

        return {
          ...state,
          cartItems: updatedCartItems,
        };
      } else {
        // El producto no existe en el carrito, lo agregamos
        const newCartItems = [
          ...state.cartItems,
          {
            ...productToAdd,
            totalPrice: productToAdd.unitPrice * productToAdd.quantity,
          },
        ];

        console.log(`Agregando nuevo producto al carrito: ID ${productToAdd.id}, Cantidad: ${productToAdd.quantity}`);
        console.log('Estado actualizado del carrito después de agregar:', JSON.stringify(newCartItems, null, 2));

        return {
          ...state,
          cartItems: newCartItems,
        };
      }
    }

    case 'REMOVE_FROM_CART': {
      console.log(`Eliminando producto del carrito: ID ${action.payload.id}`);
      const filteredCartItems = state.cartItems.filter(
        (item) => item.id !== action.payload.id
      );
      console.log('Estado actualizado del carrito después de REMOVE_FROM_CART:', JSON.stringify(filteredCartItems, null, 2));
      return {
        ...state,
        cartItems: filteredCartItems,
      };
    }

    case 'SHOW_CART_MODAL': {
      console.log('Mostrando modal del carrito:', action.payload);
      return {
        ...state,
        cartModal: { ...action.payload },
      };
    }

    // ... otras acciones ...

    default:
      console.log('Acción no reconocida en reducer:', action.type);
      return state;
  }
};
