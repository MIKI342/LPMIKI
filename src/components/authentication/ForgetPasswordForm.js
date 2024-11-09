// Componente ForgetPasswordForm: Permite a los usuarios ingresar su correo electrónico para recibir un enlace de restablecimiento de contraseña.
// Este componente maneja la lógica de estado y el envío del formulario, y muestra un mensaje de éxito al enviar el enlace.

import React, { useState } from 'react'; // Importa React y useState
import PropTypes from 'prop-types'; // Para validar los tipos de las propiedades
import { Link } from 'react-router-dom'; // Para enlaces de navegación
import { toast } from 'react-toastify'; // Para mostrar notificaciones
import { Button, Form } from 'react-bootstrap'; // Componentes de Bootstrap

const ForgetPasswordForm = () => {
  // Estado para almacenar el correo electrónico ingresado
  const [email, setEmail] = useState('');

  // Handler para el envío del formulario
  const handleSubmit = e => {
    e.preventDefault(); // Previene el comportamiento predeterminado del formulario
    if (email) {
      toast.success(`Se ha enviado un correo a ${email} con el enlace para restablecer la contraseña`, {
        theme: 'colored' // Estilo de la notificación
      });
    }
  };

  return (
    <Form className="mt-4" onSubmit={handleSubmit}> {/* Formulario para ingresar el correo electrónico */}
      <Form.Group className="mb-3"> {/* Grupo para el campo de entrada */}
        <Form.Control
          placeholder={'Dirección de correo electrónico'} // Texto de marcador
          value={email} // Valor del campo de entrada
          name="email" // Nombre del campo
          onChange={({ target }) => setEmail(target.value)} // Actualiza el estado con el valor ingresado
          type="email" // Tipo de entrada para correos electrónicos
        />
      </Form.Group>

      <Form.Group className="mb-3"> {/* Grupo para el botón de envío */}
        <Button className="w-100" type="submit" disabled={!email}> {/* Botón que se desactiva si no hay un correo electrónico ingresado */}
          Enviar enlace de restablecimiento {/* Texto del botón */}
        </Button>
      </Form.Group>

      <Link className="fs-10 text-600" to="#!"> {/* Enlace para ayuda adicional */}
        No puedo recuperar mi cuenta usando esta página {/* Texto del enlace */}
        <span className="d-inline-block ms-1"> &rarr;</span> {/* Flecha a la derecha */}
      </Link>
    </Form>
  );
};

ForgetPasswordForm.propTypes = {
  layout: PropTypes.string // Propiedad opcional para el diseño
};

ForgetPasswordForm.defaultProps = { 
  layout: 'simple' // Valor predeterminado para la propiedad layout
};

export default ForgetPasswordForm;
