// components/LayoutSwitcher.js
import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

const LayoutSwitcher = ({ isList }) => (
  <OverlayTrigger
    placement="top"
    overlay={<Tooltip>Product {isList ? 'Grid' : 'List'}</Tooltip>}
  >
    <Link to={`/e-commerce/product/product-${isList ? 'grid' : 'list'}`} className="text-600 px-1">
      <FontAwesomeIcon icon={isList ? 'th' : 'list-ul'} />
    </Link>
  </OverlayTrigger>
);

export default LayoutSwitcher;
