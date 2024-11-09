// context/ProductContext.js

import React, { createContext, useReducer, useMemo, useState, useEffect } from 'react';
import { productReducer } from '../reducers/productReducer';
import useFetchProducts from '../hooks/useFetchProductsDos';

export const AppContext = createContext();
export const ProductContext = createContext({ products: [], loading: true });

const formatText = (text) => {
  if (!text) return '';
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
};

export const ProductProvider = ({ children }) => {
  const { products, loading } = useFetchProducts('/api/v2/products');

  const [formattedProducts, setFormattedProducts] = useState([]);

  useEffect(() => { // Cambiado de useMemo a useEffect
    if (products) {
      const nuevosProductos = products.map((product) => ({
        ...product,
        nombreProducto: formatText(product.nombreProducto),
        descripcionProducto: formatText(product.descripcionProducto),
      }));
      setFormattedProducts(nuevosProductos);
      console.log('Productos formateados actualizados:', nuevosProductos);
    }
  }, [products]);

  const updateProduct = (productId, updatedAttributes) => {
    console.log(`Actualizando producto ID ${productId} con atributos:`, updatedAttributes);
    setFormattedProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === productId ? { ...product, ...updatedAttributes } : product
      )
    );
  };

  const initData = {
    products: [],
    cartItems: [],
    promo: null,
    favouriteItems: [],
    cartModal: {
      show: false,
      product: {},
      quantity: 0,
      type: 'add',
    },
  };

  const [state, dispatch] = useReducer(productReducer, initData);

  useEffect(() => {
    console.log('Estado inicial del carrito:', state.cartItems);
  }, []);

  const getCartTotal = useMemo(() => {
    const total = state.cartItems.reduce(
      (total, item) => total + item.unitPrice * item.quantity,
      0
    );
    console.log('Total del carrito recalculado:', total);
    return total;
  }, [state.cartItems]);

  useEffect(() => {
    console.log('Estado del carrito actualizado:', state.cartItems);
  }, [state.cartItems]);

  const contextValue = useMemo(
    () => ({
      products: formattedProducts.length ? formattedProducts : state.products,
      loading,
      cartItems: state.cartItems,
      promo: state.promo,
      favouriteItems: state.favouriteItems,
      cartModal: state.cartModal,
      dispatch,
      getCartTotal,
      updateProduct,
    }),
    [
      formattedProducts,
      loading,
      state.products,
      state.cartItems,
      state.promo,
      state.favouriteItems,
      state.cartModal,
      dispatch,
      getCartTotal,
    ]
  );

  return (
    <ProductContext.Provider value={contextValue}>
      {children}
    </ProductContext.Provider>
  );
};
