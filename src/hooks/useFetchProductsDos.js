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

        // Añadimos un console.log para verificar los datos recibidos
        console.log('Datos obtenidos de la API:', data);

        // Procesar productos y utilizar las imágenes proporcionadas por la API
        const mappedProducts = data.products.map((product) => {
          const categoriaProducto =
            data.categories.find(
              (category) => category.id === product.categoriaId
            ) || null;

          const modulo =
            data.modules.find((mod) => mod.id === product.moduloId) || null;

          // Incluye la categoría dentro de 'Modulo' si existe
          const moduloConCategoria = modulo
            ? {
                ...modulo,
                categoria: categoriaProducto
                  ? categoriaProducto.nombreCategoria
                  : null,
              }
            : null;

          // Preparar el array de imágenes
          const images = product.images || (product.imagen ? [product.imagen] : []);

          // Añadimos un console.log para verificar las imágenes
          console.log('Imágenes del producto:', images);

          return {
            ...product,
            CategoriaProducto: categoriaProducto,
            Modulo: moduloConCategoria,
            images, // Incluimos el array de imágenes
          };
        });

        // Añadimos un console.log para verificar los productos mapeados
        console.log('Productos mapeados con imágenes:', mappedProducts);

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
