// PrivateRoute.js - Componente de ruta privada
// Este componente protege las rutas sensibles asegurando que solo usuarios autenticados puedan acceder. 
// Si el usuario no está autenticado, se redirige a la página de inicio de sesión.

// Importaciones necesarias de React, AuthContext y Navigate
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const PrivateRoute = ({ element: Component }) => {
  const { isAuthenticated } = useContext(AuthContext);

  // Si el usuario no está autenticado, redirigir al login
  return isAuthenticated ? <Component /> : <Navigate to="/authentication/simple/login" replace />;
};

export default PrivateRoute;
