import { useContext } from 'react';
import { Col, Row } from 'react-bootstrap';
import { ProductContext } from 'context/Context';
import OrderSummary from './OrderSummary';
import CheckoutShipping from './CheckoutShipping';
import PaymentMethod from './PaymentMethod';

const Checkout = () => {
  const { cartItems, getCartTotal, promo } = useContext(ProductContext);

  const shippingCost = 10;
  const subTotal = getCartTotal; // Utiliza el valor directamente
  const total = subTotal + shippingCost;
  const discount = promo ? (total * promo.discount) / 100 : 0;
  const payableTotal = total - discount;

  return (
    <Row className="g-3">
      <Col xl={{ span: 4, order: 1 }}>
        <OrderSummary
          shippingCost={shippingCost}
          subTotal={subTotal}
          total={total}
          payableTotal={payableTotal}
        />
      </Col>
      <Col xl={8}>
        <CheckoutShipping />
        <PaymentMethod payableTotal={payableTotal} />
      </Col>
    </Row>
  );
};

export default Checkout;
