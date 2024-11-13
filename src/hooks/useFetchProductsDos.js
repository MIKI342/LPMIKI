import { useState, useEffect } from 'react';

const useFetchProducts = (url) => {
  const [products, setProducts] = useState([]); // Productos procesados
  const [loading, setLoading] = useState(true); // Indicador de carga

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true); // Inicia la carga
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        // Procesar productos y preparar imágenes simuladas
        const mappedProducts = data.products.map((product, index) => {
          const categoriaProducto = data.categories.find(
            (category) => category.id === product.categoriaId
          ) || null;
        
          const modulo = data.modules.find(
            (mod) => mod.id === product.moduloId
          ) || null;
        
          // Simular imágenes para algunos productos solamente
          const simulatedImage = {
            url: 'https://via.placeholder.com/300',
          };
        
          const hasImages = product.images && product.images.length > 0;
        
          return {
            ...product,
            CategoriaProducto: categoriaProducto,
            Modulo: modulo,
            images: hasImages ? product.images : (index % 2 === 0 ? [simulatedImage] : []), // Alternar productos con imágenes simuladas
          };
        });
        
        setProducts(mappedProducts); // Actualizar productos procesados
      } catch (error) {
        console.error('Error al obtener los productos:', error);
      } finally {
        setLoading(false); // Finaliza la carga
      }
    };

    fetchProducts();
  }, [url]);

  return { products, loading }; 
};

export default useFetchProducts;
