// components/app/e-commerce/product/product-details/ProductDetailsMedia.jsx

import React, { useState, useMemo } from 'react';
import { Carousel, Image, Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';

const DEFAULT_IMAGE = '/img/default.png';

const ProductDetailsMedia = ({ product, images }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  // Obtener el baseUrl desde la variable de entorno
  const baseUrl = process.env.REACT_APP_BASE_URL || '';

  // Construir las URLs completas de las imágenes
  const imageUrls = useMemo(() => {
    if (images && images.length > 0) {
      return images.map((img) => `${baseUrl}${img}`);
    } else {
      return [DEFAULT_IMAGE];
    }
  }, [images, baseUrl]);

  const handleImageClick = (src) => {
    setSelectedImage(src); // Establecer la imagen seleccionada
    setShowModal(true); // Mostrar el modal
  };

  const handleCloseModal = () => {
    setShowModal(false); // Cerrar el modal
    setSelectedImage(null); // Limpiar la imagen seleccionada
  };

  return (
    <>
      {/* Carrusel de Imágenes */}
      <Carousel indicators={false} controls interval={2500} fade className="w-100">
        {imageUrls.map((src, index) => (
          <Carousel.Item key={index}>
            <Image
              src={src}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = DEFAULT_IMAGE;
              }}
              className="w-100"
              alt={`${product.nombreProducto} - Imagen ${index + 1}`}
              loading="lazy"
              style={{
                objectFit: 'cover',
                height: '500px',
                cursor: 'pointer', // Indicar que es interactiva
              }}
              onClick={() => handleImageClick(src)} // Manejar clic en la imagen
            />
          </Carousel.Item>
        ))}
      </Carousel>

      {/* Modal para Imagen Expandida */}
      <Modal show={showModal} onHide={handleCloseModal} centered size="lg">
        <Modal.Body className="p-0">
          {selectedImage && (
            <Image
              src={selectedImage}
              className="w-100"
              alt="Imagen expandida"
              style={{ objectFit: 'contain', maxHeight: '90vh' }} // Mostrar completa sin recortar
            />
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};

ProductDetailsMedia.propTypes = {
  product: PropTypes.object.isRequired,
  images: PropTypes.arrayOf(PropTypes.string),
};

export default ProductDetailsMedia;
