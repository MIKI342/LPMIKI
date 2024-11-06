/**
 * CartNotification Component
 * 
 * Este componente muestra un icono de carrito de compras con una notificación indicadora del número de productos
 * en el carrito. Se utiliza para alertar visualmente al usuario sobre la cantidad de artículos en su carrito de compras.
 * 
 * Funcionalidades:
 * - `cartItems`: Array de productos en el carrito, obtenido del `ProductContext`.
 * - `getProductsQuantity(cartItems)`: Función que calcula el número total de artículos en el carrito.
 * - Notificación visual: Si hay productos en el carrito, muestra un indicador de notificación con el número de productos.
 * 
 * Propiedades y estilo:
 * - `Nav.Item`: Contenedor para el enlace de navegación del carrito.
 * - `FontAwesomeIcon`: Icono de carrito de compras (shopping-cart) con tamaño ajustado.
 * - `notification-indicator`: Clase que estiliza el indicador de notificación.
 * 
 * Ejemplo de uso:
 * ```jsx
 * <CartNotification />
 * ```
 */

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import { ProductContext } from 'context/Context';
import { getProductsQuantity } from 'helpers/utils';
import React, { useContext } from 'react';
import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const CartNotification = () => {
  const { cartItems } = useContext(ProductContext); // Accedemos directamente a cartItems

  return (
    <Nav.Item as="li" className="d-none d-sm-block">
      <Nav.Link
        as={Link}
        to="/e-commerce/shopping-cart"
        className={classNames('px-0', {
          'notification-indicator notification-indicator-warning position-relative notification-indicator-fill':
            getProductsQuantity(cartItems)
        })}
      >
        {cartItems?.length > 0 && (
          <span className="notification-indicator-number">
            {getProductsQuantity(cartItems)}
          </span>
        )}
        <FontAwesomeIcon
          icon="shopping-cart"
          transform="shrink-7"
          className="fs-5"
        />
      </Nav.Link>
    </Nav.Item>
  );
};

export default CartNotification;
