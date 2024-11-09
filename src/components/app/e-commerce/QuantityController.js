// QuantityController.js

import React from 'react';
import PropTypes from 'prop-types';
import { Button, Form, InputGroup } from 'react-bootstrap';
import classNames from 'classnames';

const QuantityController = ({ quantity, handleIncrease, handleDecrease, btnClassName }) => {
  return (
    <InputGroup size="sm">
      <Button
        variant="outline-secondary"
        size="sm"
        className={classNames(btnClassName, 'border-300')}
        onClick={() => {
          console.log('Botón "-" clicado');
          handleDecrease();
        }}
      >
        -
      </Button>
      <Form.Control
        className="text-center px-2 input-spin-none"
        type="number"
        min="1"
        value={quantity}
        readOnly
        style={{ width: '50px' }}
      />
      <Button
        variant="outline-secondary"
        size="sm"
        className={classNames(btnClassName, 'border-300')}
        onClick={() => {
          console.log('Botón "+" clicado - Enviando a handleIncrease');
          handleIncrease();
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
