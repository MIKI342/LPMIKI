// El componente `AdvanceTable` es una tabla flexible que muestra datos paginados con funcionalidades avanzadas,
// como encabezados ordenables y un estilo adaptable. Usa `react-bootstrap` para la estructura de la tabla y recibe
// varias propiedades, incluyendo `headers` y `page`, que definen el contenido y formato de las filas y columnas.
// Está diseñado para integrarse con `AdvanceTableWrapper`, que proporciona la configuración general de los datos
// y sus comportamientos. Este componente es ideal para mostrar datos en tablas complejas, especialmente en aplicaciones
// con múltiples filas y características de ordenamiento o personalización.

import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'react-bootstrap';

const AdvanceTable = ({
  getTableProps,
  headers,
  page,
  prepareRow,
  headerClassName,
  bodyClassName,
  rowClassName,
  tableProps
}) => {
  return (
    <div className="table-responsive scrollbar">
      <Table {...getTableProps(tableProps)}>
        <thead className={headerClassName}>
          <tr>
            {headers.map((column, index) => (
              <th
                key={index}
                {...column.getHeaderProps(
                  column.getSortByToggleProps(column.headerProps)
                )}
              >
                {column.render('Header')}
                {column.canSort ? (
                  column.isSorted ? (
                    column.isSortedDesc ? (
                      <span className="sort desc" />
                    ) : (
                      <span className="sort asc" />
                    )
                  ) : (
                    <span className="sort" />
                  )
                ) : (
                  ''
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className={bodyClassName}>
          {page.map((row, i) => {
            prepareRow(row);
            return (
              <tr key={i} className={rowClassName} {...row.getRowProps()}>
                {row.cells.map((cell, index) => {
                  return (
                    <td
                      key={index}
                      {...cell.getCellProps(cell.column.cellProps)}
                    >
                      {cell.render('Cell')}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};

AdvanceTable.propTypes = {
  getTableProps: PropTypes.func,
  headers: PropTypes.array,
  page: PropTypes.array,
  prepareRow: PropTypes.func,
  headerClassName: PropTypes.string,
  bodyClassName: PropTypes.string,
  rowClassName: PropTypes.string,
  tableProps: PropTypes.object
};

export default AdvanceTable;
