// AuthContext: Proporciona el contexto de autenticación para la aplicación, permitiendo a los componentes acceder al estado de autenticación y a funciones de login y logout.
// Este contexto se utiliza en toda la aplicación para verificar si el usuario está autenticado (`isAuthenticated`), y se basa en un token almacenado en el `localStorage`.
// Relacionado con componentes que necesitan condicionalmente mostrar contenido solo a usuarios autenticados, como elementos de la barra de navegación y secciones protegidas por rutas.

import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  // Función para manejar el inicio de sesión
  const login = userData => {
    console.log('Login successful:', userData); // Log cuando el usuario inicia sesión
    setIsAuthenticated(true);
    setUser(userData);
    localStorage.setItem('token', userData.token); // Guardar el token en el localStorage
  };

  // Función para manejar el cierre de sesión
  const logout = () => {
    console.log('Logout function called'); // Log para saber si se llama a la función logout
    setIsAuthenticated(false); // Cambiar el estado a no autenticado
    setUser(null); // Limpiar los datos del usuario
    localStorage.removeItem('token'); // Eliminar el token de localStorage
    console.log('Token removed from localStorage');
    console.log('isAuthenticated state:', isAuthenticated); // Verificar el estado de autenticación después del logout
  };

  // Revisar si el usuario está autenticado al cargar la aplicación
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      console.log('Token found in localStorage:', token); // Log cuando se encuentra un token en localStorage
      setIsAuthenticated(true);
      // Aquí podrías obtener más datos del usuario si es necesario
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
