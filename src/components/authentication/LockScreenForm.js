// Componente LockScreenForm: Permite a los usuarios ingresar su contraseña para desbloquear la pantalla.
// Este componente maneja la lógica de estado y el envío del formulario, y muestra un mensaje de éxito al iniciar sesión.

import React, { useState } from 'react'; // Importa React y useState
import PropTypes from 'prop-types'; // Para validar los tipos de las propiedades
import { toast } from 'react-toastify'; // Para mostrar notificaciones
import { Button, Col, Form, Row } from 'react-bootstrap'; // Componentes de Bootstrap
import classNames from 'classnames'; // Para manejar las clases condicionalmente

const LockScreenForm = ({ type, ...rest }) => {
  // Estado para almacenar la contraseña ingresada
  const [password, setPassword] = useState('');

  // Handler para el envío del formulario
  const handleSubmit = e => {
    e.preventDefault(); // Previene el comportamiento predeterminado del formulario
    // setRedirect(true); // Comentado: podría utilizarse para redireccionar al usuario
    toast.success(`Sesión iniciada como Emma Watson`, { // Mensaje de éxito al iniciar sesión
      theme: 'colored' // Estilo de la notificación
    });
  };

  return (
    <Row
      {...rest} // Permite pasar otras propiedades al componente
      as={Form} // Define que el Row se comporta como un formulario
      className={classNames('gx-2 mt-4', { // Clases de Bootstrap y clases condicionales
        'mx-sm-4 mb-2': type === 'simple' // Aplica clases específicas si el tipo es 'simple'
      })}
      onSubmit={handleSubmit} // Establece el handler para el envío del formulario
    >
      <Col>
        <Form.Control
          placeholder="Ingresa tu contraseña" // Texto de marcador
          value={password} // Valor del campo de entrada
          name="password" // Nombre del campo
          onChange={({ target }) => setPassword(target.value)} // Actualiza el estado con el valor ingresado
          type="password" // Tipo de entrada para contraseñas
        />
      </Col>
      <Col xs={type === 'simple' ? 'auto' : 4}> {/* Ajusta el tamaño de la columna según el tipo */}
        <Button
          variant="primary" // Color del botón
          type="submit" // Tipo del botón
          disabled={!password} // Desactiva el botón si no hay contraseña ingresada
          className={classNames({ 'w-100': type !== 'simple' })} // Aplica clase de ancho completo si no es tipo 'simple'
        >
          Iniciar sesión {/* Texto del botón */}
        </Button>
      </Col>
    </Row>
  );
};

LockScreenForm.propTypes = {
  type: PropTypes.oneOf(['simple', 'split', 'card']) // Propiedad opcional para definir el tipo de diseño
};

export default LockScreenForm;
