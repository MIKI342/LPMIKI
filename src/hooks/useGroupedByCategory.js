// hooks/useGroupedByCategory.js

import { useMemo } from 'react';

/**
 * Hook para agrupar productos por categoría.
 * @param {Array} products - Lista de productos.
 * @returns {Object} - Productos agrupados por categoría.
 */
const useGroupedByCategory = (products) => {
  const groupedProducts = useMemo(() => {
    if (!products || products.length === 0) return {};

    return products.reduce((acc, product) => {
      const category = product.CategoriaProducto?.nombre || 'Sin Categoría';
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(product);
      return acc;
    }, {});
  }, [products]);

  return groupedProducts;
};

export default useGroupedByCategory;
