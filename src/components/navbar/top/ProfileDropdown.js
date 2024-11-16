/**
 * Componente ProfileDropdown
 *
 * Este componente renderiza un menú desplegable de perfil para que el usuario acceda a opciones como
 * "Ir a Pro", "Perfil", "Configuración" y "Cerrar sesión". El menú se muestra al hacer clic en el avatar del usuario.
 *
 * Dependencias:
 * - `react-bootstrap`: Para los elementos de interfaz como `Dropdown`.
 * - `FontAwesomeIcon`: Para los iconos en las opciones del menú.
 * - `AuthContext`: Proporciona la función de cierre de sesión `logout`.
 *
 * Ejemplo de uso:
 * ```jsx
 * <ProfileDropdown />
 * ```
 */

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';
import team3 from 'assets/img/team/3.jpg';
import Avatar from 'components/common/Avatar';
import { AuthContext } from 'context/AuthContext';

const ProfileDropdown = () => {
  // Estado de autenticación y función de cierre de sesión
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  // Maneja el cierre de sesión
  const handleLogout = () => {
    logout();
    navigate('/authentication/simple/login'); // Redirige al login después de cerrar sesión
  };

  return (
    <Dropdown as="li" navbar>
      <Dropdown.Toggle
        as={Link}
        to="#!"
        className="pe-0 ps-2 nav-link"
        bsPrefix="toggle"
      >
        <Avatar src={team3} />
      </Dropdown.Toggle>

      <Dropdown.Menu className="dropdown-caret dropdown-menu-card dropdown-menu-end">
        <div className="bg-white rounded-2 py-2 dark__bg-1000">
          <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
        </div>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default ProfileDropdown;
