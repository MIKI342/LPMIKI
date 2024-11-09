import { useState, useEffect } from 'react';

const useFetchProducts = (url) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        
        // Mapear productos para incluir `CategoriaProducto` y `Modulo`
        const mappedProducts = data.products.map((product) => {
          const categoriaProducto = data.categories.find(
            (category) => category.id === product.categoriaId
          ) || null;
          
          const modulo = data.modules.find(
            (mod) => mod.id === product.moduloId
          ) || null;

          return {
            ...product,
            CategoriaProducto: categoriaProducto,
            Modulo: modulo,
          };
        });

        setProducts(mappedProducts);
      } catch (error) {
        console.error('Error al obtener los productos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [url]);

  return { products, loading };
};

export default useFetchProducts;
