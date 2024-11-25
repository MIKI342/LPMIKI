// components/app/e-commerce/product/ProductCardImage.jsx

import React from 'react';
import PropTypes from 'prop-types';
import ProductImage from 'components/app/e-commerce/product/ProductImage';

const ProductCardImage = ({ product }) => {
  const { id, nombreProducto, CategoriaProducto, images } = product;

  return (
    <div
      className="ratio ratio-1x1"
      style={{
        borderTopLeftRadius: '10px',
        borderTopRightRadius: '10px',
        overflow: 'hidden',
      }}
    >
      <ProductImage
        name={nombreProducto}
        id={id}
        category={CategoriaProducto?.nombreCategoria || 'Sin Categoría'}
        images={images} // Pasamos 'images' al componente
        layout="grid"
        className="w-100 h-100"
      />
    </div>
  );
};

ProductCardImage.propTypes = {
  product: PropTypes.object.isRequired,
};

export default ProductCardImage;
