import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { AuthContext } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import Divider from 'components/common/Divider';
import SocialAuthButtons from './SocialAuthButtons';
import PropTypes from 'prop-types';

const LoginForm = ({ hasLabel, layout }) => {
  const [formData, setFormData] = useState({ email: '', password: '', remember: false });
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext); // Accedemos a la función login del contexto
  const navigate = useNavigate();

  // Simulamos un almacenamiento local de usuarios
  const storedUsers = JSON.parse(localStorage.getItem('users')) || [];

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Verificar si el usuario existe y la contraseña es correcta
    const user = storedUsers.find((user) => user.email === formData.email);
    if (user && user.password === formData.password) {
      // Autenticación exitosa
      login(user); // Simular inicio de sesión en el contexto
      toast.success(`Sesión iniciada como ${user.email}`, { theme: 'colored' });
      navigate('/home'); // Redirigir al checkout después de iniciar sesión
    } else {
      // Error en la autenticación
      setError('Email o contraseña incorrectos.');
    }
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
        {hasLabel && <Form.Label>Email</Form.Label>}
        <Form.Control
          placeholder={!hasLabel ? 'Email' : ''}
          value={formData.email}
          name="email"
          onChange={handleFieldChange}
          type="email"
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        {hasLabel && <Form.Label>Contraseña</Form.Label>}
        <Form.Control
          placeholder={!hasLabel ? 'Contraseña' : ''}
          value={formData.password}
          name="password"
          onChange={handleFieldChange}
          type="password"
          required
        />
      </Form.Group>

      {error && <p className="text-danger">{error}</p>}

      <Row className="justify-content-between align-items-center">
        <Col xs="auto">
          <Form.Check type="checkbox" id="rememberMe" className="mb-0">
            <Form.Check.Input
              type="checkbox"
              name="remember"
              checked={formData.remember}
              onChange={e =>
                setFormData({
                  ...formData,
                  remember: e.target.checked
                })
              }
            />
            <Form.Check.Label className="mb-0 text-700">
              Recordarme
            </Form.Check.Label>
          </Form.Check>
        </Col>

        <Col xs="auto">
          <Link
            className="fs-10 mb-0"
            to={`/authentication/${layout}/forgot-password`}
          >
            ¿Olvidaste tu contraseña?
          </Link>
        </Col>
      </Row>

      <Form.Group>
        <Button
          type="submit"
          color="primary"
          className="mt-3 w-100"
          disabled={!formData.email || !formData.password}
        >
          Iniciar sesión
        </Button>
      </Form.Group>

      <Divider className="mt-4">o inicia sesión con</Divider>

      <SocialAuthButtons />
    </Form>
  );
};

LoginForm.propTypes = {
  layout: PropTypes.string,
  hasLabel: PropTypes.bool
};

LoginForm.defaultProps = {
  layout: 'simple',
  hasLabel: false
};

export default LoginForm;
