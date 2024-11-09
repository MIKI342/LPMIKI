// Componente OrderSummary: Muestra un resumen del pedido, incluyendo los artículos en el carrito, el subtotal, el costo de envío y el total a pagar.
// Utiliza el contexto del producto para acceder a la información del carrito y aplicar descuentos promocionales si están disponibles.

import React, { useContext } from 'react';
import { Card, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ProductContext } from 'context/Context'; // Importa el contexto del producto
import { getDiscountPrice } from 'helpers/utils'; // Función para calcular el precio después del descuento
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';

const OrderSummary = ({ shippingCost, subTotal, total, payableTotal }) => {
  const { cartItems, promo } = useContext(ProductContext); // Accedemos al contexto del producto

  return (
    <Card>
      <Card.Header className="bg-body-tertiary btn-reveal-trigger d-flex flex-between-center">
        <h5 className="mb-0">Resumen del Pedido</h5> {/* Título de la sección de resumen del pedido */}
        <Link to="/e-commerce/shopping-cart" className="btn btn-link btn-sm text-600">
          <FontAwesomeIcon icon="pencil-alt" /> {/* Ícono para editar el carrito */}
        </Link>
      </Card.Header>
      <Card.Body>
        <Table borderless className="fs-10 mb-0">
          <tbody>
            {cartItems.map((product, index) => (
              <tr key={product.id} className="border-bottom">
                <th className={classNames('ps-0', { 'pt-0': index === 0 })}>
                  {product.name} x {product.quantity} {/* Nombre del producto y cantidad */}
                </th>
                <th className={classNames('pe-0 text-end', { 'pt-0': index === 0 })}>
                  ${product.totalPrice * product.quantity} {/* Precio total del producto */}
                </th>
              </tr>
            ))}
            <tr className="border-bottom">
              <th className="ps-0">Subtotal</th>
              <th className="pe-0 text-end">${subTotal} {/* Subtotal del carrito */}</th>
            </tr>
            <tr className="border-bottom">
              <th className="ps-0">Envío</th>
              <th className="pe-0 text-end">+${shippingCost} {/* Costo de envío */}</th>
            </tr>
            <tr>
              <th className="ps-0 pb-0">Total</th>
              <th className="pe-0 text-end pb-0">${total} {/* Total antes de descuentos */}</th>
            </tr>
            {promo && (
              <tr className="border-bottom">
                <th className="ps-0 pb-0">
                  Cupón: <span className="text-success"> {promo.code}</span> (-{promo.discount}%) {/* Información del cupón aplicado */}
                </th>
                <th className="pe-0 text-end">
                  -${getDiscountPrice(total, promo.discount)} {/* Muestra el descuento aplicado */}
                </th>
              </tr>
            )}
          </tbody>
        </Table>
      </Card.Body>
      <Card.Footer className="d-flex justify-content-between bg-body-tertiary">
        <div className="fw-semibold">Total a Pagar</div> {/* Título del total a pagar */}
        <div className="fw-bold">${payableTotal} {/* Muestra el total a pagar después de descuentos */}</div>
      </Card.Footer>
    </Card>
  );
};

export default OrderSummary;
