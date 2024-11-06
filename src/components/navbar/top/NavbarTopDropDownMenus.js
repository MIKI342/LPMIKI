/**
 * Componente NavbarTopDropDownMenus
 *
 * Este componente controla los menús desplegables en la barra de navegación superior,
 * mostrando opciones para 'dashboard', 'app', 'pages', y 'modules'. Cada menú está
 * representado por un componente específico para facilitar su personalización y organización.
 *
 * Funcionalidad:
 * - Cada menú se activa y colapsa mediante el estado `navbarCollapsed`.
 * - `handleDropdownItemClick` controla el cierre del menú cuando se selecciona una opción.
 *
 * Dependencias:
 * - `useAppContext`: Proporciona el estado de colapso de la barra de navegación y la visibilidad del menú hamburguesa.
 * - `routes`: Rutas específicas para cada menú, importadas de `siteMaps`.
 * - Componentes adicionales para menús específicos (e.g., `NavbarDropdownApp`, `NavbarDropdownPages`).
 *
 * Ejemplo de uso:
 * ```jsx
 * <NavbarTopDropDownMenus />
 * ```
 */

import React from 'react';
import NavbarDropdown from './NavbarDropdown';
import { appRoutes, pagesRoutes, modulesRoutes } from 'routes/siteMaps';
import { Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import NavbarDropdownApp from './NavbarDropdownApp';
import NavbarDropdownPages from './NavbarDropdownPages';
import NavbarDropdownModules from './NavbarDropdownModules';
import { useAppContext } from 'Main';

const NavbarTopDropDownMenus = () => {
  const {
    config: { navbarCollapsed, showBurgerMenu },
    setConfig
  } = useAppContext();

  // Maneja el estado del dropdown y el menú hamburguesa
  const handleDropdownItemClick = () => {
    if (navbarCollapsed) {
      setConfig('navbarCollapsed', !navbarCollapsed);
    }
    if (showBurgerMenu) {
      setConfig('showBurgerMenu', !showBurgerMenu);
    }
  };

  return (
    <>
      {/* Menú para el dashboard */}
      <NavbarDropdown title="dashboard">
        {dashboardRoutes.children[0].children.map(route => (
          <Dropdown.Item
            key={route.name}
            as={Link}
            className={route.active ? 'link-600' : 'text-500'}
            to={route.to}
            onClick={handleDropdownItemClick}
          >
            {route.name}
          </Dropdown.Item>
        ))}
      </NavbarDropdown>

      {/* Menú para la sección de aplicaciones */}
      <NavbarDropdown title="app">
        <NavbarDropdownApp items={appRoutes.children} />
      </NavbarDropdown>

      {/* Menú para la sección de páginas */}
      <NavbarDropdown title="pages">
        <NavbarDropdownPages items={pagesRoutes.children} />
      </NavbarDropdown>

      {/* Menú para la sección de módulos */}
      <NavbarDropdown title="modules">
        <NavbarDropdownModules items={modulesRoutes.children} />
      </NavbarDropdown>
    </>
  );
};

export default NavbarTopDropDownMenus;
