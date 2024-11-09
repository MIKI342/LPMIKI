// AskQuestionModal: Componente de modal para permitir a los usuarios hacer preguntas.
// Este componente muestra un formulario dentro de un modal, donde los usuarios pueden ingresar su nombre, correo electrónico y pregunta.
// La visibilidad del modal depende del estado `show`, y se oculta al ejecutar la función `handleClose`. 
// Incluye validación básica para los campos y muestra un botón para enviar la pregunta, junto con un icono de "Enviar" (icono de papel).

import React from 'react';
import PropTypes from 'prop-types';
import { Button, Form, Modal } from 'react-bootstrap';
import FalconCloseButton from 'components/common/FalconCloseButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const AskQuestionModal = ({ show, handleClose }) => (
  <Modal show={show} onHide={handleClose} contentClassName="border-0">
    <Modal.Header
      className="bg-card-gradient border-bottom-0"
      data-bs-theme="light"
    >
      <Modal.Title as="h5" className="text-white">
        Ask your question
      </Modal.Title>
      <FalconCloseButton noOutline variant="white" onClick={handleClose} />
    </Modal.Header>
    <Modal.Body>
      <Form>
        {/* Campo para el nombre del usuario */}
        <Form.Group className="mb-3">
          <Form.Label className="fs-10" htmlFor="name">
            Name
          </Form.Label>
          <Form.Control type="text" id="name" />
        </Form.Group>
        {/* Campo para el correo electrónico del usuario */}
        <Form.Group className="mb-3">
          <Form.Label className="fs-10" htmlFor="email">
            Email
          </Form.Label>
          <Form.Control type="email" id="email" />
        </Form.Group>
        {/* Campo para que el usuario ingrese su pregunta */}
        <Form.Group className="mb-3">
          <Form.Label className="fs-10" htmlFor="question">
            Question
          </Form.Label>
          <Form.Control as="textarea" rows={4} id="question" />
        </Form.Group>
        {/* Botón para enviar la pregunta */}
        <Button varient="primary" size="sm" className="px-4">
          <FontAwesomeIcon icon="paper-plane" className="me-2" />
          Send
        </Button>
      </Form>
    </Modal.Body>
  </Modal>
);

AskQuestionModal.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired
};

export default AskQuestionModal;
