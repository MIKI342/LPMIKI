// Componente LockScreen: Muestra la interfaz de bloqueo donde el usuario debe ingresar su contraseña 
// para acceder al área de administración. Incluye un avatar del usuario y un formulario de bloqueo.

import React from 'react';
import Avatar from 'components/common/Avatar'; // Componente que muestra la imagen del usuario
import LockScreenForm from 'components/authentication/LockScreenForm'; // Componente que muestra el formulario para ingresar la contraseña
import team1 from 'assets/img/team/1.jpg'; // Imagen del usuario

const LockScreen = () => {
  return (
    <div className="text-center"> {/* Centra el contenido en la pantalla */}
      <Avatar src={team1} size="4xl" /> {/* Muestra el avatar del usuario */}
      <h5 className="mt-3 mb-0">¡Hola! Emma Watson</h5> {/* Saludo al usuario */}
      <small>Ingresa tu contraseña para acceder al área de administración.</small> {/* Instrucción para el usuario */}
      <LockScreenForm className="mt-4 mx-sm-4" type="simple" /> {/* Renderiza el formulario de bloqueo */}
    </div>
  );
};

export default LockScreen;
