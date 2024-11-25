import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';

const CategoryHeader = ({ category, contact }) => {
  const sendMessage = () => {
    // Elimina cualquier carácter que no sea numérico del número de contacto
    const whatsappNumber = contact.replace(/[^0-9]/g, '');

    // Mensaje predefinido que se enviará
    
    const message = `Hola, estoy interesado en productos de ${category} que ofrecen. ¿Podrían brindarme más información? Gracias.`;


    // Detecta si el usuario está en un dispositivo móvil
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    // Genera el enlace dinámico de WhatsApp
    const appLink = isMobile
      ? `whatsapp://send?phone=${whatsappNumber}&text=${encodeURIComponent(message)}`
      : `https://web.whatsapp.com/send?phone=${whatsappNumber}&text=${encodeURIComponent(message)}`;

    if (isMobile) {
      // En dispositivos móviles, abre el enlace en la misma pestaña para usar la aplicación de WhatsApp
      window.location.href = appLink;
    } else {
      // En escritorio, abre el enlace en una nueva pestaña
      window.open(appLink, '_blank');
    }
  };

  return (
    <div className="d-flex flex-column align-items-center mb-3">
      <h1
        className="text-center"
        style={{
          fontFamily: 'Arial, sans-serif',
          fontWeight: 'bold',
          fontSize: '2rem',
          marginRight: '10px',
        }}
      >
        {category}
      </h1>
      {contact && (
        <button
          onClick={sendMessage}
          className="d-flex align-items-center text-success mt-2"
          style={{
            fontSize: '1.5rem',
            background: 'none',
            border: 'none',
            padding: '0',
            color: 'inherit',
            cursor: 'pointer',
          }}
        >
          <FaWhatsapp size={30} className="me-2" />
          <span style={{ fontSize: '1.3rem' }}>Contáctanos por WhatsApp</span>
        </button>
      )}
    </div>
  );
};

export default CategoryHeader;
