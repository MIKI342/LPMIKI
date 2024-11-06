// Componente PasswordResetForm: Permite a los usuarios establecer una nueva contraseña y confirmar la misma.
// Este componente incluye campos para ingresar la nueva contraseña y su confirmación, y muestra un mensaje de éxito al finalizar.

import React, { useState } from 'react'; // Importa React y el hook useState
import PropTypes from 'prop-types'; // Para validar los tipos de las propiedades
import { toast } from 'react-toastify'; // Para mostrar notificaciones
import { Button, Form } from 'react-bootstrap'; // Componentes de Bootstrap
import classNames from 'classnames'; // Para manejar clases condicionalmente

const PasswordResetForm = ({ hasLabel }) => {
  // Estado inicial para almacenar la contraseña y su confirmación
  const [formData, setFormData] = useState({
    password: '', // Contraseña nueva
    confirmPassword: '' // Confirmación de la contraseña nueva
  });

  // Función manejadora para el envío del formulario
  const handleSubmit = e => {
    e.preventDefault(); // Previene el comportamiento predeterminado del formulario
    toast.success('Inicia sesión con tu nueva contraseña', { // Muestra un mensaje de éxito
      theme: 'colored'
    });
  };

  // Función para manejar los cambios en los campos del formulario
  const handleFieldChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value // Actualiza el valor del campo correspondiente
    });
  };

  return (
    <Form // Componente de formulario de Bootstrap
      className={classNames('mt-3', { 'text-left': hasLabel })} // Clases condicionales
      onSubmit={handleSubmit} // Llama a handleSubmit al enviar
    >
      <Form.Group className="mb-3"> // Grupo para la nueva contraseña
        {hasLabel && <Form.Label> Nueva Contraseña </Form.Label>} {/* Etiqueta de la contraseña */}
        <Form.Control
          placeholder={!hasLabel ? 'Nueva Contraseña' : ''} // Placeholder si no hay etiqueta
          value={formData.password} // Valor del campo
          name="password" // Nombre del campo
          onChange={handleFieldChange} // Cambia el estado al escribir
          type="password" // Tipo de campo como contraseña
        />
      </Form.Group>

      <Form.Group className="mb-3"> // Grupo para la confirmación de la contraseña
        {hasLabel && <Form.Label> Confirmar Contraseña </Form.Label>} {/* Etiqueta de confirmación */}
        <Form.Control
          placeholder={!hasLabel ? 'Confirmar Contraseña' : ''} // Placeholder si no hay etiqueta
          value={formData.confirmPassword} // Valor del campo
          name="confirmPassword" // Nombre del campo
          onChange={handleFieldChange} // Cambia el estado al escribir
          type="password" // Tipo de campo como contraseña
        />
      </Form.Group>

      <Button
        type="submit" // Tipo de botón como enviar
        className="w-100" // Clases de Bootstrap para ancho completo
        disabled={!formData.password || !formData.confirmPassword} // Desactiva el botón si falta información
      >
        Establecer contraseña {/* Texto del botón */}
      </Button>
    </Form>
  );
};

PasswordResetForm.propTypes = {
  hasLabel: PropTypes.bool // Propiedad opcional para mostrar etiquetas
};

export default PasswordResetForm; // Exporta el componente
