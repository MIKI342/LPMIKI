import { useMemo } from 'react';

const useContactNumbers = () => {
  const contactNumbers = useMemo(() => {
    const numbers = {
      vapeDiego: process.env.REACT_APP_CONTACT_VAPE_DIEGO || 'Número no disponible',
      tramitesVale: process.env.REACT_APP_CONTACT_TRAMITES_VALE || 'Número no disponible',
      refaccionesYahir: process.env.REACT_APP_CONTACT_REFACCIONES_YAHIR || 'Número no disponible',
      regalos: process.env.REACT_APP_CONTACT_REGALOS || 'Número no disponible',
      respaldoManuel: process.env.REACT_APP_CONTACT_RESPALDO_MANUEL || 'Número no disponible',
    };
    return numbers;
  }, []);

  const normalizeCategory = (category) =>
    (category || '')
      .trim()
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, ''); // Elimina acentos y diacríticos

  const getContactNumberByCategory = (category) => {
    const normalizedCategory = normalizeCategory(category);

    const contactMapping = {
      vape: contactNumbers.vapeDiego,
      tramites: contactNumbers.tramitesVale,
      refacciones: contactNumbers.refaccionesYahir,
      herramientas: contactNumbers.refaccionesYahir,
      insumos: contactNumbers.refaccionesYahir,
      'regalos y fiesta': contactNumbers.regalos,
      papeleria: contactNumbers.regalos,
      electronica: contactNumbers.respaldoManuel,
    };

    const contact = contactMapping[normalizedCategory] || contactNumbers.respaldoManuel;

    if (contact.startsWith('521')) {
      return `52${contact.slice(3)}`; // Corrige el prefijo
    }
    return contact;
  };

  return { getContactNumberByCategory };
};

export default useContactNumbers;
