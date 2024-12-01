import React, { createContext, useReducer, useMemo, useState, useEffect } from 'react';
import useFetchProducts from 'hooks/useFetchProductsDos'; // Asegúrate de importar el hook correcto

export const AppContext = createContext();
export const ProductContext = createContext({ products: [], loading: true });

const formatText = (text) => {
  if (!text) return '';
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
};

export const ProductProvider = ({ children }) => {
  const { products, loading } = useFetchProducts('/api/v3/products');

  const [formattedProducts, setFormattedProducts] = useState([]);

  useEffect(() => {
    if (products && products.length) {
      const nuevosProductos = products.map((product) => {
        // **Añadimos un console.log para verificar cada producto antes de formatear**
        console.log('Producto recibido en ProductContext:', product);

        const productoFormateado = {
          ...product,
          nombreProducto: formatText(product.nombreProducto),
          descripcionProducto: formatText(product.descripcionProducto),
          // Asegurarse de que la imagen está correctamente estructurada
          imagen: product.imagen,
        };

        // **Añadimos un console.log para verificar el producto después de formatear**
        console.log('Producto formateado:', productoFormateado);

        return productoFormateado;
      });

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

  const contextValue = useMemo(
    () => ({
      products: formattedProducts.length ? formattedProducts : [],
      loading,
      updateProduct,
    }),
    [formattedProducts, loading]
  );

  return (
    <ProductContext.Provider value={contextValue}>
      {children}
    </ProductContext.Provider>
  );
};
