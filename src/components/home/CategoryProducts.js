import React, { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ProductContext } from 'context/Context';
import ProductCard from 'components/app/e-commerce/product/componentsProductCard/ProductCard';
import useGroupedByCategory from 'hooks/useGroupedByCategory';
import { Row, Col, Button } from 'react-bootstrap';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import CartModal from 'components/app/e-commerce/cart/CartModal';
import usePagination from 'hooks/usePagination';
import classNames from 'classnames';
import { FaWhatsapp } from 'react-icons/fa';
import { getProductsFromDB, setProductsInDB } from 'services/indexedDBService';
import useContactNumbers from 'hooks/useContactNumbers';

const CategoryProducts = () => {
  const { category } = useParams();
  const { products, loading } = useContext(ProductContext);
  const groupedProducts = useGroupedByCategory(products);
  const productsInCategory = groupedProducts[category] || [];
  const [cachedProducts, setCachedProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [productPerPage] = useState(20);
  const { paginationState, nextPage, prevPage, goToPage, dispatch } =
    usePagination(
      cachedProducts.length > 0 ? cachedProducts : productsInCategory,
      productPerPage,
      category
    );

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

  const renderSkeletons = () => {
    const skeletons = Array(6).fill(null);
    return skeletons.map((_, index) => (
      <Col key={index} xs={6} md={4}>
        <Skeleton height={350} />
      </Col>
    ));
  };
  const sendMessage = () => {
    const whatsappNumber = contact.replace(/[^0-9]/g, ''); // Extraer el número
    const message = `Estimado equipo, estoy interesado en los productos de la categoría ${category}.`;

    // Detectar si es un dispositivo móvil
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    // Enlace para móvil o escritorio
    const appLink = isMobile
      ? `whatsapp://send?phone=${whatsappNumber}&text=${encodeURIComponent(
          message
        )}`
      : `https://web.whatsapp.com/send?phone=${whatsappNumber}&text=${encodeURIComponent(
          message
        )}`;

    // Redirigir al enlace correspondiente
    window.location.href = appLink;
  };

  return (
    <div>
      <div className="d-flex flex-column align-items-center mb-3">
        <div className="d-flex align-items-center">
          <h1
            className="text-center"
            style={{
              fontFamily: 'Arial, sans-serif',
              fontWeight: 'bold',
              fontSize: '2rem',
              marginRight: '10px'
            }}
          >
            {category}
          </h1>
        </div>

        {contact && (
          <button
            onClick={sendMessage}
            className="d-flex align-items-center text-success mt-2"
            style={{
              fontSize: '1.5rem', // Tamaño de letra aumentado
              background: 'none',
              border: 'none',
              padding: '0',
              color: 'inherit',
              cursor: 'pointer'
            }}
          >
            <FaWhatsapp size={30} className="me-2" />
            <span style={{ fontSize: '1.3rem' }}>Contáctanos por WhatsApp</span>
          </button>
        )}
      </div>

      <Row className="g-3">
        {loading || isLoading ? (
          renderSkeletons()
        ) : paginationState.data.length > 0 ? (
          paginationState.data.map(product => (
            <Col key={product.id} xs={6} md={4}>
              <ProductCard
                product={product}
                paginationState={paginationState}
                dispatch={dispatch}
              />
            </Col>
          ))
        ) : (
          <p>No hay productos en esta categoría.</p>
        )}
      </Row>

      <div className="d-flex justify-content-center mt-4">
        <Button
          variant="falcon-default"
          size="sm"
          disabled={!paginationState.canPreviousPage}
          onClick={prevPage}
          className="me-2"
        >
          Anterior
        </Button>
        <ul className="pagination mb-0">
          {paginationState.paginationArray.map(page => (
            <li
              key={page}
              className={classNames({
                active: paginationState.currentPage === page
              })}
            >
              <Button
                size="sm"
                variant="falcon-default"
                onClick={() => goToPage(page)}
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
          onClick={nextPage}
        >
          Siguiente
        </Button>
      </div>

      <CartModal />
    </div>
  );
};

export default CategoryProducts;
