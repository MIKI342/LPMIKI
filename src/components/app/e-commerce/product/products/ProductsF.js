// components/Products.js
import React, { useContext, useEffect, useState } from 'react';
import { Card, Col, Row, Form } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { ProductContext } from 'context/Context';
import usePagination from 'hooks/usePagination';
import Pagination from 'components/app/e-commerce/product/products/Pagination';
import SortOptions from 'components/app/e-commerce/product/products/SortOptions';
import ProductDisplay from 'components/app/e-commerce/product/products/ProductDisplay';
import LayoutSwitcher from 'components/app/e-commerce/product/products/LayoutSwitcher';

const Products = () => {
  const { products } = useContext(ProductContext);
  const [sortBy, setSortBy] = useState('id');
  const [isAsc, setIsAsc] = useState(true);
  const [productPerPage, setProductPerPage] = useState(6);
  const [sortedProducts, setSortedProducts] = useState(products);

  const { productLayout } = useParams();
  const layout = productLayout.split(/-/)[1];
  const isList = layout === 'list';
  const isGrid = layout === 'grid';

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

  useEffect(() => {
    const sorted = [...products].sort((a, b) => {
      if (sortBy === 'price') {
        return isAsc ? a.precioUnitario - b.precioUnitario : b.precioUnitario - a.precioUnitario;
      } else if (sortBy === 'rating') {
        return isAsc ? a.rating - b.rating : b.rating - a.rating;
      } else if (sortBy === 'review') {
        return isAsc ? a.review - b.review : b.review - a.review;
      }
      return 0;
    });
    setSortedProducts(sorted);
  }, [sortBy, isAsc, products]);

  const navigate = useNavigate();

  useEffect(() => {
    if (!isList && !isGrid) navigate('/errors/404');
  }, [isList, isGrid, navigate]);

  return (
    <>
      <Card className="mb-3">
        <Card.Body>
          <Row className="flex-between-center g-2">
            <Col sm="auto">
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
              <h6 className="mb-0 ms-2">Showing {from}-{to} of {totalItems} Products</h6>
            </Col>
            <Col sm="auto">
              <SortOptions sortBy={sortBy} isAsc={isAsc} setSortBy={setSortBy} setIsAsc={setIsAsc} />
            </Col>
            <Col sm="auto">
              <LayoutSwitcher isList={isList} />
            </Col>
          </Row>
        </Card.Body>
      </Card>
      <Card>
        <Card.Body className={isList ? 'p-0 overflow-hidden' : 'pb-0'}>
          <ProductDisplay products={paginatedProducts} isList={isList} layout={layout} />
        </Card.Body>
        <Card.Footer>
          <Pagination
            paginationArray={paginationArray}
            currentPage={currentPage}
            canNextPage={canNextPage}
            canPreviousPage={canPreviousPage}
            prevPage={prevPage}
            nextPage={nextPage}
            goToPage={goToPage}
          />
        </Card.Footer>
      </Card>
    </>
  );
};

export default Products;
