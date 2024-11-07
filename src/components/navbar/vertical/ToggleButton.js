import React from 'react';
import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { useAppContext } from 'Main';

// Tooltip personalizado que aparece al pasar el cursor sobre el botón
const renderTooltip = props => (
  <Tooltip style={{ position: 'fixed' }} id="button-tooltip" {...props}>
    Botón de navegación Miki
  </Tooltip>
);

const ToggleButton = () => {
  const {
    config: { isNavbarVerticalCollapsed, isFluid, isRTL },
    setConfig
  } = useAppContext();

  const handleClick = () => {
    const newIsCollapsed = !isNavbarVerticalCollapsed;
    setConfig('isNavbarVerticalCollapsed', newIsCollapsed);
    setConfig('showBurgerMenu', !newIsCollapsed);

    document
      .getElementsByTagName('html')[0]
      .classList.toggle('navbar-vertical-collapsed');
  };

  return (
    <OverlayTrigger
      placement={
        isFluid ? (isRTL ? 'bottom' : 'right') : isRTL ? 'bottom' : 'left'
      }
      overlay={renderTooltip}
    >
      <div className="toggle-icon-wrapper">
        <Button
          variant="link"
          className="navbar-toggler-humburger-icon navbar-vertical-toggle"
          id="toggleButton" // Agregamos un ID al botón
          onClick={handleClick}
        >
          <span className="navbar-toggle-icon">
            <span className="toggle-line" /> {/* Línea del icono del botón */}
          </span>
        </Button>
      </div>
    </OverlayTrigger>
  );
};

export default ToggleButton;
