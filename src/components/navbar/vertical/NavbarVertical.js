/**
 * Componente NavbarVertical
 *
 * Muestra la barra de navegación vertical en la aplicación, configurable en estilo y posición, y permite colapsarla según el tamaño de pantalla.
 * - Usa un menú de navegación vertical basado en `routes` que se puede colapsar en pantallas más pequeñas.
 * - Incluye un menú desplegable superior y una tarjeta de compra (opcional).
 * - Escucha cambios en el estado de colapso de la barra para ajustar la clase de HTML.
 *
 * Dependencias:
 * - `useAppContext`: Contexto para acceder a la configuración de la aplicación.
 * - `routes`: Contiene las rutas a mapear en el menú de navegación.
 *
 * Ejemplo de uso:
 * ```jsx
 * <NavbarVertical />
 * ```
 */
import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Nav, Navbar, Row, Col } from 'react-bootstrap';
import { navbarBreakPoint, topNavbarBreakpoint } from 'config';
import Flex from 'components/common/Flex';
import NavbarVerticalMenu from './NavbarVerticalMenu';
import ToggleButton from './ToggleButton';
import routes from 'routes/siteMaps';
import { capitalize } from 'helpers/utils';
import NavbarTopDropDownMenus from 'components/navbar/top/NavbarTopDropDownMenus';
import PurchaseCard from './PurchaseCard';
import bgNavbar from 'assets/img/generic/bg-navbar.png';
import { useAppContext } from 'Main';
import useWindowSize from 'hooks/useWindowSize'; // Importar el hook

const NavbarVertical = () => {
  const {
    config: { navbarPosition, navbarStyle, isNavbarVerticalCollapsed }
  } = useAppContext();

  const HTMLClassList = document.getElementsByTagName('html')[0].classList;
  const size = useWindowSize(); // Usar el hook para detectar el tamaño de la ventana

  useEffect(() => {
    if (isNavbarVerticalCollapsed && size.width > 768) {
      HTMLClassList.add('navbar-vertical-collapsed');
    } else {
      HTMLClassList.remove('navbar-vertical-collapsed');
    }
    return () => {
      HTMLClassList.remove('navbar-vertical-collapsed-hover');
    };
  }, [isNavbarVerticalCollapsed, size.width]);

  return (
    <Navbar
      expand={navbarBreakPoint}
      className={classNames('navbar-vertical', {
        [`navbar-${navbarStyle}`]: navbarStyle !== 'transparent'
      })}
      variant="light"
    >
      <Flex alignItems="center">
        <ToggleButton />
      </Flex>
      <Navbar.Collapse
        in={!isNavbarVerticalCollapsed}
        onMouseEnter={() => isNavbarVerticalCollapsed && HTMLClassList.add('navbar-vertical-collapsed-hover')}
        onMouseLeave={() => HTMLClassList.remove('navbar-vertical-collapsed-hover')}
        style={{
          backgroundImage: navbarStyle === 'vibrant'
            ? `linear-gradient(-45deg, rgba(0, 160, 255, 0.86), #0048a2), url(${bgNavbar})`
            : 'none'
        }}
      >
        <div className="navbar-vertical-content scrollbar">
          <Nav className="flex-column" as="ul">
            {routes.map(route => (
              <Fragment key={route.label}>
                {!route.labelDisable && (
                  <NavbarLabel label={capitalize(route.label)} />
                )}
                <NavbarVerticalMenu routes={route.children} />
              </Fragment>
            ))}
          </Nav>
          {navbarPosition === 'combo' && (
            <div className={`d-${topNavbarBreakpoint}-none`}>
              <div className="navbar-vertical-divider">
                <hr className="navbar-vertical-hr my-2" />
              </div>
              <Nav navbar>
                <NavbarTopDropDownMenus />
              </Nav>
            </div>
          )}
          <PurchaseCard />
        </div>
      </Navbar.Collapse>
    </Navbar>
  );
};

const NavbarLabel = ({ label }) => (
  <Nav.Item as="li">
    <Row className="mt-3 mb-2 navbar-vertical-label-wrapper">
      <Col xs="auto" className="navbar-vertical-label">
        {label}
      </Col>
      <Col className="ps-0">
        <hr className="mb-0 navbar-vertical-divider" />
      </Col>
    </Row>
  </Nav.Item>
);

NavbarVertical.propTypes = {
  label: PropTypes.string
};

export default NavbarVertical;
