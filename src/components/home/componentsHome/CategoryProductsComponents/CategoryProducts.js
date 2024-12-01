import React, { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Row, Col, Card, Form, InputGroup, OverlayTrigger, Tooltip, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';

import { ProductContext } from 'context/Context';
import useGroupedByCategory from 'hooks/useGroupedByCategory';
import usePagination from 'hooks/usePagination';
import useContactNumbers from 'hooks/useContactNumbers';
import { getProductsFromDB, setProductsInDB } from 'services/indexedDBService';

import SkeletonLoader from 'components/home/componentsHome/CategoryProductsComponents/SkeletonLoader';
import ProductList from 'components/app/e-commerce/product/ProductListF';
import ProductGrid from 'components/app/e-commerce/product/ProductGridF';
import CategoryHeader from 'components/home/componentsHome/CategoryProductsComponents/CategoryHeader';
import CartModal from 'components/app/e-commerce/cart/CartModal';
import Flex from 'components/common/Flex';

const CategoryProducts = () => {
  const { category } = useParams();
  const { products, loading } = useContext(ProductContext);

  const groupedProducts = useGroupedByCategory(products);
  const productsInCategory = groupedProducts[category] || [];

  const [cachedProducts, setCachedProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isListView, setIsListView] = useState(false); // Estado para alternar entre lista y cuadrícula

  // Estado para control de paginación y ordenación
  const [productPerPage, setProductPerPage] = useState(6);
  const [sortBy, setSortBy] = useState('price');
  const [isAsc, setIsAsc] = useState(true);

  const { getContactNumberByCategory } = useContactNumbers();
  const contact = getContactNumberByCategory(category);

  useEffect(() => {
    const fetchCachedProducts = async () => {
      const cachedData = await getProductsFromDB(category);
      if (cachedData && cachedData.length > 0) {
        setCachedProducts(cachedData);
        setIsLoading(false);
      } else if (productsInCategory.length > 0) {
        await setProductsInDB(category, productsInCategory);
        setCachedProducts(productsInCategory);
        setIsLoading(false);
      }
    };
    fetchCachedProducts();
  }, [category, productsInCategory]);

  // Ordenar productos al cambiar sortBy o isAsc
  const productsToDisplay = cachedProducts.length > 0 ? cachedProducts : productsInCategory;

  const sortedProducts = React.useMemo(() => {
    const productsCopy = [...productsToDisplay];
    productsCopy.sort((a, b) => {
      let compare = 0;
      if (a[sortBy] < b[sortBy]) {
        compare = -1;
      } else if (a[sortBy] > b[sortBy]) {
        compare = 1;
      } else {
        compare = 0;
      }
      return isAsc ? compare : -compare;
    });
    return productsCopy;
  }, [productsToDisplay, sortBy, isAsc]);

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
  } = usePagination(sortedProducts, productPerPage);

  return (
    <div>
      <CategoryHeader category={category} contact={contact} />

      {/* Control de "Showing" y opciones de ordenación */}
      <Card className="mb-3">
        <Card.Body>
          <Row className="flex-between-center g-2">
            <Col sm="auto" as={Flex} alignItems="center" className="mb-2 mb-sm-0">
              <Form.Select
                size="sm"
                value={itemsPerPage}
                onChange={({ target }) => {
                  const value = target.value === 'All' ? totalItems : parseInt(target.value, 10);
                  setItemsPerPage(value);
                  setProductPerPage(value);
                }}
                style={{ maxWidth: '4.875rem' }}
              >
                <option value={2}>2</option>
                <option value={4}>4</option>
                <option value={6}>6</option>
                <option value="All">All</option>
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
                          value={sortBy}
                          onChange={({ target }) => setSortBy(target.value)}
                        >
                          <option value="price">Price</option>
                          <option value="nombreProducto">Name</option>
                          <option value="cantidad">Quantity</option>
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
                        Switch to {isListView ? 'Grid' : 'List'} View
                      </Tooltip>
                    }
                  >
                    <Button
                      className="text-600 px-1"
                      variant="link"
                      onClick={() => setIsListView(!isListView)}
                    >
                      <FontAwesomeIcon
                        icon={isListView ? 'th' : 'list-ul'}
                      />
                    </Button>
                  </OverlayTrigger>
                </Col>
              </Row>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Renderizado de productos */}
      <Card>
        <Card.Body
          className={classNames({
            'p-0 overflow-hidden': isListView,
            'pb-0': !isListView
          })}
        >
          {loading || isLoading ? (
            <SkeletonLoader count={6} />
          ) : (
            <Row className={classNames({ 'g-0': isListView })}>
              {paginatedProducts.map((product, index) =>
                isListView ? (
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
          )}
        </Card.Body>

        {/* Controles de paginación */}
        <Card.Footer
          className={classNames('d-flex justify-content-center', {
            'bg-body-tertiary mt-n1': !isListView,
            'border-top': isListView
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
              <li key={page} className={classNames({ active: currentPage === page })}>
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
    </div>
  );
};

export default CategoryProducts;
