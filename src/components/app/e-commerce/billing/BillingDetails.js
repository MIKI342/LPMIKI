// Componente BillingDetails: Muestra el formulario para ingresar los detalles de facturación, 
// permitiendo a los usuarios seleccionar un método de pago y proporcionar la información de la tarjeta.

import React from 'react';
import { Col, Form, OverlayTrigger, Row, Tooltip } from 'react-bootstrap';
import paypal from 'assets/img/icons/icon-paypal-full.png'; // Icono de PayPal
import creditCard from 'assets/img/icons/icon-payment-methods.png'; // Icono de métodos de pago con tarjeta
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import countries from 'data/countries'; // Datos de países

const BillingDetails = () => {
  const { register, handleSubmit } = useForm(); // Inicializa el hook para el formulario

  // Función que se llama al enviar el formulario
  const onSubmit = data => {
    console.log(data); // Muestra los datos del formulario en la consola
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Form.Check type="radio" className="mb-0 form-check" id="paypal">
        <Form.Check.Input
          type="radio"
          id="paypal"
          name="billing"
          value="paypal"
          {...register('billingMethod', { required: true })} // Registra el método de pago
        />
        <Form.Check.Label className="mb-0 d-block">
          <img src={paypal} height="20" alt="paypal" /> {/* Opción para PayPal */}
        </Form.Check.Label>
      </Form.Check>
      <p className="fs-10 mb-4">
        Paga con PayPal, Apple Pay, PayPal Credit y mucho más {/* Descripción de la opción de PayPal */}
      </p>

      <Form.Check type="radio" className="mb-0 form-check" id="credit-card">
        <Form.Check.Input
          type="radio"
          name="billing"
          defaultChecked
          id="credit-card"
          value="card"
          {...register('billingMethod', { required: true })} // Registra el método de pago
        />
        <Form.Check.Label className="d-flex align-items-center mb-0">
          <span className="fs-8 text-nowrap">Tarjeta de Crédito</span> {/* Opción para tarjeta de crédito */}
          <img
            src={creditCard}
            height="20"
            className="d-none d-sm-inline-block ms-2 mt-lg-0"
            alt="paypal"
          />
        </Form.Check.Label>
      </Form.Check>
      <p className="fs-10 mb-4">
        Transferencia de dinero segura utilizando sus cuentas bancarias. Visa, maestro, discover,
        american express. {/* Descripción de la opción de tarjeta de crédito */}
      </p>

      <Row className="gx-3 mb-3">
        <Form.Group as={Col}>
          <Form.Label
            className="ls text-uppercase text-600 fw-semibold mb-0 fs-10"
            htmlFor="cardNumber"
          >
            Número de Tarjeta {/* Etiqueta para el número de tarjeta */}
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="XXXX XXXX XXXX XXXX"
            {...register('cardNumber', { required: true })} // Registra el número de tarjeta
          />
        </Form.Group>
        <Form.Group as={Col}>
          <Form.Label
            className="ls text-uppercase text-600 fw-semibold mb-0 fs-10"
            htmlFor="cardName"
          >
            Nombre de la Tarjeta {/* Etiqueta para el nombre en la tarjeta */}
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="John Doe"
            {...register('cardName', { required: true })} // Registra el nombre de la tarjeta
          />
        </Form.Group>
      </Row>
      <Row className="gx-3">
        <Col xs={6} sm={3}>
          <Form.Group>
            <Form.Label
              className="ls text-uppercase text-600 fw-semibold mb-0 fs-10"
              htmlFor="inputCountry"
            >
              País {/* Etiqueta para seleccionar el país */}
            </Form.Label>
            <Form.Control
              list="country-list"
              {...register('country', { required: true })} // Registra el país
            />
            <datalist id="country-list">
              {countries.map(country => (
                <option key={country} value={country}>
                  {country} {/* Lista de países */}
                </option>
              ))}
            </datalist>
          </Form.Group>
        </Col>
        <Col xs={6} sm={3}>
          <Form.Group>
            <Form.Label
              className="ls text-uppercase text-600 fw-semibold mb-0 fs-10"
              htmlFor="zipCode"
            >
              Código Postal {/* Etiqueta para el código postal */}
            </Form.Label>
            <Form.Control
              placeholder="1234"
              type="text"
              {...register('zipCode', { required: true })} // Registra el código postal
            />
          </Form.Group>
        </Col>
        <Col xs={6} sm={3}>
          <Form.Group>
            <Form.Label
              className="ls text-uppercase text-600 fw-semibold mb-0 fs-10"
              htmlFor="expDate"
            >
              Fecha de Expiración {/* Etiqueta para la fecha de expiración */}
            </Form.Label>
            <Form.Control
              id="expDate"
              placeholder="15/2024"
              type="text"
              {...register('expDate', { required: true })} // Registra la fecha de expiración
            />
          </Form.Group>
        </Col>
        <Col xs={6} sm={3}>
          <Form.Group>
            <Form.Label
              className="ls text-uppercase text-600 fw-semibold mb-0 fs-10"
              htmlFor="cvv"
            >
              CVV{''} {/* Etiqueta para el CVV */}
              <OverlayTrigger
                placement="top"
                overlay={
                  <Tooltip style={{ position: 'fixed' }}>
                    Valor de verificación de la tarjeta
                  </Tooltip>
                }
              >
                <Link to="#!">
                  <FontAwesomeIcon
                    icon="question-circle"
                    className="ms-1 text-600"
                  />
                </Link>
              </OverlayTrigger>
            </Form.Label>
            <Form.Control
              id="cvv"
              placeholder="123"
              maxLength="3"
              pattern="[0-9]{3}" // Validación para el CVV
              type="text"
              {...register('cvv', { required: true })} // Registra el CVV
            />
          </Form.Group>
        </Col>
      </Row>
    </Form>
  );
};

export default BillingDetails;
