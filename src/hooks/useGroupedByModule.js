// useGroupedByModule.js

import { useMemo } from 'react';
import useContactNumbers from './useContactNumbers';

const useGroupedByModule = (products) => {
  const { getContactNumberByCategory } = useContactNumbers();

  return useMemo(() => {
    if (!products || products.length === 0) return {};

    return products.reduce((acc, product) => {
      const { moduloId, Modulo } = product;

      if (!moduloId || !Modulo) return acc;

      if (!Modulo.categoria) {
        console.warn(`El producto con ID ${product.id} no tiene definida la categoría en Modulo.categoria.`);
      }

      if (!acc[moduloId]) {
        const category = Modulo.categoria || '';
        const contact = getContactNumberByCategory(category);
        console.log(`Product ID: ${product.id}, Module Category: ${category}, Assigned Contact: ${contact}`);

        acc[moduloId] = {
          products: [],
          moduleName: Modulo.nombre || 'Sucursal Desconocida',
          address: Modulo.direccion || 'Dirección no disponible',
          contact,
          lat: Modulo.lat || 19.715690900326546,
          long: Modulo.long || -99.95523253068207,
        };
      }

      acc[moduloId].products.push(product);
      return acc;
    }, {});
  }, [products, getContactNumberByCategory]);
};

export default useGroupedByModule;
