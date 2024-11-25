// Archivo de configuración de rutas (appRoutes, homeRoutes, pagesRoutes, modulesRoutes)
// Este archivo define la estructura de navegación y los enlaces asociados para las diferentes secciones de la aplicación,
// incluyendo el ecommerce, la autenticación del usuario, la sección de perfil y configuración, y un mapa de ubicación.

// Definición de rutas de ecommerce
export const appRoutes = {
  label: 'E-commerce',
  children: [
    {
      name: 'Productos',
      icon: 'shopping-cart',
      active: true,
      children: [
        {
          name: 'Todos los productos',
          to: '/e-commerce/product/product-grid',
          active: true
        },

        {
          name: 'Carrito de compras',
          to: '/e-commerce/shopping-cart',
          active: true
        }
      ]
    }
  ]
};

// Definición de rutas de la sección Home
export const homeRoutes = {
  label: 'Home',
  children: [
    {
      name: 'Home',
      icon: 'home',
      to: '/home',
      active: true
    }
  ]
};

// Definición de rutas del módulo de mapas y ubicación
export const modulesRoutes = {
  label: 'Ubicación',
  children: [
    {
      name: 'Mapa',
      to: 'components/home/componentsHome/map',
      active: true,
      icon: 'map'
    }
  ]
};

// Exportación de las rutas combinadas para el sistema de navegación
export default [homeRoutes, appRoutes,  modulesRoutes];
