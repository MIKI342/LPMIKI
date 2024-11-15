import { useState, useEffect } from 'react';

const useFetchHerramientas = (url) => {
  const [herramientas, setHerramientas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHerramientas = async () => {
      console.log(`Intentando obtener herramientas desde la API: ${url}`);
      try {
        setLoading(true);
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`Error HTTP! Estado: ${response.status}`);
        }

        const data = await response.json();
        console.log('Herramientas obtenidas exitosamente desde la API.', data);

        setHerramientas(data.herramientas || []); // Datos reales de la API
      } catch (error) {
        console.error('Error al recuperar herramientas desde la API:', error);

        // Datos simulados si falla la API
        setHerramientas([
          {
            id: 'herramienta-1',
            nombreHerramienta: 'Herramienta Simulada 1',
            descripcion: 'Descripción simulada para la herramienta 1.',
            precio: 1000,
            mainImageUrl: 'https://via.placeholder.com/300?text=Herramienta+1',
          },
          {
            id: 'herramienta-2',
            nombreHerramienta: 'Herramienta Simulada 2',
            descripcion: 'Descripción simulada para la herramienta 2.',
            precio: 1500,
            mainImageUrl: 'https://via.placeholder.com/300?text=Herramienta+2',
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchHerramientas();
  }, [url]);

  return { herramientas, loading };
};

export default useFetchHerramientas;
