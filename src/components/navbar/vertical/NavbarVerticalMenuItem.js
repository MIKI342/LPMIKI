import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Flex from 'components/common/Flex';
import SubtleBadge from 'components/common/SubtleBadge';

/**
 * Componente NavbarVerticalMenuItem
 * 
 * Renderiza un ítem de la barra de navegación vertical con un icono, texto y badge opcionales.
 * Utiliza Flex para alinear los elementos y SubtleBadge para mostrar una insignia adicional.
 * 
 * Ejemplo de uso:
 * <NavbarVerticalMenuItem route={route} />
 */
const NavbarVerticalMenuItem = ({ route }) => {
  return (
    <Flex alignItems="center">
      {route.icon && (
        <span className="nav-link-icon">
          <FontAwesomeIcon icon={route.icon} />
        </span>
      )}
      <span className="nav-link-text ps-1">{route.name}</span>
      {route.badge && (
        <SubtleBadge pill bg={route.badge.type} className="ms-2">
          {route.badge.text}
        </SubtleBadge>
      )}
    </Flex>
  );
};

// PropTypes para validación
const routeShape = {
  active: PropTypes.bool,
  name: PropTypes.string.isRequired,
  to: PropTypes.string,
  icon: PropTypes.oneOfType([PropTypes.array, PropTypes.string])
};
routeShape.children = PropTypes.arrayOf(PropTypes.shape(routeShape));
NavbarVerticalMenuItem.propTypes = {
  route: PropTypes.shape(routeShape).isRequired
};

export default React.memo(NavbarVerticalMenuItem);
