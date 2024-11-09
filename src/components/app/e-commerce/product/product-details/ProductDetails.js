import React, { useContext } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { Card, Col, Row, Spinner } from 'react-bootstrap';
import ProductDetailsMedia from './ProductDetailsMedia';
import ProductDetailsMain from './ProductDetailsMain';
import ProductDetailsFooter from './ProductDetailsFooter';
import { ProductContext } from 'context/Context';
import CartModal from '../../cart/CartModal';
import Flex from 'components/common/Flex';
import { productImageMapping } from 'constants/productImageMapping';

const ProductDetails = () => {
  const { productId } = useParams();
  const { products, loading } = useContext(ProductContext);

  if (loading) {
    return (
      <div className="d-flex justify-content-center my-5">
        <Spinner animation="border" variant="primary" />
        <span className="ms-2">Cargando producto...</span>
      </div>
    );
  }

  if (!products || products.length === 0) {
    return <div className="text-center mt-5">No hay productos disponibles</div>;
  }

  const product = products.find(product => product.id === productId);

  if (!product) {
    console.error('Producto no encontrado para el ID:', productId);
    return <Navigate to={`/e-commerce/product/product-details/${products[0].id}`} />;
  }

  const normalizeCategoryName = (name) => {
    return name
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]/g, '');
  };

  const constructImagePath = (folderName, imageNumber) => {
    return `/img/${folderName}/img${imageNumber}.png`;
  };

  const generateImageList = () => {
    const MAX_IMAGES = 3;
    let imageList = [];

    if (product.CategoriaProducto?.nombre && product.CategoriaProducto.nombre.toLowerCase() === 'vape') {
      const trimmedName = product.nombreProducto.trim();
      const imageFolder = productImageMapping[trimmedName] || null;

      if (imageFolder) {
        imageList = Array.from({ length: MAX_IMAGES }, (_, i) =>
          constructImagePath(imageFolder.toLowerCase(), i + 1)
        );
      }
    } else {
      const categoryFolder = normalizeCategoryName(product.CategoriaProducto?.nombre || 'Sin Categoría');
      imageList = Array.from({ length: MAX_IMAGES }, (_, i) =>
        constructImagePath(categoryFolder, i + 1)
      );
    }

    return imageList;
  };

  const imageList = generateImageList();

  return (
    <>
      <Card className="shadow-sm mb-4">
        <Card.Body>
          
          <Row>
            <Col lg={6} className="mb-4 mb-lg-0">
              <ProductDetailsMedia product={product} imageList={imageList} />
            </Col>
            <Col lg={6} as={Flex} justifyContent="between" direction="column">
              <ProductDetailsMain product={product} />
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <ProductDetailsFooter product={product} />
            </Col>
          </Row>
        </Card.Body>
      </Card>
      <CartModal />
    </>
  );
};

export default ProductDetails;
