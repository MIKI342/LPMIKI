/**
 * Componente TopNavRightSideNavItem
 *
 * Este componente muestra varios elementos en la parte derecha de la barra de navegación superior, incluyendo:
 * - Un menú desplegable de selección de tema (siempre visible).
 * - Notificaciones del carrito, notificaciones generales y el perfil de usuario (visibles solo cuando el usuario está autenticado).
 *
 * Dependencias:
 * - `react-bootstrap`: Utilizado para el componente `Nav`.
 * - `AuthContext`: Contexto que proporciona información de autenticación.
 * - `ThemeControlDropdown`, `CartNotification`, `NotificationDropdown`, `ProfileDropdown`: Componentes de navegación específicos.
 *
 * Ejemplo de uso:
 * ```jsx
 * <TopNavRightSideNavItem />
 * ```
 */

import React, { useContext } from 'react';
import { Nav } from 'react-bootstrap';
import ThemeControlDropdown from './ThemeControlDropdown';
import CartNotification from 'components/navbar/top/CartNotification';
import NotificationDropdown from 'components/navbar/top/NotificationDropdown';
import ProfileDropdown from 'components/navbar/top/ProfileDropdown';
import { AuthContext } from 'context/AuthContext';

const TopNavRightSideNavItem = () => {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <Nav
      navbar
      className="navbar-nav-icons ms-auto flex-row align-items-center"
      as="ul"
    >
      <ThemeControlDropdown /> {/* Siempre visible, independiente de la autenticación */}
      
      {isAuthenticated && (
        <>
          <CartNotification />
          <NotificationDropdown />
          <ProfileDropdown />
        </>
      )}
    </Nav>
  );
};

export default TopNavRightSideNavItem;
