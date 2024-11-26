import React, { useContext, useMemo } from 'react';
import { ProductContext } from 'context/Context';
import useRandomProducts from 'hooks/useRandomProducts';
import BienvenidaDesign from 'components/home/componentsHome/BienvenidaComponents/BienvenidaDesign';

const Bienvenida = () => {
  const greeting = useMemo(() => '¡Bienvenido!', []);

  const { products, loading } = useContext(ProductContext);

  const randomOffers = useRandomProducts(products, 10);

  if (loading) return <p>Cargando productos...</p>;

  return <BienvenidaDesign greeting={greeting} randomOffers={randomOffers} />;
};

export default React.memo(Bienvenida);
