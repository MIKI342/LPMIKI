//Renderiza la imagen principal del producto.
//Encapsula la lógica relacionada con la visualización de imágenes, como el ajuste de proporción, el diseño y los bordes redondeados.

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
        category={CategoriaProducto?.nombre || 'Sin Categoría'}
        files={images}
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
