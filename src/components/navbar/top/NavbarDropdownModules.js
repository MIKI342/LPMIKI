/**
 * NavbarDropdownModules Component
 * 
 * Este componente organiza y muestra rutas en un menú desplegable de varios módulos dentro de la barra de navegación.
 * Utiliza la función `getFlatRoutes` para estructurar las rutas en categorías, tales como "Components", "Forms", "Tables",
 * "Charts", "Utilities", "Icons", y "Maps". Las rutas se distribuyen en columnas, cada una con un conjunto de enlaces
 * organizados por módulos específicos.
 * 
 * Propiedades:
 * - `items`: Array de objetos de ruta que representan los módulos y sus sub-rutas. Cada objeto debe contener:
 *   - `icon`: (Opcional) Icono que representa la ruta.
 *   - `name`: Nombre de la ruta (obligatorio).
 *   - `to`: (Opcional) Ruta o URL de destino.
 *   - `children`: (Opcional) Rutas anidadas.
 * 
 * Funcionalidades:
 * - `routes`: Contiene las rutas estructuradas en categorías, generadas por `getFlatRoutes`.
 * - Cada columna (`Col`) contiene una categoría específica de rutas, representadas por el componente `NavbarNavLink`.
 * - Los títulos de las categorías como "Components", "Forms", "Tables", "Charts" y "Utilities" se dividen en subgrupos 
 *   dentro de cada columna.
 * 
 * Ejemplo de uso:
 * ```jsx
 * <NavbarDropdownModules items={moduleItems} />
 * ```
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Nav, Row, Col } from 'react-bootstrap';
import { getFlatRoutes } from 'helpers/utils';
import NavbarNavLink from './NavbarNavLink';

const NavbarDropdownModules = ({ items }) => {
  const routes = getFlatRoutes(items);

  return (
    <>
      <Row>
        <Col xs={6} xxl={3}>
          <Nav className="flex-column">
            <NavbarNavLink title="Components" />
            {routes.components.slice(0, 11).map(route => (
              <NavbarNavLink key={route.name} route={route} />
            ))}
          </Nav>
        </Col>
        <Col xs={6} xxl={3}>
          <Nav className="flex-column mt-4">
            {routes.components.slice(11, 22).map(route => (
              <NavbarNavLink key={route.name} route={route} />
            ))}
          </Nav>
        </Col>
        <Col xs={6} xxl={3}>
          <Nav className="flex-column mt-xxl-4">
            {routes.components.slice(22, 33).map(route => (
              <NavbarNavLink key={route.name} route={route} />
            ))}
          </Nav>
        </Col>
        <Col xs={6} xxl={3}>
          <Nav className="flex-column mt-xxl-4">
            {routes.components.slice(33, 43).map(route => (
              <NavbarNavLink key={route.name} route={route} />
            ))}
          </Nav>
        </Col>
      </Row>
      <Row>
        <Col xs={6} xxl={3}>
          <Nav className="flex-column">
            <NavbarNavLink title="Forms" />
            {routes.forms.map(route => (
              <NavbarNavLink key={route.name} route={route} />
            ))}
          </Nav>
        </Col>
        <Col xs={6} xxl={3}>
          <Nav className="flex-column">
            <NavbarNavLink title="Tables" />
            {routes.tables.map(route => (
              <NavbarNavLink key={route.name} route={route} />
            ))}
            <NavbarNavLink title="Charts" />
            {routes.charts.slice(0, 1).map(route => (
              <NavbarNavLink key={route.name} route={route} />
            ))}
            {routes.charts.slice(1, 2).map(route => (
              <NavbarNavLink key={route.name} route={route} />
            ))}
            <NavbarNavLink title="ECharts" />
            {routes.charts.slice(1).map(route => (
              <NavbarNavLink key={route.name} route={route} />
            ))}
          </Nav>
        </Col>
        <Col xs={6} xxl={3}>
          <Nav className="flex-column">
            <NavbarNavLink title="Utilities" />
            {routes.utilities.map(route => (
              <NavbarNavLink key={route.name} route={route} />
            ))}
          </Nav>
        </Col>
        <Col xs={6} xxl={3}>
          <Nav className="flex-column">
            <NavbarNavLink title="Icons" />
            {routes.icons.map(route => (
              <NavbarNavLink key={route.name} route={route} />
            ))}
            <NavbarNavLink title="Maps" />
            {routes.maps.map(route => (
              <NavbarNavLink key={route.name} route={route} />
            ))}
          </Nav>
        </Col>
      </Row>
    </>
  );
};

NavbarDropdownModules.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      icon: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
      name: PropTypes.string.isRequired,
      to: PropTypes.string,
      children: PropTypes.array
    }).isRequired
  ).isRequired
};

export default NavbarDropdownModules;
