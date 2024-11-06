import React, { useContext, useEffect } from 'react';
import LogoutContent from 'components/authentication/LogoutContent'; // Componente que muestra el contenido de cierre de sesión
import AuthCardLayout from 'layouts/AuthCardLayout'; // Diseño de tarjeta para la autenticación
import { AuthContext } from 'context/AuthContext'; // Importar el contexto de autenticación
import { useNavigate } from 'react-router-dom'; // Para redirigir al usuario

const Logout = () => {
  const { logout } = useContext(AuthContext); // Acceder a la función logout del contexto
  const navigate = useNavigate();

  // Llamar a la función logout cuando el componente se monte
  useEffect(() => {
    console.log('Logout component mounted'); // Log cuando el componente de logout se monta
    logout(); // Llamar a la función de cierre de sesión
    console.log('Called logout function, now navigating to login'); // Log después de llamar a logout
    navigate('/authentication/simple/login'); // Redirigir al login después del logout
  }, [logout, navigate]);

  return (
    <AuthCardLayout> {/* Contenedor que aplica un diseño específico para la autenticación */}
      <div className="text-center"> {/* Centra el contenido en la pantalla */}
        <LogoutContent layout="card" titleTag="h3" /> {/* Renderiza el contenido de cierre de sesión con un título */}
      </div>
    </AuthCardLayout>
  );
};

export default Logout;
