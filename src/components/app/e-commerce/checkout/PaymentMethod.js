// Componente PaymentMethod: Permite a los usuarios seleccionar un método de pago y proporciona un formulario para ingresar detalles de la tarjeta de crédito.
// Utiliza el contexto del producto para manejar el estado del pago y calcular el total a pagar.

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import cards from 'assets/img/icons/icon-payment-methods-grid.png'; // Iconos de métodos de pago
import paypal from 'assets/img/icons/icon-paypal-full.png'; // Icono de PayPal
import shield from 'assets/img/icons/shield.png'; // Icono de protección
import { ProductContext } from 'context/Context'; // Importa el contexto del producto
import PropTypes from 'prop-types';
import React, { useContext, useState } from 'react';
import {
  Button,
  Card,
  Col,
  Form,
  OverlayTrigger,
  Row,
  Tooltip
} from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const PaymentMethod = ({ payableTotal }) => {
  const [method, setMethod] = useState('credit-card'); // Estado para el método de pago seleccionado
  const { dispatch } = useContext(ProductContext); // Cambiamos de productsDispatch a dispatch
  const { register, handleSubmit } = useForm();

  // Función que se llama al enviar el formulario
  const onSubmit = (data) => {
    dispatch({
      type: 'CHECKOUT' // Despacha la acción de checkout
    });
    toast(
      <div className="text-700">
        <h5 className="text-success fs-9 mb-0">¡Pago exitoso!</h5> {/* Mensaje de éxito */}
        <hr className="my-2" />
        Total: <strong>${payableTotal}</strong>
        <br />
        Método de pago:{' '}
        <strong className="text-capitalize">
          {method.split('-').join(' ')} {/* Muestra el método de pago seleccionado */}
        </strong>
      </div>
    );
    method === 'credit-card'
      ? console.log(data) // Muestra los datos de la tarjeta de crédito en la consola
      : console.log('Llamando a la API de PayPal'); // Mensaje para PayPal
  };

  return (
    <Card>
      <Card.Header className="bg-body-tertiary">
        <h5 className="mb-0">Método de Pago</h5> {/* Título de la sección de método de pago */}
      </Card.Header>
      <Card.Body>
        <Form.Check type="radio" id="credit-card" className="mb-0 form-check">
          <Form.Check.Input
            type="radio"
            onChange={(e) => setMethod(e.target.id)} // Cambia el método de pago
            name="payment-method"
            defaultChecked
          />
          <Form.Check.Label className="mb-2 fs-8">Tarjeta de Crédito</Form.Check.Label> {/* Opción para tarjeta de crédito */}
        </Form.Check>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Row className="gx-0 ps-2 mb-4">
            <Col sm={8} className="px-3">
              <Form.Group className="mb-3">
                <Form.Label className="ls text-uppercase text-600 fw-semibold mb-0">
                  Número de Tarjeta {/* Etiqueta para el número de tarjeta */}
                </Form.Label>
                <Form.Control
                  type="text"
                  id="cardNumber"
                  {...register('cardNumber')}
                  placeholder="•••• •••• •••• ••••"
                />
              </Form.Group>
              <Row className="align-items-center">
                <Col xs={6}>
                  <Form.Label className="ls text-uppercase text-600 fw-semibold mb-0">
                    Fecha de Expiración {/* Etiqueta para la fecha de expiración */}
                  </Form.Label>
                  <Form.Control
                    type="text"
                    id="expDate"
                    {...register('expDate')}
                    placeholder="mm/yyyy"
                  />
                </Col>
                <Col xs={6}>
                  <Form.Label className="ls text-uppercase text-600 fw-semibold mb-0">
                    CVV{/* Etiqueta para el CVV */}
                    <OverlayTrigger
                      placement="top"
                      overlay={
                        <Tooltip style={{ position: 'fixed' }} id="cvvinfo">
                          Valor de verificación de la tarjeta
                        </Tooltip>
                      }
                    >
                      <Link to="#!">
                        <FontAwesomeIcon
                          icon="question-circle"
                          className="ms-2"
                        />
                      </Link>
                    </OverlayTrigger>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    id="cvv"
                    placeholder="123"
                    {...register('cvv', {
                      maxLength: 3,
                      pattern: /[0-9]{3}/ // Validación para el CVV
                    })}
                  />
                </Col>
              </Row>
            </Col>
            <Col xs={4} className="ps-3 text-center pt-2 d-none d-sm-block">
              <div className="rounded-1 p-2 mt-3 bg-100">
                <div className="text-uppercase fs-11 fw-bold">Aceptamos</div>
                <img src={cards} width={120} alt="opciones de pago con tarjeta" />
              </div>
            </Col>
          </Row>
          <Form.Check
            type="radio"
            id="paypal"
            onChange={(e) => setMethod(e.target.id)} // Cambia el método de pago a PayPal
            className="d-flex align-items-center"
          >
            <Form.Check.Input
              type="radio"
              onChange={(e) => setMethod(e.target.id)}
              name="payment-method"
            />
            <Form.Check.Label className="mb-0 ms-2">
              <img src={paypal} height={20} alt="PayPal" /> {/* Opción para PayPal */}
            </Form.Check.Label>
          </Form.Check>
          <div className="border-dashed border-bottom my-5"></div>
          <Row>
            <Col
              md={7}
              xl={12}
              xxl={7}
              className="px-md-3 mb-xxl-0 position-relative"
            >
              <div className="d-flex">
                <img
                  src={shield}
                  alt="protección"
                  width="60"
                  height="60"
                  className="me-3"
                />
                <div className="flex-1">
                  <h5 className="mb-2">Protección al Comprador</h5>
                  <Form.Check id="full-refund" className="mb-0 form-check">
                    <Form.Check.Input
                      className="mb-0"
                      type="checkbox"
                      defaultChecked
                    />
                    <Form.Check.Label className="mb-0">
                      <strong>Reembolso Completo</strong> Si no recibe su pedido
                    </Form.Check.Label>
                  </Form.Check>
                  <Form.Check id="partial-refund" className="form-check">
                    <Form.Check.Input
                      className="mb-0"
                      type="checkbox"
                      defaultChecked
                    />
                    <Form.Check.Label className="mb-0">
                      <strong>Reembolso Completo o Parcial,</strong> Si el producto no es como se describe
                    </Form.Check.Label>
                  </Form.Check>
                  <Link to="#!" className="fs-10 ms-3 ps-2">
                    Aprender Más
                    <FontAwesomeIcon
                      icon="caret-right"
                      className="ms-1"
                      transform="down-2"
                    />
                  </Link>
                </div>
              </div>
              <div className="vertical-line d-none d-md-block d-xl-none d-xxl-block"></div>
            </Col>
            <Col
              md={5}
              xl={12}
              xxl={5}
              className="ps-xxl-5 text-center text-md-start text-xl-center text-xxl-start"
            >
              <div className="border-dashed border-bottom d-block d-md-none d-xl-block d-xxl-none my-4"></div>
              <div className="fs-7 fw-semibold">
                Total: <span className="text-primary">${payableTotal}</span> {/* Muestra el total a pagar */}
              </div>
              <Button
                variant="success"
                className="mt-3 px-5"
                type="submit"
                disabled={payableTotal === '0.00'} // Deshabilita el botón si el total es 0
              >
                Confirmar y Pagar {/* Botón para confirmar y realizar el pago */}
              </Button>
              <p className="fs-10 mt-3 mb-0">
                Al hacer clic en el botón <strong>Confirmar y Pagar</strong>, aceptas los <Link to="#!">Términos y Condiciones</Link>
              </p>
            </Col>
          </Row>
        </Form>
      </Card.Body>
    </Card>
  );
};

PaymentMethod.propTypes = {
  payableTotal: PropTypes.oneOfType([PropTypes.number, PropTypes.string]) // Propiedades esperadas para el total a pagar
};

export default PaymentMethod;
