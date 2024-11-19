import React, { useState } from 'react';
import { Carousel, Image, Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';

const ProductDetailsMedia = ({ product, imageList }) => {
  const defaultImage = '/img/default.png';
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

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
        {imageList.length > 0
          ? imageList.map((src, index) => (
              <Carousel.Item key={index}>
                <Image
                  src={src}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = defaultImage;
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
            ))
          : (
            <Image
              src={defaultImage}
              className="w-100"
              alt="Imagen por defecto"
              loading="lazy"
              style={{
                objectFit: 'cover',
                height: '500px',
                cursor: 'pointer',
              }}
              onClick={() => handleImageClick(defaultImage)}
            />
          )}
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
  imageList: PropTypes.array.isRequired,
};

export default ProductDetailsMedia;
