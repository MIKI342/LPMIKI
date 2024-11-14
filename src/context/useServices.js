// hooks/useServices.js
import { createContext, useContext, useState, useEffect } from 'react';
import useFetchServices from 'hooks/useFetchServices'; // Aquí usamos el hook original

// Crear el contexto
const ServicesContext = createContext();

// Componente proveedor del contexto
export const ServicesProvider = ({ children }) => {
  const { services, loading } = useFetchServices('/api/v2/services'); // Usamos el hook aquí para obtener los servicios

  return (
    <ServicesContext.Provider value={{ services, loading }}>
      {children}
    </ServicesContext.Provider>
  );
};

// Hook para acceder al contexto
export const useServices = () => {
  return useContext(ServicesContext);
};
