/**
 * NavbarDropdown Component
 * 
 * Este componente renderiza un menú desplegable (`Dropdown`) en la barra de navegación, que se muestra 
 * al pasar el cursor o hacer clic en el enlace según el ancho de la ventana. Muestra diferentes estilos 
 * y contenido según el título del menú.
 * 
 * Propiedades:
 * - `title`: Título del menú desplegable, que se muestra capitalizado.
 * - `children`: Contenido adicional que se inserta en el cuerpo del menú desplegable.
 * 
 * Funcionalidad:
 * - `dropdownOpen`: Estado para controlar si el menú está abierto o cerrado.
 * - `onMouseOver` y `onMouseLeave`: Muestran y ocultan el menú automáticamente en pantallas anchas (según el ancho configurado en `topNavbarBreakpoint`).
 * - `Dropdown.Toggle`: Enlace que abre el menú desplegable, capitalizando el título.
 * - `Dropdown.Menu`: Muestra el contenido, incluyendo una imagen decorativa y el contenido `children`.
 * 
 * Estilos Condicionales:
 * - El menú aplica diferentes estilos de tarjeta (`navbar-card-app`, `navbar-card-pages`, etc.) según el título.
 * - Incluye una imagen (`AuthCornerImage`) si el título no es "dashboard" ni "documentation".
 * 
 * Ejemplo de uso:
 * ```jsx
 * <NavbarDropdown title="app">
 *   <Dropdown.Item>Opción 1</Dropdown.Item>
 *   <Dropdown.Item>Opción 2</Dropdown.Item>
 * </NavbarDropdown>
 * ```
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { Card, Dropdown } from 'react-bootstrap';
import AuthCornerImage from 'assets/img/illustrations/authentication-corner.png';
import { breakpoints, capitalize } from 'helpers/utils';
import { topNavbarBreakpoint } from 'config';

const NavbarDropdown = ({ title, children }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <Dropdown
      show={dropdownOpen}
      onToggle={() => setDropdownOpen(!dropdownOpen)}
      onMouseOver={() => {
        let windowWidth = window.innerWidth;
        if (windowWidth >= breakpoints[topNavbarBreakpoint]) {
          setDropdownOpen(true);
        }
      }}
      onMouseLeave={() => {
        let windowWidth = window.innerWidth;
        if (windowWidth >= breakpoints[topNavbarBreakpoint]) {
          setDropdownOpen(false);
        }
      }}
    >
      <Dropdown.Toggle as={Link} to="#!" className="nav-link fw-semibold">
        {capitalize(title)}
      </Dropdown.Toggle>
      <Dropdown.Menu className="dropdown-menu-card mt-0 dropdown-caret">
        <Card
          className={classNames('shadow-none dark__bg-1000', {
            'navbar-card-app': title === 'app',
            'navbar-card-pages': title === 'pages',
            'navbar-card-components': title === 'modules'
          })}
        >
          <Card.Body
            className={classNames('scrollbar max-h-dropdown', {
              'p-0 py-2': title === 'dashboard' || title === 'documentation'
            })}
          >
            {title !== 'dashboard' && title !== 'documentation' && (
              <img
                src={AuthCornerImage}
                alt=""
                className="img-dropdown"
                width={130}
              />
            )}
            {children}
          </Card.Body>
        </Card>
      </Dropdown.Menu>
    </Dropdown>
  );
};

NavbarDropdown.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node
};

export default NavbarDropdown;
