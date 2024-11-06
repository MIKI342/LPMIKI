/**
 * Componente NavbarTop
 *
 * Este componente NavbarTop se utiliza en la parte superior de la aplicación para la navegación principal.
 * Integra un logotipo, una barra de búsqueda, iconos de usuario para el inicio de sesión y navegación adicional para usuarios autenticados.
 * Es parte del diseño global de la aplicación y se adapta según el estado de autenticación.
 *
 * Dependencias:
 * - `AuthContext`: Verifica el estado de autenticación para mostrar elementos condicionales.
 * - `useAppContext`: Contexto global para manejar la visibilidad del menú vertical.
 *
 * Estructura:
 * - Muestra el logo de la aplicación, un icono de menú de hamburguesa para pantallas pequeñas, y un icono de usuario cuando no se está autenticado.
 * - Cuando el usuario está autenticado, muestra los elementos de navegación adicionales (`TopNavRightSideNavItem`).
 * - Incluye un efecto de sombra en la barra de navegación al hacer scroll.
 *
 * Ejemplo de uso:
 * ```jsx
 * <NavbarTop />
 * ```
 */
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
import useWindowSize from 'hooks/useWindowSize'; // Importar el hook

const NavbarTop = () => {
  const { isAuthenticated } = useContext(AuthContext); // Estado de autenticación del usuario
  const { toggleNavbarVertical } = useAppContext(); // Función para mostrar/ocultar el menú vertical
  const [showDropShadow, setShowDropShadow] = useState(false); // Estado para la sombra en el navbar

  const size = useWindowSize(); // Usar el hook para detectar el tamaño de la ventana

  useEffect(() => {
    // Escucha de scroll para aplicar sombra al navbar
    const setDropShadow = () => {
      setShowDropShadow(document.documentElement.scrollTop > 0);
    };
    window.addEventListener('scroll', setDropShadow);
    return () => window.removeEventListener('scroll', setDropShadow);
  }, []);

  return (
    <Navbar
      className={classNames('navbar-glass fs-10 navbar-top sticky-kit', {
        'navbar-glass-shadow': showDropShadow // Añade sombra cuando se desplaza la página
      })}
      expand="lg"
    >
      <Container fluid>
        <Row className="align-items-center">
          {/* Menú de hamburguesa solo visible en dispositivos pequeños */}
          <Col xs="auto">
            {size.width <= 768 && ( // Mostrar solo si el tamaño de la ventana es pequeño
              <button
                className="btn btn-link d-xl-none"
                onClick={toggleNavbarVertical}
                aria-label="Toggle navigation"
                style={{ color: '#343a40' }}
              >
                <i className="fas fa-bars"></i> {/* Ícono de hamburguesa */}
              </button>
            )}
          </Col>

          {/* Logotipo de la aplicación */}
          <Col xs="auto">
            <Logo at="navbar-top" textClass="text-primary" width={40} id="topLogo" />
          </Col>

          {/* Ícono de usuario cuando no está autenticado */}
          {!isAuthenticated && (
            <Col xs="auto" className="ms-auto">
              <Link
                to="/authentication/simple/login"
                className="text-decoration-none"
                style={{ color: '#343a40' }}
              >
                <i className="fas fa-user"></i> {/* Ícono de usuario */}
                <span className="ms-2">Iniciar Sesión</span>
              </Link>
            </Col>
          )}

          {/* Elementos adicionales de navegación para usuarios autenticados */}
          {isAuthenticated && (
            <Col xs="auto" className="ms-auto">
              <TopNavRightSideNavItem />
            </Col>
          )}
        </Row>

        {/* Barra de búsqueda */}
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
