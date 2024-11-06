// MainLayout.js - Componente de diseño principal
// Este componente establece la estructura general de la aplicación, renderizando los componentes principales como la barra de navegación superior y vertical,
// gestionando el contexto de productos y proporcionando una disposición para el contenido principal y un modal de autenticación.

// Características:
// - `NavbarTop` y `NavbarVertical`: los componentes de navegación superior y vertical que cambian según la configuración de `navbarPosition`.
// - `ProductProvider`: proporciona el contexto global de productos para la aplicación.
// - `Outlet`: espacio para cargar dinámicamente los componentes de las rutas principales de la aplicación.
// - `ModalAuth`: modal de autenticación que se muestra de forma condicional.

// Comportamiento adicional:
// - Realiza un scroll suave hacia elementos con `id` coincidentes en el `hash` de la URL al cargar o cambiar de ruta.
// - Restaura la posición de scroll a la parte superior en cada cambio de ruta (controlado por `pathname`).

import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import classNames from 'classnames';
import NavbarTop from 'components/navbar/top/NavbarTop';
import NavbarVertical from 'components/navbar/vertical/NavbarVertical';
import { ProductProvider } from 'context/Context';
import ModalAuth from 'components/authentication/modal/ModalAuth';
import { useAppContext } from 'Main';

const MainLayout = () => {
  const { hash, pathname } = useLocation();
  const isKanban = pathname.includes('kanban');

  const {
    config: { isFluid, navbarPosition }
  } = useAppContext();

  // Realiza scroll suave hacia el elemento con id coincidente en el hash de la URL
  useEffect(() => {
    setTimeout(() => {
      if (hash) {
        const id = hash.replace('#', '');
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ block: 'start', behavior: 'smooth' });
        }
      }
    }, 0);
  }, [hash]);

  // Restaura la posición de scroll en cada cambio de ruta
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className={isFluid ? 'container-fluid' : 'container'}>
      {(navbarPosition === 'vertical' || navbarPosition === 'combo') && (
        <NavbarVertical />
      )}
      <ProductProvider>
        <div className={classNames('content', { 'pb-0': isKanban })}>
          <NavbarTop />
          {/*------ Main Routes ------*/}
          <Outlet />
        </div>
      </ProductProvider>
      <ModalAuth />
    </div>
  );
};

export default MainLayout;
