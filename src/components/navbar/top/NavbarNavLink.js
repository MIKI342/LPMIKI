/**
 * Componente NavbarNavLink
 *
 * Este componente es un enlace de navegación dentro de la barra de navegación, que muestra el título o nombre de una ruta.
 * Al hacer clic, puede activar un modal de autenticación y controlar la visibilidad del menú colapsable.
 *
 * Propiedades:
 * - `title`: Título opcional para mostrar en lugar del nombre de la ruta.
 * - `route`: Objeto que representa la ruta de navegación, con propiedades:
 *   - `name`: Nombre de la ruta (requerido).
 *   - `to`: URL o ruta de destino (requerido).
 *   - `active`: Estado de activación del enlace (opcional).
 *
 * Funcionalidades:
 * - `handleClick`: Lógica de clic que activa el modal de autenticación y ajusta los estados `navbarCollapsed` y `showBurgerMenu`
 *    en la configuración global según corresponda.
 *
 * Ejemplo de uso:
 * ```jsx
 * <NavbarNavLink title="Inicio" route={{ name: 'Inicio', to: '/home', active: true }} />
 * ```
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Nav } from 'react-bootstrap';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { useAppContext } from 'Main';

const NavbarNavLink = ({ title, route }) => {
  const {
    config: { navbarCollapsed, showBurgerMenu },
    setConfig
  } = useAppContext();

  const handleClick = () => {
    // Si el nombre de la ruta es 'Modal', abre el modal de autenticación
    if (route.name === 'Modal') {
      setConfig('openAuthModal', true);
    }
    // Alterna el estado de la barra de navegación colapsable
    if (navbarCollapsed) {
      setConfig('navbarCollapsed', !navbarCollapsed);
    }
    // Alterna el estado del menú de hamburguesa
    if (showBurgerMenu) {
      setConfig('showBurgerMenu', !showBurgerMenu);
    }
  };

  return (
    <Nav.Link
      as={title ? 'p' : Link}
      className={classNames('fw-medium', {
        'text-500': !route?.active,                // Estilo para enlace no activo
        'text-700 mb-0 fw-bold': title,            // Estilo para títulos
        'py-1': !title,                            // Padding si no es título
        'link-600': !title && route?.active        // Estilo para enlace activo
      })}
      to={route?.to}
      onClick={handleClick}
    >
      {title ? title : route.name}
    </Nav.Link>
  );
};

NavbarNavLink.propTypes = {
  title: PropTypes.string,
  route: PropTypes.shape({
    name: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired,
    active: PropTypes.bool
  })
};

export default NavbarNavLink;
