  import React, { useContext, useState, useEffect } from 'react';
  import { useParams, useNavigate } from 'react-router-dom';
  import { ProductContext } from 'context/Context';
  import ProductCard from 'components/app/e-commerce/product/ProductCard';
  import useGroupedByCategory from 'hooks/useGroupedByCategory';
  import useGroupedByModule from 'hooks/useGroupedByModule';
  import { Row, Col, Button } from 'react-bootstrap';
  import Skeleton from 'react-loading-skeleton';
  import 'react-loading-skeleton/dist/skeleton.css';
  import CartModal from 'components/app/e-commerce/cart/CartModal';
  import usePagination from 'hooks/usePagination';
  import classNames from 'classnames';
  import { FaWhatsapp } from 'react-icons/fa';
  import { getProductsFromDB, setProductsInDB } from 'services/indexedDBService'; // Nuevas importaciones

  const CategoryProducts = () => {
    const { category } = useParams();
    const navigate = useNavigate();
    const { products, loading } = useContext(ProductContext);
    const groupedProducts = useGroupedByCategory(products);
    const groupedByModule = useGroupedByModule(products);

    const productsInCategory = groupedProducts[category] || [];
    const [cachedProducts, setCachedProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const [productPerPage, setProductPerPage] = useState(20);
    const { paginationState, nextPage, prevPage, goToPage, setItemsPerPage, dispatch } = usePagination(
      cachedProducts.length > 0 ? cachedProducts : productsInCategory,
      productPerPage,
      category
    );

    useEffect(() => {
      const fetchCachedProducts = async () => {
        const cachedData = await getProductsFromDB(category);
        if (cachedData && cachedData.length > 0) {
          setCachedProducts(cachedData);
          setIsLoading(false);
        } else if (productsInCategory.length > 0) {
          await setProductsInDB(category, productsInCategory); // Guarda en caché los productos de la API
          setCachedProducts(productsInCategory);
          setIsLoading(false);
        }
      };
      fetchCachedProducts();
    }, [category, productsInCategory]);

    const goBack = () => navigate(-1);

    const renderSkeletons = () => {
      const skeletons = Array(6).fill(null);
      return skeletons.map((_, index) => (
        <Col key={index} xs={6} md={4}>
          <Skeleton height={350} />
        </Col>
      ));
    };

    const firstModule = Object.values(groupedByModule)[0];
    const message = `Estimado equipo de la sucursal ${firstModule?.moduleName} ubicada en ${firstModule?.address}, estoy interesado en los productos de la categoría ${category}.`;

    const whatsappLink = firstModule
      ? `https://wa.me/${firstModule.contact.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`
      : '#';

    return (
      <div>
        <div className="d-flex flex-column align-items-center mb-3">
          <div className="d-flex align-items-center">
            <h1 className="text-center" style={{ fontFamily: 'Arial, sans-serif', fontWeight: 'bold', fontSize: '2rem', marginRight: '10px' }}>
              {category}
            </h1>
          </div>

          {firstModule && (
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="d-flex align-items-center text-success mt-2" style={{ fontSize: '1rem' }}>
              <FaWhatsapp size={30} className="me-2" />
              <span style={{ fontSize: '1rem' }}>Contáctanos por WhatsApp</span>
            </a>
          )}
        </div>

        <Row className="g-3">
          {loading || isLoading ? renderSkeletons() : (
            paginationState.data.length > 0 ? paginationState.data.map((product) => (
              <Col key={product.id} xs={6} md={4}>
                <ProductCard product={product} paginationState={paginationState} dispatch={dispatch} />
              </Col>
            )) : <p>No hay productos en esta categoría.</p>
          )}
        </Row>

        <div className="d-flex justify-content-center mt-4">
          <Button variant="falcon-default" size="sm" disabled={!paginationState.canPreviousPage} onClick={prevPage} className="me-2">Anterior</Button>
          <ul className="pagination mb-0">
            {paginationState.paginationArray.map((page) => (
              <li key={page} className={classNames({ active: paginationState.currentPage === page })}>
                <Button size="sm" variant="falcon-default" onClick={() => goToPage(page)}>{page}</Button>
              </li>
            ))}
          </ul>
          <Button variant="falcon-default" size="sm" disabled={!paginationState.canNextPage} onClick={nextPage}>Siguiente</Button>
        </div>

        <CartModal />
      </div>
    );
  };

  export default CategoryProducts;
