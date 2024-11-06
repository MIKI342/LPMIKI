import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Flex from 'components/common/Flex';
import LoginForm from 'components/authentication/LoginForm';

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleBackButton = (event) => {
      event.preventDefault();
      // Si el usuario decide retroceder, lo redirigimos a la página de inicio
      navigate('/home');
    };

    // Agregar un listener para el evento de retroceso del navegador
    window.addEventListener('popstate', handleBackButton);

    // Limpiar el listener cuando se desmonte el componente
    return () => {
      window.removeEventListener('popstate', handleBackButton);
    };
  }, [navigate]);

  return (
    <>
      <Flex justifyContent="between" alignItems="center" className="mb-2">
        <h5>Iniciar Sesión</h5>
        <p className="fs-10 text-600 mb-0">
          o <Link to="/authentication/simple/register">Crear una cuenta</Link>
        </p>
      </Flex>
      <LoginForm />
    </>
  );
};

export default Login;
