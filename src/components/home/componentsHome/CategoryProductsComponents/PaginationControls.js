import React, { useEffect } from 'react';
import { Button } from 'react-bootstrap';
import classNames from 'classnames';

const PaginationControls = ({ paginationState, prevPage, nextPage, goToPage }) => {
  // useEffect para desplazar al inicio de la página al cambiar la página actual
  useEffect(() => {
    window.scrollTo(0, 0); // Posiciona la vista al inicio de la página sin efectos
  }, [paginationState.currentPage]);

  return (
    <div className="d-flex justify-content-center mt-4">
      <Button
        variant="falcon-default"
        size="sm"
        disabled={!paginationState.canPreviousPage}
        onClick={() => {
          prevPage(); // Cambiar a la página anterior
        }}
        className="me-2"
      >
        Anterior
      </Button>
      <ul className="pagination mb-0">
        {paginationState.paginationArray.map(page => (
          <li key={page} className={classNames({ active: paginationState.currentPage === page })}>
            <Button
              size="sm"
              variant="falcon-default"
              onClick={() => {
                goToPage(page); // Cambiar a la página seleccionada
              }}
            >
              {page}
            </Button>
          </li>
        ))}
      </ul>
      <Button
        variant="falcon-default"
        size="sm"
        disabled={!paginationState.canNextPage}
        onClick={() => {
          nextPage(); // Cambiar a la página siguiente
        }}
      >
        Siguiente
      </Button>
    </div>
  );
};

export default PaginationControls;
