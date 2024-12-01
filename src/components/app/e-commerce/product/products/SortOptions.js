import React from 'react';
import { Col, Form, InputGroup, Button } from 'react-bootstrap'; // Añadir la importación de Col
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const SortOptions = ({ sortBy, isAsc, setSortBy, setIsAsc }) => (
  <Form as="Row" className="gx-2">
    <Col xs="auto">  {/* Columne definido aquí */}
      <small>Sort by:</small>
    </Col>
    <Col xs="auto">
      <InputGroup size="sm">
        <Form.Select value={sortBy} onChange={({ target }) => setSortBy(target.value)}>
          <option value="price">Price</option>
          <option value="rating">Rating</option>
          <option value="review">Review</option>
        </Form.Select>
        <InputGroup.Text
          as={Button}
          variant="link"
          className="border border-300 text-700"
          onClick={() => setIsAsc(!isAsc)}
        >
          <FontAwesomeIcon icon={isAsc ? 'sort-amount-up' : 'sort-amount-down'} />
        </InputGroup.Text>
      </InputGroup>
    </Col>
  </Form>
);

export default SortOptions;
