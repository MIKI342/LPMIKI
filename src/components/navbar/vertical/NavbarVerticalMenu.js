/**
 * Componente NavbarVerticalMenu
 *
 * Representa una barra de navegación vertical que permite mostrar elementos anidados de forma colapsable.
 * - Soporta múltiples niveles de anidación.
 * - Colapsa automáticamente los submenús y utiliza la URL actual para determinar si deben abrirse.
 * - Permite cerrar el menú vertical si el modo "burger menu" está activo.
 *
 * Dependencias:
 * - `useAppContext`: Contexto para obtener y actualizar configuraciones globales.
 * - `NavbarVerticalMenuItem`: Renderiza un ítem de menú individual.
 * - `CollapseItems`: Controla la lógica de colapso y expansión de submenús.
 *
 * Ejemplo de uso:
 * ```jsx
 * <NavbarVerticalMenu routes={routes} />
 * ```
 */

import React, { useState } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { Collapse, Nav } from 'react-bootstrap';
import { NavLink, useLocation } from 'react-router-dom';
import NavbarVerticalMenuItem from './NavbarVerticalMenuItem';
import { useAppContext } from 'Main';

const CollapseItems = ({ route }) => {
  const { pathname } = useLocation();

  const openCollapse = (childrens = []) => {
    const checkLink = children => {
      if (children.to === pathname) {
        return true;
      }
      return (
        Object.prototype.hasOwnProperty.call(children, 'children') &&
        children.children.some(checkLink)
      );
    };
    return childrens.some(checkLink);
  };

  const [open, setOpen] = useState(openCollapse(route.children));

  return (
    <Nav.Item as="li">
      <Nav.Link
        onClick={() => {
          setOpen(!open);
        }}
        className={classNames('dropdown-indicator cursor-pointer', {
          'text-500': !route.active
        })}
        aria-expanded={open}
      >
        <NavbarVerticalMenuItem route={route} />
      </Nav.Link>
      <Collapse in={open}>
        {/* Asegura que `route.children` siempre sea un array */}
        <Nav className="flex-column nav" as="ul">
          <NavbarVerticalMenu routes={route.children || []} />
        </Nav>
      </Collapse>
    </Nav.Item>
  );
};

CollapseItems.propTypes = {
  route: PropTypes.shape({
    name: PropTypes.string.isRequired,
    icon: PropTypes.string,
    children: PropTypes.array.isRequired,
    active: PropTypes.bool
  }).isRequired
};

const NavbarVerticalMenu = ({ routes }) => {
  const {
    config: { showBurgerMenu },
    setConfig
  } = useAppContext();

  const handleNavItemClick = () => {
    if (showBurgerMenu) {
      setConfig('showBurgerMenu', !showBurgerMenu);
    }
  };

  // Asegura que `routes` sea un array
  const validRoutes = Array.isArray(routes) ? routes : [];

  return validRoutes.map(route => {
    if (!route.children) {
      return (
        <Nav.Item as="li" key={route.name} onClick={handleNavItemClick}>
          <NavLink
            end={route.exact}
            to={route.to}
            onClick={() =>
              route.name === 'Modal'
                ? setConfig('openAuthModal', true)
                : undefined
            }
            className={({ isActive }) =>
              classNames('nav-link', { active: isActive && route.to !== '#!' })
            }
          >
            <NavbarVerticalMenuItem route={route} />
          </NavLink>
        </Nav.Item>
      );
    }
    return <CollapseItems route={route} key={route.name} />;
  });
};

NavbarVerticalMenu.propTypes = {
  routes: PropTypes.arrayOf(PropTypes.shape(NavbarVerticalMenuItem.propTypes))
    .isRequired
};

export default NavbarVerticalMenu;
