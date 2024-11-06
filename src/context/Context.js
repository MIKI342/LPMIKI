// context/ProductContext.js

import React, { createContext, useReducer, useMemo, useState } from 'react';
import { productReducer } from '../reducers/productReducer';
import useFetchProducts from '../hooks/useFetchProductsDos';

export const AppContext = createContext();
export const ProductContext = createContext({ products: [], loading: true });

/**
 * Función para formatear texto con solo la primera letra en mayúscula.
 * @param {string} text - Texto a formatear.
 * @returns {string} - Texto formateado.
 */
const formatText = (text) => {
  if (!text) return '';
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
};

export const ProductProvider = ({ children }) => {
  const { products, loading } = useFetchProducts('/api/v2/products');

  // Estado local para almacenar productos con formato aplicado
  const [formattedProducts, setFormattedProducts] = useState([]);

  // Formatear productos y almacenarlos en el estado solo si `products` cambia
  useMemo(() => {
    if (products) {
      setFormattedProducts(
        products.map((product) => ({
          ...product,
          nombreProducto: formatText(product.nombreProducto),
          descripcionProducto: formatText(product.descripcionProducto),
        }))
      );
    }
  }, [products]);

  // Función para actualizar un producto específico
  const updateProduct = (productId, updatedAttributes) => {
    setFormattedProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === productId
          ? { ...product, ...updatedAttributes }
          : product
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

  const getCartTotal = useMemo(() => {
    return state.cartItems.reduce(
      (total, item) => total + item.unitPrice * item.quantity,
      0
    );
  }, [state.cartItems]);

  // Contexto con datos y la función `updateProduct` para actualizar productos
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
      updateProduct, // Proporcionamos la función de actualización
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
