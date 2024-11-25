import React, { useEffect, useState } from 'react';
import { Navbar, Container, Row, Col } from 'react-bootstrap';
import classNames from 'classnames';
import { useAppContext } from 'Main';
import SearchBox from './SearchBox';
import '@fortawesome/fontawesome-free/css/all.min.css';
import useWindowSize from 'hooks/useWindowSize';

const NavbarTop = () => {
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
        'navbar-glass-shadow': showDropShadow,
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
