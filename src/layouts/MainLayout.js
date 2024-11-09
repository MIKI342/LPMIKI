import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import classNames from 'classnames';
import NavbarTop from 'components/navbar/top/NavbarTop';
import NavbarVertical from 'components/navbar/vertical/NavbarVertical';
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
      <div className={classNames('content', { 'pb-0': isKanban })}>
        <NavbarTop />
        {/*------ Main Routes ------*/}
        <Outlet />
      </div>
      <ModalAuth />
    </div>
  );
};

export default MainLayout;
