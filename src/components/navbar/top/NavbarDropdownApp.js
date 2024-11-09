/**
 * NavbarDropdownApp Component
 * 
 * Este componente organiza las rutas de navegación en columnas dentro de un menú desplegable en la barra de navegación.
 * Utiliza la función `getFlatRoutes` para obtener una lista de rutas planas (sin anidamiento) de las secciones del menú.
 * Cada columna contiene enlaces a diferentes categorías, organizados y etiquetados para una fácil navegación.
 * 
 * Propiedades:
 * - `items`: Array de objetos de ruta que representa la estructura de navegación, cada uno con:
 *   - `icon`: (Opcional) Icono asociado con la ruta.
 *   - `name`: Nombre de la ruta (obligatorio).
 *   - `to`: (Opcional) Ruta o URL de destino.
 *   - `children`: (Opcional) Subrutas o rutas anidadas.
 * 
 * Funcionalidades:
 * - `routes`: Resultado de `getFlatRoutes(items)`, separando las rutas en secciones como `unTitled`, `social`, `supportDesk`, etc.
 * - Estructura en columnas (`Col`) para cada categoría de navegación, con rutas renderizadas como `NavbarNavLink`.
 * 
 * Ejemplo de uso:
 * ```jsx
 * <NavbarDropdownApp items={menuItems} />
 * ```
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Nav, Row, Col } from 'react-bootstrap';
import { getFlatRoutes } from 'helpers/utils';
import NavbarNavLink from './NavbarNavLink';

const NavbarDropdownApp = ({ items }) => {
  const routes = getFlatRoutes(items);

  return (
    <Row>
      <Col xs={6} md={4}>
        <Nav className="flex-column">
          {routes.unTitled.map(route => (
            <NavbarNavLink key={route.name} route={route} />
          ))}
          <NavbarNavLink label="Social" title="Social" />
          {routes.social.map(route => (
            <NavbarNavLink key={route.name} route={route} />
          ))}
          <NavbarNavLink label="Support Desk" title="Support Desk" />
          {routes.supportDesk.map(route => (
            <NavbarNavLink key={route.name} route={route} />
          ))}
        </Nav>
      </Col>
      <Col xs={6} md={4}>
        <NavbarNavLink label="E Learning" title="E Learning" />
        {routes.eLearning.map(route => (
          <NavbarNavLink key={route.name} route={route} />
        ))}
        <NavbarNavLink label="Events" title="Events" />
        {routes.events.map(route => (
          <NavbarNavLink key={route.name} route={route} />
        ))}
        <NavbarNavLink label="Email" title="Email" />
        {routes.email.map(route => (
          <NavbarNavLink key={route.name} route={route} />
        ))}
      </Col>
      <Col xs={6} md={4}>
        <NavbarNavLink label="E Commerce" title="E Commerce" />
        {routes.eCommerce.map(route => (
          <NavbarNavLink key={route.name} route={route} />
        ))}
      </Col>
    </Row>
  );
};

NavbarDropdownApp.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      icon: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
      name: PropTypes.string.isRequired,
      to: PropTypes.string,
      children: PropTypes.array
    }).isRequired
  ).isRequired
};

export default NavbarDropdownApp;
