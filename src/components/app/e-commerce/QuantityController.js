import React from 'react';
import PropTypes from 'prop-types';
import { Button, Form, InputGroup } from 'react-bootstrap';
import classNames from 'classnames';

const QuantityController = ({ quantity, handleIncrease, handleDecrease, btnClassName }) => {
  return (
    <InputGroup
      size="sm"
      className="d-flex align-items-center"
      style={{
        border: '2px solid #0056B3', // Borde azul
        borderRadius: '8px', // Bordes redondeados
        overflow: 'hidden',
        width: '100%', // Mantener el ancho dentro del contenedor
        maxWidth: '250px', // Tamaño máximo para adaptabilidad
        height: '40px', // Altura consistente
      }}
    >
      <Button
        variant="outline-secondary"
        size="sm"
        className={classNames(btnClassName, 'border-300')}
        onClick={handleDecrease}
        style={{
          border: 'none',
          backgroundColor: 'transparent',
          color: '#0056B3', // Azul suave
          padding: '0 12px', // Espaciado interno
          fontSize: '1.2rem',
        }}
      >
        -
      </Button>
      <Form.Control
        className="text-center input-spin-none"
        type="number"
        min="1"
        value={quantity}
        readOnly
        style={{
          border: 'none',
          textAlign: 'center',
          outline: 'none',
          color: '#6C757D', // Gris oscuro
          fontSize: '1.1rem', // Ajustar tamaño del texto
          backgroundColor: 'transparent',
          flex: 1, // Usar todo el espacio disponible
        }}
      />
      <Button
        variant="outline-secondary"
        size="sm"
        className={classNames(btnClassName, 'border-300')}
        onClick={handleIncrease}
        style={{
          border: 'none',
          backgroundColor: 'transparent',
          color: '#0056B3', // Azul suave
          padding: '0 12px', // Espaciado interno
          fontSize: '1.2rem',
        }}
      >
        +
      </Button>
    </InputGroup>
  );
};

QuantityController.propTypes = {
  quantity: PropTypes.number.isRequired,
  handleIncrease: PropTypes.func.isRequired,
  handleDecrease: PropTypes.func.isRequired,
  btnClassName: PropTypes.string,
};

export default QuantityController;
