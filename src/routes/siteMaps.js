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
        },
        {
          name: 'Pago',
          to: '/e-commerce/checkout',
          active: true
        },
        {
          name: 'Facturación',
          to: '/e-commerce/billing',
          active: true
        },
        {
          name: 'Factura',
          to: '/e-commerce/invoice',
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
      to: '/home',
      active: true
    }
  ]
};

// Definición de rutas de autenticación y perfil de usuario
export const pagesRoutes = {
  label: 'Usuario',
  children: [
    {
      name: 'Autenticación',
      icon: 'lock',
      active: true,
      children: [
        {
          name: 'Iniciar sesión',
          to: '/authentication/simple/login',
          active: true
        },
        {
          name: 'Cerrar sesión',
          to: '/authentication/simple/logout',
          active: true
        },
        {
          name: 'Registrarse',
          to: '/authentication/simple/register',
          active: true
        },
        {
          name: 'Olvidé mi contraseña',
          to: '/authentication/simple/forgot-password',
          active: true
        },
        {
          name: 'Confirmar correo',
          to: '/authentication/simple/confirm-mail',
          active: true
        },
        {
          name: 'Restablecer contraseña',
          to: '/authentication/simple/reset-password',
          active: true
        },
        {
          name: 'Bloquear pantalla',
          to: '/authentication/simple/lock-screen',
          active: true
        }
      ]
    },
    {
      name: 'Usuario',
      icon: 'user',
      active: true,
      children: [
        { name: 'Perfil', to: '/user/profile', active: true },
        { name: 'Configuraciones', to: '/user/settings', active: true }
      ]
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
export default [homeRoutes, appRoutes, pagesRoutes, modulesRoutes];
