import { useMemo } from 'react';

const useLocationsByModule = (products) => {
  // Leer las variables de entorno
  const defaultAddress = process.env.REACT_APP_DEFAULT_ADDRESS || 'Dirección no disponible';
  const defaultLat = parseFloat(process.env.REACT_APP_DEFAULT_LAT) || 19.715690900326546;
  const defaultLong = parseFloat(process.env.REACT_APP_DEFAULT_LONG) || -99.95523253068207;

  const secondaryAddress = process.env.REACT_APP_SECONDARY_ADDRESS || 'Dirección secundaria no disponible';
  const secondaryLat = parseFloat(process.env.REACT_APP_SECONDARY_LAT) || 19.292222;
  const secondaryLong = parseFloat(process.env.REACT_APP_SECONDARY_LONG) || -99.652222;

  return useMemo(() => {
    if (!products || products.length === 0) return {};

    // Generar ubicaciones para cada módulo, incluyendo direcciones adicionales
    return products.reduce((acc, product) => {
      const { moduloId, Modulo } = product;

      if (!moduloId || !Modulo) return acc;

      if (!acc[moduloId]) {
        acc[moduloId] = {
          moduleName: Modulo.nombre || 'Sucursal Desconocida',
          locations: [
            {
              address: Modulo.direccion || defaultAddress,
              lat: Modulo.lat || defaultLat,
              long: Modulo.long || defaultLong,
            },
            {
              address: secondaryAddress,
              lat: secondaryLat,
              long: secondaryLong,
            },
          ],
          moduloId,
        };
      }

      return acc;
    }, {});
  }, [products, defaultAddress, defaultLat, defaultLong, secondaryAddress, secondaryLat, secondaryLong]);
};

export default useLocationsByModule;
