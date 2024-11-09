// src/hooks/useGroupedByModule.js

import { useMemo } from 'react';

/**
 * Hook para agrupar productos por módulo.
 * @param {Array} products - Lista de productos.
 * @returns {Object} - Productos agrupados por módulo.
 */
const useGroupedByModule = (products) => {
  return useMemo(() => {
    if (!products || products.length === 0) return {};

    return products.reduce((acc, product) => {
      const { moduloId, Modulo } = product;

      if (!moduloId || !Modulo) return acc; // Ignorar productos sin módulo válido

      // Inicializar el módulo si no existe
      if (!acc[moduloId]) {
        acc[moduloId] = {
          products: [],
          moduleName: Modulo.nombre || 'Sucursal Desconocida',
          address: Modulo.direccion || 'Dirección no disponible',
          contact: Modulo.contacto || '7121658661',
          lat: Modulo.lat || 19.715690900326546,
          long: Modulo.long || -99.95523253068207,
        };
      }

      acc[moduloId].products.push(product);
      return acc;
    }, {});
  }, [products]);
};

export default useGroupedByModule;
