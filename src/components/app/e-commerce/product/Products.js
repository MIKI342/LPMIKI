import React, { useContext, useEffect, useState } from 'react';
import { Col, Row, Button, Form } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import ProductGrid from './ProductGrid';
import { ProductContext } from 'context/Context';
import CartModal from '../cart/CartModal';
import usePagination from 'hooks/usePagination';
import useProductFilter from 'hooks/useProductFilter';
import Flex from 'components/common/Flex';
import { getProductsFromDB, setProductsInDB } from 'services/indexedDBService';

const getUniqueCategories = products => {
  const categories = products.map(product => product.CategoriaProducto?.nombre);
  return ['all', ...new Set(categories)];
};

const Products = () => {
  const { products, loading } = useContext(ProductContext);
  const navigate = useNavigate();
  const { productLayout } = useParams();
  const layout = productLayout?.split(/-/)[1] || 'grid';

  const {
    filteredProducts,
    categoryFilter,
    statusFilter,
    setCategoryFilter,
    setStatusFilter
  } = useProductFilter(products);

  const [productPerPage, setProductPerPage] = useState(20);
  const [cachedProducts, setCachedProducts] = useState([]);
  const { paginationState, nextPage, prevPage, goToPage, setItemsPerPage, dispatch } = 
    usePagination(filteredProducts.length ? filteredProducts : cachedProducts, productPerPage, 'all');

  useEffect(() => {
    // Cargar productos desde IndexedDB si `filteredProducts` está vacío
    if (filteredProducts.length === 0) {
      getProductsFromDB('all', 1).then(cached => {
        if (cached && cached.length > 0) {
          setCachedProducts(cached);
        }
      });
    } else {
      // Actualizar IndexedDB con nuevos productos si `filteredProducts` tiene datos
      setProductsInDB('all', 1, filteredProducts);
      setCachedProducts(filteredProducts);
    }
  }, [filteredProducts]);

  useEffect(() => {
    if (layout !== 'list' && layout !== 'grid') {
      navigate('/errors/404');
    }
  }, [layout, navigate]);

  // Asegúrate de que siempre se inicia desde el principio de la página
  useEffect(() => {
    window.scrollTo(0, 0); // Establece el scroll al inicio
  }, [paginationState.currentPage]); // Cada vez que cambia la página

  if (loading && cachedProducts.length === 0) return <div>Cargando productos...</div>;

  if (!products || products.length === 0) {
    return <div>No hay productos disponibles.</div>;
  }

  const categories = getUniqueCategories(products);

  return (
    <>
      <Row className="mb-3">
        <Col sm="auto" as={Flex} alignItems="center" className="mb-2 mb-sm-0">
          <Form.Select
            size="sm"
            value={paginationState?.itemsPerPage || productPerPage}
            onChange={({ target }) => {
              const itemsPerPage = Number(target.value);
              setItemsPerPage(itemsPerPage);
              setProductPerPage(itemsPerPage);
            }}
            style={{ maxWidth: '4.875rem' }}
          >
            <option value={20}>20</option>
            <option value={12}>12</option>
            <option value={8}>8</option>
            <option value={4}>4</option>
          </Form.Select>
          <h6 className="mb-0 ms-2">
            Mostrando {paginationState?.from || 0}-{paginationState?.to || 0} de{' '}
            {paginationState?.totalItems || 0} Productos
          </h6>
        </Col>
      </Row>

      <Row className="g-3">
        {paginationState?.data.map(product => (
          <ProductGrid 
            product={product} 
            key={product.id} 
            paginationState={paginationState} 
            dispatch={dispatch}
          />
        ))}
      </Row>

      <div className="d-flex justify-content-center mt-4">
        <Button
          variant="falcon-default"
          size="sm"
          disabled={!paginationState?.canPreviousPage}
          onClick={() => {
            prevPage(); // Cambiar la página
          }}
          className="me-2"
        >
          <FontAwesomeIcon icon="chevron-left" /> Anterior
        </Button>
        <ul className="pagination mb-0">
          {paginationState?.paginationArray.map(page => (
            <li
              key={page}
              className={classNames({
                active: paginationState.currentPage === page
              })}
            >
              <Button
                size="sm"
                variant="falcon-default"
                onClick={() => {
                  goToPage(page); // Cambiar la página
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
          disabled={!paginationState?.canNextPage}
          onClick={() => {
            nextPage(); // Cambiar la página
          }}
        >
          Siguiente <FontAwesomeIcon icon="chevron-right" />
        </Button>
      </div>
      <CartModal />
    </>
  );
};

export default Products;
