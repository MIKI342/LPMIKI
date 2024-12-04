import React, { createContext, useReducer, useMemo, useState, useEffect } from 'react';
import useFetchProducts from 'hooks/useFetchProductsDos'; // Asegúrate de importar el hook correcto

export const AppContext = createContext();
export const ProductContext = createContext({ products: [], loading: true });

// Función para formatear el texto de los productos
const formatText = (text) => {
  if (!text) return '';
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
};

export const ProductProvider = ({ children }) => {
  const { products, loading } = useFetchProducts('/api/v3/products');

  const [formattedProducts, setFormattedProducts] = useState([]);

  // Actualización de los productos cuando cambian desde la API
  useEffect(() => {
    if (products && products.length) {
      const nuevosProductos = products.map((product) => {
        const productoFormateado = {
          ...product,
          nombreProducto: formatText(product.nombreProducto),
          descripcionProducto: formatText(product.descripcionProducto),
          imagen: product.imagen, // Asegúrate de que la imagen esté correctamente estructurada
        };
        return productoFormateado;
      });

      setFormattedProducts(nuevosProductos);
    }
  }, [products]); // Este efecto se ejecuta solo cuando `products` cambia

  // Función para actualizar un producto específico
  const updateProduct = (productId, updatedAttributes) => {
    setFormattedProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === productId ? { ...product, ...updatedAttributes } : product
      )
    );
  };

  // Memoización del contexto para evitar renders innecesarios
  const contextValue = useMemo(
    () => ({
      products: formattedProducts.length ? formattedProducts : [],
      loading,
      updateProduct,
    }),
    [formattedProducts, loading] // Se actualiza solo cuando `formattedProducts` o `loading` cambian
  );

  return (
    <ProductContext.Provider value={contextValue}>
      {children}
    </ProductContext.Provider>
  );
};
