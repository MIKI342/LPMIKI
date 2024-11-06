// CartItem.js

import React, { useContext } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import QuantityController from '../QuantityController';
import { ProductContext } from 'context/Context';

const defaultImage = '/img/descarga.jpeg';

const CartItem = ({ product }) => {
  const { id, files = [], name, quantity, totalPrice } = product;
  const { dispatch } = useContext(ProductContext);

  const unitPrice = totalPrice / quantity;

  const handleRemove = () => {
    dispatch({
      type: 'REMOVE_FROM_CART',
      payload: {
        id
      }
    });
  };

  const handleIncrease = () => {
    dispatch({
      type: 'ADD_TO_CART',
      payload: {
        id,
        quantity: 1,
        unitPrice
      }
    });
  };

  const handleDecrease = () => {
    dispatch({
      type: 'ADD_TO_CART',
      payload: {
        id,
        quantity: -1,
        unitPrice
      }
    });
  };

  return (
    <Row className="gx-card mx-0 align-items-center border-bottom border-200">
      <Col xs={8} className="py-3">
        <div className="d-flex align-items-center">
          <Link to={`/e-commerce/product/product-details/${id}`}>
            <img
              src={files.length > 0 ? files[0].src : defaultImage}
              width="60"
              alt={name}
              className="img-fluid rounded-1 me-3 d-none d-md-block"
            />
          </Link>
          <div className="flex-1">
            <h5 className="fs-9">
              <Link to={`/e-commerce/product/product-details/${id}`} className="text-900">
                {name}
              </Link>
            </h5>
            <div className="fs-11 fs-md-10">
              <Button
                variant="link"
                size="sm"
                className="text-danger fs-11 fs-md-10 fw-normal p-0"
                onClick={handleRemove}
              >
                Eliminar
              </Button>
            </div>
          </div>
        </div>
      </Col>
      <Col xs={4} className="py-3">
        <Row className="align-items-center">
          <Col
            md={{ span: 8, order: 0 }}
            xs={{ order: 1 }}
            className="d-flex justify-content-end justify-content-md-center"
          >
            <div>
              <QuantityController
                quantity={quantity}
                handleIncrease={handleIncrease}
                handleDecrease={handleDecrease}
                btnClassName="px-2"
              />
            </div>
          </Col>
          <Col
            md={{ span: 4, order: 1 }}
            xs={{ order: 0 }}
            className="text-end ps-0 mb-2 mb-md-0 text-600"
          >
            ${unitPrice * quantity}
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default CartItem;
