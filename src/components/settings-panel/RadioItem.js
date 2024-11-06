// RadioItem: Componente de botón de selección que funciona como una opción de radio con imagen y etiqueta.
// Este componente permite a los usuarios seleccionar entre varias opciones visuales mediante botones de radio.
// Incluye una imagen que representa cada opción y cambia el estado activo visualmente al seleccionarse.
// Se utiliza para inputs estilizados de tipo radio con la propiedad `active` que controla si está seleccionado.
// Relacionado con otros componentes de formularios o listas de selección donde se visualiza una opción previa en formato de imagen.

import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import { Button, Form } from 'react-bootstrap';

const RadioItem = ({ name, label, active = false, onChange, image }) => {
  return (
    <Button variant="theme-default" className={classNames({ active: active })}>
      {/* Etiqueta y la imagen que representa la opción de radio */}
      <Form.Label
        htmlFor={`${name}-${label}`}
        className="cursor-pointer hover-overlay"
      >
        <img className="w-100" src={image} alt="" />
      </Form.Label>
      {/* Input tipo radio para la selección, enlazado con onChange */}
      <Form.Check
        type="radio"
        id={`${name}-${label}`}
        label={label.charAt(0).toUpperCase() + label.slice(1)}
        name={name}
        onChange={onChange}
        checked={active}
      />
    </Button>
  );
};

RadioItem.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  active: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  image: PropTypes.string.isRequired
};

export default RadioItem;
