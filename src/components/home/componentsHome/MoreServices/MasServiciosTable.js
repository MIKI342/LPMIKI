// El componente `MasServiciosTable` muestra una tabla avanzada de servicios, con información relevante para
// cada tipo de servicio. Proporciona funcionalidades como ordenación y estructura personalizada de columnas,
// y utiliza `CardDropdown` para mostrar opciones adicionales de cada servicio en un menú desplegable.

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import CardDropdown from 'components/home/componentsHome/MoreServices/CardDropdown';
import AdvanceTableWrapper from 'components/home/componentsHome/MoreServices/AdvanceTableWrapper';
import AdvanceTable from 'components/home/componentsHome/MoreServices/AdvanceTable';

const columns = [
  {
    accessor: 'title',
    Header: 'Servicio',
    headerProps: { className: 'pe-1 fw-medium text-900' },
    Cell: rowData => {
      const { title } = rowData.row.original;
      return <Link to="/services/details">{title}</Link>;
    }
  },
  {
    accessor: 'provider',
    Header: 'Proveedor',
    headerProps: {
      className: 'pe-7 fw-medium text-900'
    },
    Cell: rowData => {
      const { provider } = rowData.row.original;
      return (
        <Link to="/providers/profile" className="text-800">
          {provider}
        </Link>
      );
    }
  },
  {
    accessor: 'availability',
    Header: 'Disponibilidad',
    headerProps: {
      className: 'text-end fw-medium text-900'
    },
    cellProps: {
      className: 'text-end'
    }
  },
  {
    accessor: 'popularity',
    Header: 'Popularidad',
    headerProps: {
      className: 'text-end fw-medium text-900'
    },
    cellProps: {
      className: 'text-end'
    }
  },
  {
    accessor: 'price',
    Header: 'Costo',
    headerProps: {
      className: 'text-end fw-medium text-900'
    },
    cellProps: {
      className: 'text-end'
    }
  },
  {
    accessor: 'actions',
    Header: '',
    disableSortBy: true,
    cellProps: {
      className: 'text-end'
    },
    Cell: () => {
      return (
        <CardDropdown drop="start">
          <div className="py-2">
            <Dropdown.Item href="#!">Ver</Dropdown.Item>
            <Dropdown.Item href="#!">Editar</Dropdown.Item>
            <Dropdown.Item href="#!">Desactivar</Dropdown.Item>
            <Dropdown.Divider as="div" />
            <Dropdown.Item href="#!" className="text-warning">
              Archivar
            </Dropdown.Item>
            <Dropdown.Item href="#!" className="text-danger">
              Eliminar
            </Dropdown.Item>
          </div>
        </CardDropdown>
      );
    }
  }
];

const MasServiciosTable = ({ tableData }) => {
  const [data] = useState(tableData);
  return (
    <AdvanceTableWrapper
      columns={columns}
      data={data}
      sortable
      rowCount={data.length}
    >
      <AdvanceTable
        table
        headerClassName="bg-200 text-nowrap align-middle font-sans-serif"
        rowClassName="btn-reveal-trigger text-nowrap align-middle"
        tableProps={{
          className: 'fs-10 fw-semibold mb-0 overflow-hidden'
        }}
      />
    </AdvanceTableWrapper>
  );
};

MasServiciosTable.propTypes = {
  tableData: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default MasServiciosTable;
