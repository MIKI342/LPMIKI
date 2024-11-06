// Componente BillingHeader: Muestra el encabezado de la sección de facturación con opciones para cambiar el plan de suscripción.
// Este componente utiliza un menú desplegable para permitir al usuario seleccionar entre diferentes licencias.

import React from 'react';
import PageHeader from 'components/common/PageHeader'; // Componente de encabezado de página
import { Dropdown } from 'react-bootstrap'; // Componente de menú desplegable
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Iconos de FontAwesome
import { Link } from 'react-router-dom'; // Enlaces de navegación
import { useAppContext } from 'Main'; // Hook para acceder al contexto de la aplicación

const BillingHeader = ({ ...rest }) => {
  const {
    config: { isRTL } // Configuración para determinar si el texto es de derecha a izquierda
  } = useAppContext();

  return (
    <PageHeader
      title="Comienza tu prueba gratuita" // Título del encabezado
      description="Equipo Premium - 5 Asientos. Gratis por 30 días, cancela en cualquier momento. <br class='d-none.d-sm-block' /> $6.25 / asiento por mes después de la prueba" // Descripción del encabezado
      {...rest}
    >
      <Dropdown>
        <Dropdown.Toggle
          variant="link"
          size="sm"
          className="ps-0"
          id="#change-plan"
        >
          Cambiar plan {/* Botón para cambiar el plan */}
        </Dropdown.Toggle>
        <Dropdown.Menu
          className="py-3"
          align={isRTL ? 'end' : 'start'} // Alineación del menú según la dirección del texto
          style={{ minWidth: '15rem' }} // Ancho mínimo del menú
        >
          <Dropdown.Item as="div" className="px-3 py-2">
            <span className="d-flex justify-content-between fs-10 text-black">
              <span className="fw-semibold">Licencia Estándar</span> {/* Título de la licencia estándar */}
              <span>$59.00</span> {/* Precio de la licencia estándar */}
            </span>
            <ul className="list-unstyled ps-1 my-2 fs-10">
              <li>
                <FontAwesomeIcon icon="circle" transform="shrink-11" />
                <span className="ms-1">Usar para un solo producto</span> {/* Descripción de la licencia estándar */}
              </li>
              <li>
                <FontAwesomeIcon icon="circle" transform="shrink-11" />
                <span className="ms-1">Solo usuarios no pagos</span> {/* Condición de la licencia estándar */}
              </li>
            </ul>
            <p className="fs-11 mb-0">
              Lee la <Link to="#!">Licencia Estándar</Link> completa {/* Enlace a los detalles de la licencia estándar */}
            </p>
          </Dropdown.Item>
          <Dropdown.Divider className="my-0" />
          <Dropdown.Item as="div" className="px-3 py-2">
            <span className="d-flex justify-content-between fs-10 text-black">
              <span className="fw-semibold">Licencia Extendida</span> {/* Título de la licencia extendida */}
              <span>$99.00</span> {/* Precio de la licencia extendida */}
            </span>
            <ul className="list-unstyled ps-1 my-2 fs-10">
              <li>
                <FontAwesomeIcon icon="circle" transform="shrink-11" />
                <span className="ms-1">Sitios web ilimitados</span> {/* Descripción de la licencia extendida */}
              </li>
              <li>
                <FontAwesomeIcon icon="circle" transform="shrink-11" />
                <span className="ms-1">Usuarios de pago permitidos</span> {/* Condición de la licencia extendida */}
              </li>
            </ul>
            <p className="fs-11 mb-0">
              Lee la <Link to="#!">Licencia Extendida</Link> completa {/* Enlace a los detalles de la licencia extendida */}
            </p>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </PageHeader>
  );
};

export default BillingHeader;
