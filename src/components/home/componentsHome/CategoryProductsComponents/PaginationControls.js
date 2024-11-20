//Muestra los botones para controlar la paginación.
//Maneja la lógica de navegación entre páginas y deshabilita botones según el estado actual de la paginación.
//Usa clases condicionales para resaltar la página activa.


import React from 'react';
import { Button } from 'react-bootstrap';
import classNames from 'classnames';

const PaginationControls = ({ paginationState, prevPage, nextPage, goToPage }) => {
  return (
    <div className="d-flex justify-content-center mt-4">
      <Button
        variant="falcon-default"
        size="sm"
        disabled={!paginationState.canPreviousPage}
        onClick={prevPage}
        className="me-2"
      >
        Anterior
      </Button>
      <ul className="pagination mb-0">
        {paginationState.paginationArray.map(page => (
          <li key={page} className={classNames({ active: paginationState.currentPage === page })}>
            <Button size="sm" variant="falcon-default" onClick={() => goToPage(page)}>
              {page}
            </Button>
          </li>
        ))}
      </ul>
      <Button
        variant="falcon-default"
        size="sm"
        disabled={!paginationState.canNextPage}
        onClick={nextPage}
      >
        Siguiente
      </Button>
    </div>
  );
};

export default PaginationControls;
