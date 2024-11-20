//Renderiza el título de la categoría.
//Incluye el botón de contacto por WhatsApp con la lógica para generar el enlace dinámico.
//No maneja lógica de productos ni estado global, se enfoca en la interfaz y acciones relacionadas con la categoría.

import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';

const CategoryHeader = ({ category, contact }) => {
  const sendMessage = () => {
    const whatsappNumber = contact.replace(/[^0-9]/g, '');
    const message = `Estimado equipo, estoy interesado en los productos de la categoría ${category}.`;
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    const appLink = isMobile
      ? `whatsapp://send?phone=${whatsappNumber}&text=${encodeURIComponent(
          message
        )}`
      : `https://web.whatsapp.com/send?phone=${whatsappNumber}&text=${encodeURIComponent(
          message
        )}`;
    window.location.href = appLink;
  };

  return (
    <div className="d-flex flex-column align-items-center mb-3">
      <h1 className="text-center" style={{ fontFamily: 'Arial, sans-serif', fontWeight: 'bold', fontSize: '2rem', marginRight: '10px' }}>
        {category}
      </h1>
      {contact && (
        <button
          onClick={sendMessage}
          className="d-flex align-items-center text-success mt-2"
          style={{ fontSize: '1.5rem', background: 'none', border: 'none', padding: '0', color: 'inherit', cursor: 'pointer' }}
        >
          <FaWhatsapp size={30} className="me-2" />
          <span style={{ fontSize: '1.3rem' }}>Contáctanos por WhatsApp</span>
        </button>
      )}
    </div>
  );
};

export default CategoryHeader;
