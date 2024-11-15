import { createContext, useContext } from 'react';
import useFetchRefacciones from 'hooks/useFetchRefacciones';

const RefaccionesContext = createContext();

export const RefaccionesProvider = ({ children }) => {
  const { refacciones, loading } = useFetchRefacciones('/api/v2/refacciones');

  return (
    <RefaccionesContext.Provider value={{ refacciones, loading }}>
      {children}
    </RefaccionesContext.Provider>
  );
};

export const useRefacciones = () => useContext(RefaccionesContext);
