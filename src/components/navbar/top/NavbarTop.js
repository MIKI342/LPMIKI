import React, { useContext, useEffect, useState } from 'react';
import { Navbar, Container, Row, Col } from 'react-bootstrap';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { AuthContext } from 'context/AuthContext';
import { useAppContext } from 'Main';
import Logo from 'components/common/Logo';
import SearchBox from './SearchBox';
import TopNavRightSideNavItem from './TopNavRightSideNavItem';
import '@fortawesome/fontawesome-free/css/all.min.css';
import useWindowSize from 'hooks/useWindowSize';

const NavbarTop = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const { config, setConfig } = useAppContext();
  const [showDropShadow, setShowDropShadow] = useState(false);

  const size = useWindowSize();

  useEffect(() => {
    const setDropShadow = () => {
      setShowDropShadow(document.documentElement.scrollTop > 0);
    };
    window.addEventListener('scroll', setDropShadow);
    return () => window.removeEventListener('scroll', setDropShadow);
  }, []);

  // Alternar el estado de visibilidad del menú vertical
  const toggleNavbarVertical = () => {
    const newShowBurgerMenu = !config.showBurgerMenu;
    setConfig('showBurgerMenu', newShowBurgerMenu);
    setConfig('isNavbarVerticalCollapsed', !newShowBurgerMenu);
  };

  return (
    <Navbar
      className={classNames('navbar-glass fs-10 navbar-top sticky-kit', {
        'navbar-glass-shadow': showDropShadow
      })}
      expand="lg"
    >
      <Container fluid>
        <Row className="align-items-center">
          <Col xs="auto">
            {size.width <= 768 && (
              <button
                className="btn btn-link d-xl-none"
                onClick={toggleNavbarVertical}
                aria-label="Toggle navigation"
                style={{ color: '#343a40' }}
              >
                <i className="fas fa-bars"></i>
              </button>
            )}
          </Col>

          <Col xs="auto">
            <Logo at="navbar-top" textClass="text-primary" width={40} id="topLogo" />
          </Col>

          {!isAuthenticated && (
            <Col xs="auto" className="ms-auto">
              <Link
                to="/authentication/simple/login"
                className="text-decoration-none"
                style={{ color: '#343a40' }}
              >
                <i className="fas fa-user"></i>
                <span className="ms-2">Iniciar Sesión</span>
              </Link>
            </Col>
          )}

          {isAuthenticated && (
            <Col xs="auto" className="ms-auto">
              <TopNavRightSideNavItem />
            </Col>
          )}
        </Row>

        <Row className="align-items-center">
          <Col xs={12}>
            <SearchBox />
          </Col>
        </Row>
      </Container>
    </Navbar>
  );
};

export default NavbarTop;
