// Componente BillingCard: Muestra la información de facturación y opciones de suscripción para el usuario. 
// Permite seleccionar entre un plan mensual o anual y muestra los costos asociados y el estado de la prueba gratuita.

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Flex from 'components/common/Flex'; // Componente de diseño flexbox
import React from 'react';
import { Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const BillingCard = () => {
  return (
    <>
      <Form.Select className="mb-3" defaultValue="monthly">
        <option value="monthly">Plan Mensual</option> {/* Opción para el plan mensual */}
        <option value="annually">Plan Anual</option> {/* Opción para el plan anual */}
      </Form.Select>
      <Flex className="fs-10 mb-1" justifyContent="between">  
        <p className="mb-0">Vencido en 30 días</p> {/* Indica el plazo de vencimiento */}
        <span>$375.00</span> {/* Muestra el monto a pagar */}
      </Flex>
      <Flex className="fs-10 mb-1 text-success" justifyContent="between">
        <p className="mb-0">Ahorro Anual</p> {/* Muestra el ahorro anual */}
        <span>$75.00/año</span> {/* Muestra el ahorro en términos anuales */}
      </Flex>
      <hr />
      <h5 className="d-flex justify-content-between">
        <span>Vencido hoy</span> {/* Indica el pago a realizar hoy */}
        <span>$0.00</span> {/* Muestra el monto a pagar hoy */}
      </h5>
      <p className="fs-10 text-600">
        Una vez que inicie su prueba, tendrá 30 días para usar Falcon Premium
        gratis. Después de 30 días se le cobrará según el plan seleccionado. {/* Información sobre la prueba gratuita */}
      </p>
      <Button variant="primary" className="d-block w-100">
        <FontAwesomeIcon icon="lock" className="me-2" />
        Iniciar prueba gratuita {/* Botón para iniciar la prueba gratuita */}
      </Button>
      <div className="text-center mt-2">
        <small className="d-inline-block">
          Al continuar, usted acepta nuestros{' '}
          <Link to="#!">términos</Link> y se le cobrará al final de la
          prueba. {/* Enlace a los términos y condiciones */}
        </small>
      </div>
    </>
  );
};

export default BillingCard;
