//Es el componente principal que coordina todos los subcomponentes.
//Gestiona el estado, la lógica de paginación, el caché de productos y la integración con la base de datos IndexedDB.
//Usa subcomponentes para delegar la responsabilidad de renderizar las partes específicas (encabezado, lista de productos, controles de paginación, etc.).

import React, { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ProductContext } from 'context/Context';
import { Row, Col, Button } from 'react-bootstrap';
import useGroupedByCategory from 'hooks/useGroupedByCategory';
import usePagination from 'hooks/usePagination';
import useContactNumbers from 'hooks/useContactNumbers';
import { getProductsFromDB, setProductsInDB } from 'services/indexedDBService';
import SkeletonLoader from 'components/home/componentsHome/CategoryProductsComponents/SkeletonLoader';
import ProductList from 'components/home/componentsHome/CategoryProductsComponents/ProductList';
import PaginationControls from 'components/home/componentsHome/CategoryProductsComponents/PaginationControls';
import CategoryHeader from 'components/home/componentsHome/CategoryProductsComponents/CategoryHeader';
import CartModal from 'components/app/e-commerce/cart/CartModal';

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

  return (
    <div>
      <CategoryHeader category={category} contact={contact} />

      <Row className="g-3">
        {loading || isLoading ? (
          <SkeletonLoader count={6} />
        ) : (
          <ProductList
            products={paginationState.data}
            dispatch={dispatch}
            paginationState={paginationState}
          />
        )}
      </Row>

      <PaginationControls
        paginationState={paginationState}
        prevPage={prevPage}
        nextPage={nextPage}
        goToPage={goToPage}
      />

      <CartModal />
    </div>
  );
};

export default CategoryProducts;
