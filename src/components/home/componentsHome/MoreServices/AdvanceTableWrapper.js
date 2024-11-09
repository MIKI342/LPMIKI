// El componente `AdvanceTableWrapper` es un contenedor avanzado para tablas que agrega funcionalidades de paginación,
// selección de filas, filtros globales y ordenamiento, utilizando `react-table` y `react-bootstrap`.
// Ofrece soporte para checkboxes con selección múltiple mediante el subcomponente `IndeterminateCheckbox`, que permite
// seleccionar todas las filas o filas específicas. `AdvanceTableWrapper` es capaz de recibir hijos y clonar componentes,
// propagando funciones y propiedades clave de `react-table` para que las tablas en sus hijos puedan utilizar las
// funcionalidades de ordenamiento, selección, paginación y filtros. Es ideal para casos en los que una tabla necesita
// configuraciones complejas en aplicaciones de datos.

import classNames from 'classnames';
import React from 'react';
import { Form } from 'react-bootstrap';
import {
  useTable,
  useSortBy,
  usePagination,
  useRowSelect,
  useGlobalFilter
} from 'react-table';

export const IndeterminateCheckbox = React.forwardRef(
  ({ indeterminate, className, ...rest }, ref) => {
    const defaultRef = React.useRef();
    const resolvedRef = ref || defaultRef;

    React.useEffect(() => {
      resolvedRef.current.indeterminate = indeterminate;
    }, [resolvedRef, indeterminate]);

    return (
      <Form.Check
        type="checkbox"
        className={classNames(
          'form-check mb-0 d-flex align-items-center',
          className
        )}
      >
        <Form.Check.Input
          type="checkbox"
          className="mt-0"
          ref={resolvedRef}
          {...rest}
        />
      </Form.Check>
    );
  }
);

const AdvanceTableWrapper = ({
  children,
  columns,
  data,
  sortable,
  selection,
  selectionColumnWidth,
  selectionHeaderClassname,
  pagination,
  perPage = 10
}) => {
  const {
    getTableProps,
    headers,
    page,
    prepareRow,
    canPreviousPage,
    canNextPage,
    nextPage,
    previousPage,
    setPageSize,
    gotoPage,
    pageCount,
    state: { pageIndex, pageSize, selectedRowIds, globalFilter },
    setGlobalFilter
  } = useTable(
    {
      columns,
      data,
      disableSortBy: !sortable,
      initialState: { pageSize: pagination ? perPage : data.length }
    },
    useGlobalFilter,
    useSortBy,
    usePagination,
    useRowSelect,
    hooks => {
      if (selection) {
        hooks.visibleColumns.push(columns => [
          {
            id: 'selection',
            Header: ({ getToggleAllRowsSelectedProps }) => (
              <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
            ),
            headerProps: {
              className: selectionHeaderClassname,
              style: {
                width: selectionColumnWidth
              }
            },
            cellProps: {
              style: {
                width: selectionColumnWidth
              }
            },
            Cell: ({ row }) => (
              <div>
                <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
              </div>
            )
          },
          ...columns
        ]);
      }
    }
  );

  const recursiveMap = children => {
    return React.Children.map(children, child => {
      if (child.props?.children) {
        return React.cloneElement(child, {
          children: recursiveMap(child.props.children)
        });
      } else {
        if (child.props?.table) {
          return React.cloneElement(child, {
            ...child.props,
            getTableProps,
            headers,
            page,
            prepareRow,
            canPreviousPage,
            canNextPage,
            nextPage,
            previousPage,
            gotoPage,
            pageCount,
            pageIndex,
            selectedRowIds,
            pageSize,
            setPageSize,
            globalFilter,
            setGlobalFilter
          });
        } else {
          return child;
        }
      }
    });
  };

  return <>{recursiveMap(children)}</>;
};

export default AdvanceTableWrapper;
