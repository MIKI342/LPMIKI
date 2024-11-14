import { useState, useEffect } from 'react';

const useFetchServices = (url) => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      console.log(`Intentando obtener servicios desde la API: ${url}`);
      try {
        setLoading(true); // Inicio de la solicitud
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`Error HTTP! Estado: ${response.status}`);
        }

        const data = await response.json();
        console.log('Servicios obtenidos exitosamente desde la API.', data);

        setServices(data.services || []); // Almacena los datos reales
      } catch (error) {
        console.error('Error al recuperar servicios desde la API:', error);

        // Simulación de datos si falla la API
        setServices([
          {
            id: 'simulado-1',
            nombreServicio: 'Servicio Simulado 1',
            descripcion: 'Descripción simulada para el servicio 1.',
            precio: 100,
            mainImageUrl: 'https://via.placeholder.com/300?text=SimuladoMIKI+1',
          },
          {
            id: 'simulado-2',
            nombreServicio: 'Servicio Simulado 2',
            descripcion: 'Descripción simulada para el servicio 2.',
            precio: 200,
            mainImageUrl: 'https://via.placeholder.com/300?text=Simulado+2',
          },
        ]);
      } finally {
        setLoading(false); // Solicitud completada (éxito o error)
      }
    };

    fetchServices();
  }, [url]);

  return { services, loading };
};

export default useFetchServices;
