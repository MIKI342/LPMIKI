import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { Button, Form, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; // Importar useNavigate

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    isAccepted: false,
  });

  const navigate = useNavigate(); // Usar useNavigate para la redirección

  // Simulamos un almacenamiento local de usuarios
  const storedUsers = JSON.parse(localStorage.getItem('users')) || [];

  const handleSubmit = (e) => {
    e.preventDefault();

    // Verificar si las contraseñas coinciden
    if (formData.password !== formData.confirmPassword) {
      toast.error('Las contraseñas no coinciden');
      return;
    }

    // Verificar si el usuario ya existe
    const userExists = storedUsers.some((user) => user.email === formData.email);
    if (userExists) {
      toast.error('Este correo ya está registrado');
      return;
    }

    // Simular el registro almacenando los datos en localStorage
    const newUser = {
      name: formData.name,
      email: formData.email,
      password: formData.password, // En una API real, la contraseña debería estar encriptada
    };
    localStorage.setItem('users', JSON.stringify([...storedUsers, newUser]));

    // Notificar el éxito
    toast.success(`Registrado exitosamente como ${formData.name}`, { theme: 'colored' });

    // Redirigir automáticamente al inicio de sesión
    navigate('/authentication/simple/login'); 
  };

  const handleFieldChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Nombre</Form.Label>
        <Form.Control
          value={formData.name}
          name="name"
          onChange={handleFieldChange}
          type="text"
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Correo electrónico</Form.Label>
        <Form.Control
          value={formData.email}
          name="email"
          onChange={handleFieldChange}
          type="email"
          required
        />
      </Form.Group>

      <Row className="g-2 mb-3">
        <Form.Group as={Col} sm={6}>
          <Form.Label>Contraseña</Form.Label>
          <Form.Control
            value={formData.password}
            name="password"
            onChange={handleFieldChange}
            type="password"
            required
          />
        </Form.Group>
        <Form.Group as={Col} sm={6}>
          <Form.Label>Confirmar Contraseña</Form.Label>
          <Form.Control
            value={formData.confirmPassword}
            name="confirmPassword"
            onChange={handleFieldChange}
            type="password"
            required
          />
        </Form.Group>
      </Row>

      <Form.Group className="mb-3">
        <Form.Check
          type="checkbox"
          label="Acepto los términos y condiciones"
          checked={formData.isAccepted}
          onChange={(e) => setFormData({ ...formData, isAccepted: e.target.checked })}
          required
        />
      </Form.Group>

      <Button type="submit" className="w-100" disabled={!formData.isAccepted}>
        Registrarse
      </Button>
    </Form>
  );
};

export default RegistrationForm;
