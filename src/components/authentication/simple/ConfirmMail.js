// Componente ConfirmMail: Muestra la interfaz de confirmación de correo electrónico del usuario.
// Este componente incluye el contenido de confirmación, donde se notifica al usuario que debe verificar su dirección de correo electrónico.

import React from 'react';
import ConfirmMailContent from 'components/authentication/ConfirmMailContent'; // Componente que muestra el contenido de confirmación de correo

const ConfirmMail = () => (
  <div className="text-center"> {/* Centra el contenido en la pantalla */}
    <ConfirmMailContent email="xyz@abc.com" /> {/* Renderiza el contenido de confirmación con un correo electrónico de ejemplo */}
  </div>
);

export default ConfirmMail;
