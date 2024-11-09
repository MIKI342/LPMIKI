// hooks/useRandomProducts.js

import { useMemo } from 'react';

/**
 * Mezcla un array utilizando el algoritmo de Fisher-Yates
 * @param {Array} array - El array a mezclar
 * @returns {Array} - El array mezclado
 */
const shuffleArray = (array) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

/**
 * Hook para obtener productos aleatorios
 * @param {Array} products - La lista de productos
 * @param {number} count - Número de productos aleatorios a seleccionar
 * @returns {Array} - Lista de productos aleatorios
 */
const useRandomProducts = (products, count = 10) => {
  const randomProducts = useMemo(() => {
    if (!products || products.length === 0) return [];

    const shuffledProducts = shuffleArray(products);
    return shuffledProducts.slice(0, count);
  }, [products, count]);

  return randomProducts;
};

export default useRandomProducts;
