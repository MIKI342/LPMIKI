import React, { useContext, useEffect, useState } from 'react';
import {
  Card,
  Col,
  Form,
  OverlayTrigger,
  Row,
  Tooltip,
  Button,
  InputGroup
} from 'react-bootstrap';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import ProductList from './ProductListF';
import ProductGrid from './ProductGridF';
import { ProductContext } from 'context/Context';
import CartModal from '../cart/CartModal';
import usePagination from 'hooks/usePagination';
import Flex from 'components/common/Flex';

const Products = () => {
  // Corregimos cómo accedemos al contexto
  const { products, dispatch } = useContext(ProductContext);

  const [sortBy, setSortBy] = useState('id'); // Control para ordenar
  const [isAsc, setIsAsc] = useState(true); // Ascendente o descendente
  const [productPerPage, setProductPerPage] = useState(6); // Productos por página

  const { productLayout } = useParams(); // Parámetro de diseño
  const layout = productLayout.split(/-/)[1]; // Determinar si es grid o list
  const isList = layout === 'list';
  const isGrid = layout === 'grid';

  // Configuración de paginación
  const {
    paginationState: {
      data: paginatedProducts,
      totalItems,
      itemsPerPage,
      currentPage,
      canNextPage,
      canPreviousPage,
      paginationArray,
      from,
      to
    },
    nextPage,
    prevPage,
    goToPage,
    setItemsPerPage
  } = usePagination(products || [], productPerPage);

  // Ordenar productos al cambiar sortBy o isAsc
  useEffect(() => {
    dispatch({
      type: 'SORT_PRODUCT',
      payload: {
        sortBy,
        order: isAsc ? 'asc' : 'desc'
      }
    });
  }, [sortBy, isAsc, dispatch]);

  const navigate = useNavigate();

  // Validar el diseño del producto (grid o list)
  useEffect(() => {
    if (!isList && !isGrid) navigate('/errors/404');
  }, [isList, isGrid, navigate]);

  return (
    <>
      <Card className="mb-3">
        <Card.Body>
          <Row className="flex-between-center g-2">
            <Col sm="auto" as={Flex} alignItems="center" className="mb-2 mb-sm-0">
              <Form.Select
                size="sm"
                value={itemsPerPage}
                onChange={({ target }) => {
                  setItemsPerPage(target.value);
                  setProductPerPage(target.value);
                }}
                style={{ maxWidth: '4.875rem' }}
              >
                <option value={2}>2</option>
                <option value={4}>4</option>
                <option value={6}>6</option>
                <option value={totalItems}>All</option>
              </Form.Select>
              <h6 className="mb-0 ms-2">
                Showing {from}-{to} of {totalItems} Products
              </h6>
            </Col>
            <Col sm="auto">
              <Row className="gx-2 align-items-center">
                <Col xs="auto">
                  <Form as={Row} className="gx-2">
                    <Col xs="auto">
                      <small>Sort by:</small>
                    </Col>
                    <Col xs="auto">
                      <InputGroup size="sm">
                        <Form.Select
                          className="pe-5"
                          defaultValue="price"
                          onChange={({ target }) => setSortBy(target.value)}
                        >
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
                          <FontAwesomeIcon
                            icon={isAsc ? 'sort-amount-up' : 'sort-amount-down'}
                          />
                        </InputGroup.Text>
                      </InputGroup>
                    </Col>
                  </Form>
                </Col>
                <Col xs="auto" className="pe-0">
                  <OverlayTrigger
                    placement="top"
                    overlay={
                      <Tooltip style={{ position: 'fixed' }}>
                        Product {isList ? 'Grid' : 'List'}
                      </Tooltip>
                    }
                  >
                    <Link
                      to={`/e-commerce/product/product-${
                        isList ? 'grid' : 'list'
                      }`}
                      className="text-600 px-1"
                    >
                      <FontAwesomeIcon
                        icon={classNames({ th: isList, 'list-ul': isGrid })}
                      />
                    </Link>
                  </OverlayTrigger>
                </Col>
              </Row>
            </Col>
          </Row>
        </Card.Body>
      </Card>
      <Card>
        <Card.Body
          className={classNames({
            'p-0 overflow-hidden': isList,
            'pb-0': isGrid
          })}
        >
          <Row className={classNames({ 'g-0': isList })}>
            {paginatedProducts.map((product, index) =>
              layout === 'list' ? (
                <ProductList product={product} key={product.id} index={index} />
              ) : (
                <ProductGrid
                  product={product}
                  key={product.id}
                  md={6}
                  lg={4}
                  index={index}
                />
              )
            )}
          </Row>
        </Card.Body>
        <Card.Footer
          className={classNames('d-flex justify-content-center', {
            'bg-body-tertiary mt-n1': isGrid,
            'border-top': isList
          })}
        >
          <div>
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip style={{ position: 'fixed' }}>Prev</Tooltip>}
            >
              <Button
                variant="falcon-default"
                size="sm"
                disabled={!canPreviousPage}
                onClick={prevPage}
                className="me-2"
                trigger="focus"
              >
                <FontAwesomeIcon icon="chevron-left" />
              </Button>
            </OverlayTrigger>
          </div>

          <ul className="pagination mb-0">
            {paginationArray.map(page => (
              <li
                key={page}
                className={classNames({ active: currentPage === page })}
              >
                <Button
                  size="sm"
                  variant="falcon-default"
                  className="page me-2"
                  onClick={() => goToPage(page)}
                >
                  {page}
                </Button>
              </li>
            ))}
          </ul>
          <div>
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip style={{ position: 'fixed' }}>Next</Tooltip>}
            >
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
        </Card.Footer>
      </Card>
      <CartModal />
    </>
  );
};

export default Products;
