// components/Pagination.js
import React from 'react';
import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';

const Pagination = ({
  paginationArray,
  currentPage,
  canNextPage,
  canPreviousPage,
  prevPage,
  nextPage,
  goToPage
}) => (
  <div className="d-flex justify-content-center">
    <OverlayTrigger placement="top" overlay={<Tooltip>Prev</Tooltip>}>
      <Button
        variant="falcon-default"
        size="sm"
        disabled={!canPreviousPage}
        onClick={prevPage}
        className="me-2"
      >
        <FontAwesomeIcon icon="chevron-left" />
      </Button>
    </OverlayTrigger>
    <ul className="pagination mb-0">
      {paginationArray.map(page => (
        <li key={page} className={classNames({ active: currentPage === page })}>
          <Button size="sm" variant="falcon-default" onClick={() => goToPage(page)}>
            {page}
          </Button>
        </li>
      ))}
    </ul>
    <OverlayTrigger placement="top" overlay={<Tooltip>Next</Tooltip>}>
      <Button
        variant="falcon-default"
        size="sm"
        disabled={!canNextPage}
        onClick={nextPage}
      >
        <FontAwesomeIcon icon="chevron-right" />
      </Button>
    </OverlayTrigger>
  </div>
);

export default Pagination;
