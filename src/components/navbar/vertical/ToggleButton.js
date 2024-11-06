// ToggleButton: Componente que controla el colapso de la barra de navegación vertical en la aplicación.
// Este botón alterna el estado de la barra de navegación lateral (abierta o colapsada) y muestra un tooltip
// personalizado al pasar el cursor. Utiliza el contexto global (useAppContext) para acceder y actualizar 
// la configuración de colapso (`isNavbarVerticalCollapsed`). También se adapta a la configuración de diseño 
// como la disposición de contenido (`isFluid`) y la orientación (`isRTL`). Este componente se usa 
// principalmente en combinación con la barra de navegación vertical y otros elementos del menú de navegación.

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
  // Extrae la configuración del contexto de la aplicación
  const {
    config: { isNavbarVerticalCollapsed, isFluid, isRTL },
    setConfig
  } = useAppContext();

  console.log("ToggleButton rendered"); // Registro para seguimiento en desarrollo

  // Maneja el clic en el botón de colapso de la barra lateral
  const handleClick = () => {
    // Alterna la clase CSS de colapso en el HTML para el estado de la barra lateral
    document
      .getElementsByTagName('html')[0]
      .classList.toggle('navbar-vertical-collapsed');
    
    // Actualiza el estado de colapso en la configuración del contexto
    setConfig('isNavbarVerticalCollapsed', !isNavbarVerticalCollapsed);
    console.log("Toggle clicked"); // Registro para verificar el clic
  };

  return (
    <OverlayTrigger
      placement={
        isFluid ? (isRTL ? 'bottom' : 'right') : isRTL ? 'bottom' : 'left'
      } // Ajusta la posición del tooltip según la configuración
      overlay={renderTooltip} // Asocia el tooltip al botón
    >
      <div className="toggle-icon-wrapper">
        <Button
          variant="link"
          className="navbar-toggler-humburger-icon navbar-vertical-toggle"
          id="toggleNavigationTooltip"
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
