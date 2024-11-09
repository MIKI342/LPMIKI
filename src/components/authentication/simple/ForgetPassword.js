// Componente ForgetPassword: Muestra la interfaz para restablecer la contraseña del usuario.
// Este componente presenta un mensaje e instrucción para que el usuario ingrese su correo electrónico para recibir un enlace de restablecimiento.

import React from 'react';
import ForgetPasswordForm from 'components/authentication/ForgetPasswordForm'; // Componente que muestra el formulario para restablecer la contraseña

const ForgetPassword = () => {
  return (
    <div className="text-center"> {/* Centra el contenido en la pantalla */}
      <h5 className="mb-0">¿Olvidaste tu contraseña?</h5> {/* Título que indica la acción */}
      <small>Ingresa tu correo electrónico y te enviaremos un enlace para restablecerla.</small> {/* Instrucción para el usuario */}
      <ForgetPasswordForm /> {/* Renderiza el formulario de restablecimiento de contraseña */}
    </div>
  );
};

export default ForgetPassword;
