import { createContext, useContext } from 'react';
import useFetchHerramientas from 'hooks/useFetchHerramientas';

const HerramientasContext = createContext();

export const HerramientasProvider = ({ children }) => {
  const { herramientas, loading } = useFetchHerramientas('/api/v2/herramientas');

  return (
    <HerramientasContext.Provider value={{ herramientas, loading }}>
      {children}
    </HerramientasContext.Provider>
  );
};

export const useHerramientas = () => {
  return useContext(HerramientasContext);
};
