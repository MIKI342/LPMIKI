/**
 * NavbarDropdownPages Component
 * 
 * Este componente organiza y muestra enlaces de navegación de páginas en un menú desplegable dentro de la barra de navegación.
 * Utiliza la función `getFlatRoutes` para aplanar las rutas anidadas y agruparlas en categorías específicas como "Simple Auth",
 * "Card Auth", "Split Auth", "Other Auth", "Miscellaneous", "User", "Pricing", "Errors", y "Others". 
 * 
 * Propiedades:
 * - `items`: Array de objetos de ruta que representan las diferentes páginas y sus sub-rutas. Cada objeto de ruta debe contener:
 *   - `icon`: (Opcional) Icono que representa la ruta.
 *   - `name`: Nombre de la ruta (obligatorio).
 *   - `to`: (Opcional) Ruta o URL de destino.
 *   - `children`: (Opcional) Subrutas o rutas anidadas.
 * 
 * Funcionalidades:
 * - `routes`: Estructura las rutas en categorías específicas, generadas por `getFlatRoutes`.
 * - Cada columna (`Col`) contiene una categoría de rutas, representadas por el componente `NavbarNavLink`.
 * - Títulos como "Simple Auth", "Card Auth", y "Others" dividen las categorías de autenticación y otros módulos.
 * 
 * Ejemplo de uso:
 * ```jsx
 * <NavbarDropdownPages items={pageItems} />
 * ```
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Nav, Row, Col } from 'react-bootstrap';
import { getFlatRoutes } from 'helpers/utils';
import NavbarNavLink from './NavbarNavLink';

const NavbarDropdownPages = ({ items }) => {
  const routes = getFlatRoutes(items);

  return (
    <>
      <Row>
        <Col xs={6} xxl={3}>
          <Nav className="flex-column">
            <NavbarNavLink title="Simple Auth" />
            {routes.authentication.slice(0, 7).map(route => (
              <NavbarNavLink key={route.name} route={route} />
            ))}
          </Nav>
        </Col>
        <Col xs={6} xxl={3}>
          <Nav className="flex-column">
            <NavbarNavLink title="Card Auth" />
            {routes.authentication.slice(7, 14).map(route => (
              <NavbarNavLink key={route.name} route={route} />
            ))}
          </Nav>
        </Col>
        <Col xs={6} xxl={3}>
          <Nav className="flex-column">
            <NavbarNavLink title="Split Auth" />
            {routes.authentication.slice(14, 21).map(route => (
              <NavbarNavLink key={route.name} route={route} />
            ))}
          </Nav>
        </Col>
        <Col xs={6} xxl={3}>
          <Nav className="flex-column">
            <NavbarNavLink title="Other Auth" />
            {routes.authentication.slice(21, 23).map(route => (
              <NavbarNavLink key={route.name} route={route} />
            ))}
            <NavbarNavLink title="Miscellaneous" />
            {routes.miscellaneous.map(route => (
              <NavbarNavLink key={route.name} route={route} />
            ))}
          </Nav>
        </Col>
      </Row>
      <Row>
        <Col xs={6} xxl={3}>
          <Nav className="flex-column">
            <NavbarNavLink title="User" />
            {routes.user.map(route => (
              <NavbarNavLink key={route.name} route={route} />
            ))}
          </Nav>
        </Col>
        <Col xs={6} xxl={3}>
          <Nav className="flex-column">
            <NavbarNavLink title="Pricing" />
            {routes.pricing.map(route => (
              <NavbarNavLink key={route.name} route={route} />
            ))}
          </Nav>
        </Col>
        <Col xs={6} xxl={3}>
          <Nav className="flex-column">
            <NavbarNavLink title="Errors" />
            {routes.errors.map(route => (
              <NavbarNavLink key={route.name} route={route} />
            ))}
          </Nav>
        </Col>
        <Col xs={6} xxl={3}>
          <Nav className="flex-column">
            <NavbarNavLink title="Others" />
            {routes.unTitled.map(route => (
              <NavbarNavLink key={route.name} route={route} />
            ))}
          </Nav>
        </Col>
      </Row>
    </>
  );
};

NavbarDropdownPages.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      icon: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
      name: PropTypes.string.isRequired,
      to: PropTypes.string,
      children: PropTypes.array
    }).isRequired
  ).isRequired
};

export default NavbarDropdownPages;
