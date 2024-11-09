// El componente `CardDropdown` es un menú desplegable utilizado para mostrar opciones adicionales asociadas a un elemento
// específico, como ver, exportar o eliminar. Este componente se basa en `react-bootstrap` para el manejo de dropdowns y utiliza
// `useAppContext` para ajustar la alineación según el contexto de dirección (`isRTL`), lo que lo hace adaptable para distintos idiomas.
// Su configuración es altamente personalizable mediante props como `btnRevealClass`, `drop`, y `icon`, lo que permite integrarlo
// de forma flexible en otros componentes, como tablas o tarjetas, para ofrecer acciones específicas.

import React from 'react';
import PropTypes from 'prop-types';
import { Dropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import { useAppContext } from 'Main';

const CardDropdown = ({
  btnRevealClass,
  drop,
  children,
  icon = 'ellipsis-h'
}) => {
  const {
    config: { isRTL }
  } = useAppContext();

  return (
    <Dropdown
      className="font-sans-serif btn-reveal-trigger"
      align={isRTL ? 'start' : 'end'}
      drop={drop}
    >
      <Dropdown.Toggle
        variant="reveal"
        size="sm"
        data-boundary="viewport"
        className={classNames('text-600', {
          [btnRevealClass]: btnRevealClass,
          'btn-reveal': !btnRevealClass
        })}
      >
        <FontAwesomeIcon icon={icon} className="fs-11" />
      </Dropdown.Toggle>
      <Dropdown.Menu className="border py-0">
        {children}
        {!children && (
          <div className="py-2">
            <Dropdown.Item>View</Dropdown.Item>
            <Dropdown.Item>Export</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item className="text-danger">Remove</Dropdown.Item>
          </div>
        )}
      </Dropdown.Menu>
    </Dropdown>
  );
};

CardDropdown.propTypes = {
  btnRevealClass: PropTypes.string,
  drop: PropTypes.string,
  children: PropTypes.node,
  icon: PropTypes.string
};

export default CardDropdown;
