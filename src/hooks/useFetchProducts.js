
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
          setProducts(data.products); // Cambiado para coincidir con la estructura de la API
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