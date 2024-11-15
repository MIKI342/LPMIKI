import { useState, useEffect } from 'react';

const useFetchRefacciones = (url) => {
  const [refacciones, setRefacciones] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRefacciones = async () => {
      console.log(`Intentando obtener refacciones desde la API: ${url}`);
      try {
        setLoading(true);
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`Error HTTP! Estado: ${response.status}`);
        }

        const data = await response.json();
        console.log('Refacciones obtenidas exitosamente desde la API.', data);

        setRefacciones(data.refacciones || []); // Configura los datos reales
      } catch (error) {
        console.error('Error al recuperar refacciones desde la API:', error);

        // Datos simulados si falla la API
        setRefacciones([
            {
              id: 'refaccion-1',
              nombreRefaccion: 'Refacción Simulada 1',
              descripcion: 'Descripción simulada para la refacción 1.',
              precio: 300,
              mainImageUrl: 'https://via.placeholder.com/300?text=Simulado+1',
            },
            {
              id: 'refaccion-2',
              nombreRefaccion: 'Refacción Simulada 2',
              descripcion: 'Descripción simulada para la refacción 2.',
              precio: 450,
              mainImageUrl: 'https://via.placeholder.com/300?text=Simulado+2',
            },
          ]);
          
      } finally {
        setLoading(false);  
      }
    };

    fetchRefacciones();
  }, [url]);

  return { refacciones, loading };
};

export default useFetchRefacciones;
