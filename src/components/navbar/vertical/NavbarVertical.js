import React, { useEffect, Fragment, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Nav, Navbar, Row, Col } from 'react-bootstrap';
import { navbarBreakPoint, topNavbarBreakpoint } from 'config';
import Flex from 'components/common/Flex';
import NavbarVerticalMenu from './NavbarVerticalMenu';
import ToggleButton from './ToggleButton';
import routes from 'routes/siteMaps';
import { capitalize } from 'helpers/utils';

import bgNavbar from 'assets/img/generic/bg-navbar.png';
import { useAppContext } from 'Main';
import useWindowSize from 'hooks/useWindowSize';

const NavbarVertical = () => {
  const {
    config: { navbarPosition, navbarStyle, isNavbarVerticalCollapsed, showBurgerMenu },
    setConfig,
  } = useAppContext();

  const HTMLClassList = document.documentElement.classList;
  const size = useWindowSize();
  const menuRef = useRef(null);
  const toggleButtonRef = useRef(null);
  const [canOpenMenu, setCanOpenMenu] = useState(true); // Controlar si el menú puede abrirse

  // Verificar la posición de la barra de desplazamiento
  const checkScrollBarPosition = () => {
    const scrollPosition = window.scrollY; // Posición actual del scroll
    const windowHeight = window.innerHeight; // Altura visible de la ventana
    const fullHeight = document.body.offsetHeight; // Altura total del documento
    const buffer = 50; // Margen de píxeles para considerar "cerca del final"

    // Si la barra de desplazamiento está al final o cerca del final, bloquear la apertura
    const isNearBottom = scrollPosition + windowHeight >= fullHeight - buffer;
    setCanOpenMenu(!isNearBottom); // Solo permitir abrir si no estamos al final
  };

  const handleOutsideClick = (event) => {
    if (
      menuRef.current &&
      !menuRef.current.contains(event.target) &&
      toggleButtonRef.current &&
      !toggleButtonRef.current.contains(event.target)
    ) {
      HTMLClassList.remove('menu-open');
      setConfig('showBurgerMenu', false);
      setConfig('isNavbarVerticalCollapsed', true);
    }
  };

  const handleScroll = () => {
    HTMLClassList.remove('menu-open');
    setConfig('showBurgerMenu', false);
    setConfig('isNavbarVerticalCollapsed', true);
    checkScrollBarPosition(); // Verificar posición al hacer scroll
  };

  const openMenu = () => {
    if (!canOpenMenu) {
      console.log("No se puede abrir el menú porque estás cerca o al final de la página.");
      return; // Bloquear apertura si estamos al final
    }

    HTMLClassList.add('menu-open');
    setConfig('showBurgerMenu', true);
    setConfig('isNavbarVerticalCollapsed', false);
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
    window.addEventListener('scroll', handleScroll);
    checkScrollBarPosition(); // Inicializar estado al montar

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (size.width > 768) {
      if (isNavbarVerticalCollapsed) {
        HTMLClassList.add('navbar-vertical-collapsed');
        document.body.classList.add('content-shift-collapsed');
      } else {
        HTMLClassList.remove('navbar-vertical-collapsed');
        document.body.classList.remove('content-shift-collapsed');
      }
    } else {
      document.body.classList.remove('content-shift-collapsed');
      if (showBurgerMenu) {
        HTMLClassList.add('menu-open');
      } else {
        HTMLClassList.remove('menu-open');
      }
    }

    return () => {
      HTMLClassList.remove('navbar-vertical-collapsed-hover');
      document.body.classList.remove('content-shift-collapsed');
      HTMLClassList.remove('menu-open');
    };
  }, [isNavbarVerticalCollapsed, showBurgerMenu, size.width]);

  return (
    <div ref={menuRef}>
      <Navbar
        expand={navbarBreakPoint}
        className={classNames('navbar-vertical', {
          [`navbar-${navbarStyle}`]: navbarStyle !== 'transparent',
        })}
        variant="light"
      >
        <Flex alignItems="center">
          <ToggleButton
            ref={toggleButtonRef}
            onClick={openMenu} // Llama a la función que controla si el menú puede abrirse
          />
        </Flex>
        <Navbar.Collapse
          in={!isNavbarVerticalCollapsed}
          onMouseEnter={() => size.width > 768 && HTMLClassList.add('navbar-vertical-collapsed-hover')}
          onMouseLeave={() => size.width > 768 && HTMLClassList.remove('navbar-vertical-collapsed-hover')}
          style={{
            backgroundImage:
              navbarStyle === 'vibrant'
                ? `linear-gradient(-45deg, rgba(0, 160, 255, 0.86), #0048a2), url(${bgNavbar})`
                : 'none',
          }}
        >
          <div className="navbar-vertical-content scrollbar">
            <Nav className="flex-column" as="ul">
              {routes.map((route) => (
                <Fragment key={route.label}>
                  {!route.labelDisable && <NavbarLabel label={capitalize(route.label)} />}
                  <NavbarVerticalMenu routes={route.children} />
                </Fragment>
              ))}
            </Nav>
            {navbarPosition === 'combo' && (
              <div className={`d-${topNavbarBreakpoint}-none`}>
                <div className="navbar-vertical-divider">
                  <hr className="navbar-vertical-hr my-2" />
                </div>
              </div>
            )}
          </div>
        </Navbar.Collapse>
      </Navbar>
    </div>
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

NavbarLabel.propTypes = {
  label: PropTypes.string.isRequired,
};

export default NavbarVertical;
