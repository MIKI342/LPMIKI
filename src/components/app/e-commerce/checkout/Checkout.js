// Componente Checkout: Maneja el proceso de pago, mostrando un resumen de la orden, 
// la dirección de envío y el método de pago. Utiliza el contexto del producto para acceder 
// a los artículos del carrito y calcular los totales. 

import { useContext, useEffect, useState } from 'react';
import { Col, Row, Button, Card } from 'react-bootstrap';
import { ProductContext } from 'context/Context'; // Importa el contexto del producto
import OrderSummary from './OrderSummary';  // Componente que muestra un resumen de la orden
import CheckoutShipping from './CheckoutShipping'; // Componente para la dirección de envío
import PaymentMethod from './PaymentMethod'; // Componente para el método de pago

const Checkout = () => {
  const { cartItems, getCartTotal, promo } = useContext(ProductContext); // Accedemos al contexto del producto
  const [totalCost, setTotalCost] = useState(0); // Estado para almacenar el total del carrito

  // Usamos useEffect para calcular el total cada vez que cambien los artículos en el carrito
  useEffect(() => {
    setTotalCost(getCartTotal()); // Calcula el total usando la función del contexto
  }, [cartItems]);

  const shippingCost = 10; // Costo de envío fijo o puedes calcularlo dinámicamente
  const subTotal = totalCost; // Subtotal del carrito
  const total = subTotal + shippingCost; // Total incluyendo el costo de envío
  const discount = promo ? (total * promo.discount) / 100 : 0; // Cálculo del descuento
  const payableTotal = total - discount; // Total a pagar después de aplicar el descuento

  return (
    <Row className="g-3">
      <Col xl={{ span: 4, order: 1 }}>
        {/* Componente para el resumen de la orden */}
        <OrderSummary
          shippingCost={shippingCost} // Costo de envío
          subTotal={subTotal} // Subtotal
          total={total} // Total
          payableTotal={payableTotal} // Total a pagar
        />
      </Col>
      <Col xl={8}>
        {/* Componente para la dirección de envío */}
        <CheckoutShipping />
        {/* Componente para el método de pago */}
        <PaymentMethod payableTotal={payableTotal} /> 
      </Col>
    </Row>
  );
};

export default Checkout;
