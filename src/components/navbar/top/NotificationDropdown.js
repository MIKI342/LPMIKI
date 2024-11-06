/**
 * Componente NotificationDropdown
 *
 * Este componente muestra un menú de notificaciones con opciones para marcar todas las notificaciones
 * como leídas y ver la lista completa. Los usuarios también pueden cerrar automáticamente el menú 
 * cuando se desplaza la pantalla en dispositivos más pequeños.
 *
 * Dependencias:
 * - `react-bootstrap`: Para componentes de interfaz como `Dropdown`, `Card`, y `ListGroup`.
 * - `FontAwesome`: Para el icono de notificación.
 *
 * Ejemplo de uso:
 * ```jsx
 * <NotificationDropdown />
 * ```
 */

import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { Card, Dropdown, ListGroup } from 'react-bootstrap';

import FalconCardHeader from 'components/common/FalconCardHeader';

const NotificationDropdown = () => {
  // Estado para controlar la visibilidad del menú y si todas las notificaciones están leídas
  const [isOpen, setIsOpen] = useState(false);
  const [isAllRead, setIsAllRead] = useState(false);

  // Controla la apertura/cierre del menú de notificaciones
  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  // Cierra el menú de notificaciones en pantallas pequeñas al hacer scroll
  useEffect(() => {
    const closeDropdownOnScroll = () => {
      window.innerWidth < 1200 && setIsOpen(false);
    };
    window.addEventListener('scroll', closeDropdownOnScroll);

    return () => {
      window.removeEventListener('scroll', closeDropdownOnScroll);
    };
  }, []);

  // Marca todas las notificaciones como leídas
  const markAsRead = (e) => {
    e.preventDefault();
    setIsAllRead(true);
  };

  return (
    <Dropdown as="li" show={isOpen} onToggle={handleToggle} navbar>
      <Dropdown.Toggle
        as={Link}
        to="#!"
        className={classNames('px-0 nav-link', {
          'notification-indicator notification-indicator-primary': !isAllRead
        })}
        bsPrefix="toggle"
      >
        <FontAwesomeIcon icon="bell" transform="shrink-6" className="fs-5" />
      </Dropdown.Toggle>

      <Dropdown.Menu className="dropdown-menu-card dropdown-menu-end dropdown-caret dropdown-caret-bg">
        <Card
          className="dropdown-menu-notification dropdown-menu-end shadow-none"
          style={{ maxWidth: '20rem' }}
        >
          {/* Encabezado de notificaciones con opción de "Marcar todas como leídas" */}
          <FalconCardHeader
            title="Notifications"
            titleTag="h6"
            className="card-header"
            light={false}
            endEl={
              <Link
                to="#!"
                onClick={markAsRead}
                className="card-link fw-normal"
              >
                Mark all as read
              </Link>
            }
          />
          <ListGroup
            variant="flush"
            className="fw-normal fs-10 scrollbar"
            style={{ maxHeight: '19rem' }}
          >
            {/* Aquí se podrían mapear las notificaciones */}
          </ListGroup>
          {/* Pie de tarjeta con enlace para ver todas las notificaciones */}
          <div className="card-footer text-center border-top" onClick={handleToggle}>
            <Link to="#!" className="card-link d-block">
              View all
            </Link>
          </div>
        </Card>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default NotificationDropdown;
