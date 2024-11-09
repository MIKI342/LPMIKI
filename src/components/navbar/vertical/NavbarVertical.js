import React, { useEffect, Fragment, useRef } from 'react';
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

import bgNavbar from 'assets/img/generic/bg-navbar.png';
import { useAppContext } from 'Main';
import useWindowSize from 'hooks/useWindowSize';

const NavbarVertical = () => {
  const {
    config: { navbarPosition, navbarStyle, isNavbarVerticalCollapsed, showBurgerMenu },
    setConfig,
  } = useAppContext();

  const HTMLClassList = document.getElementsByTagName('html')[0].classList;
  const size = useWindowSize();
  const menuRef = useRef(null);
  const toggleButtonRef = useRef(null); // Nueva referencia para el ícono de hamburguesa

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

  // Manejo de clics fuera del menú
  const handleOutsideClick = (event) => {
    if (
      menuRef.current &&
      !menuRef.current.contains(event.target) &&
      toggleButtonRef.current &&
      !toggleButtonRef.current.contains(event.target)
    ) {
      if (showBurgerMenu) {
        setConfig('showBurgerMenu', false);
      }
      if (!isNavbarVerticalCollapsed) {
        setConfig('isNavbarVerticalCollapsed', true);
      }
    }
  };

  // Manejo del scroll
  const handleScroll = () => {
    if (showBurgerMenu) {
      setConfig('showBurgerMenu', false);
    }
    if (!isNavbarVerticalCollapsed) {
      setConfig('isNavbarVerticalCollapsed', true);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
    window.addEventListener('scroll', handleScroll);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [showBurgerMenu, isNavbarVerticalCollapsed]);

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
          <ToggleButton ref={toggleButtonRef} />
        </Flex>
        <Navbar.Collapse
          in={!isNavbarVerticalCollapsed}
          onMouseEnter={() =>
            isNavbarVerticalCollapsed &&
            HTMLClassList.add('navbar-vertical-collapsed-hover')
          }
          onMouseLeave={() => HTMLClassList.remove('navbar-vertical-collapsed-hover')}
          style={{
            backgroundImage:
              navbarStyle === 'vibrant'
                ? `linear-gradient(-45deg, rgba(0, 160, 255, 0.86), #0048a2), url(${bgNavbar})`
                : 'none',
          }}
          transition={false}
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
                <Nav navbar>
                  <NavbarTopDropDownMenus />
                </Nav>
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
