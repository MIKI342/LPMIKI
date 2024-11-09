// Componente PasswordReset: Muestra la interfaz para restablecer la contraseña del usuario.
// Este componente incluye un título y un formulario para que el usuario ingrese su nueva contraseña.

import React from 'react';
import PasswordResetForm from 'components/authentication/PasswordResetForm'; // Componente que muestra el formulario para restablecer la contraseña

const PasswordReset = () => (
  <div className="text-center"> {/* Centra el contenido en la pantalla */}
    <h5>Restablecer nueva contraseña</h5> {/* Título de la sección */}
    <PasswordResetForm /> {/* Renderiza el formulario de restablecimiento de contraseña */}
  </div>
);

export default PasswordReset;
