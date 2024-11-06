// Componente Example: Muestra un modal de registro que permite a los usuarios crear una cuenta en la aplicación.
// Este componente utiliza el estado del contexto de la aplicación para controlar la visibilidad del modal.

import React from 'react';
import { CloseButton, Modal } from 'react-bootstrap'; // Componentes de Bootstrap para el modal y el botón de cerrar
import RegistrationForm from 'components/authentication/RegistrationForm'; // Componente que muestra el formulario de registro
import { useAppContext } from 'Main'; // Hook para acceder al contexto de la aplicación

export default function Example() {
  const {
    config: { openAuthModal }, // Obtiene el estado de visibilidad del modal desde el contexto
    setConfig // Función para actualizar la configuración del contexto
  } = useAppContext();

  // Función para cerrar el modal
  const handleClose = () => {
    setConfig('openAuthModal', false); // Cambia el estado de visibilidad a falso
  };

  return (
    <Modal show={openAuthModal} onHide={handleClose} className="mt-4"> {/* Renderiza el modal solo si openAuthModal es verdadero */}
      <Modal.Header className="bg-shape modal-shape-header px-4 position-relative">
        <div className="position-relative z-1" data-bs-theme="light">
          <h4 className="mb-0 text-white" id="authentication-modal-label">
            Registrarse {/* Título del modal */}
          </h4>
          <p className="fs-10 mb-0 text-white">
            Por favor, crea tu cuenta gratuita de Falcon {/* Instrucciones para el usuario */}
          </p>
        </div>
        <CloseButton
          variant="white" // Estilo del botón de cerrar
          className="position-absolute end-0 me-2 mt-2 top-0"
          onClick={handleClose} // Maneja el cierre del modal al hacer clic
        />
      </Modal.Header>
      <Modal.Body className="p-4">
        <RegistrationForm layout="split" hasLabel /> {/* Renderiza el formulario de registro con un diseño dividido */}
      </Modal.Body>
    </Modal>
  );
}
