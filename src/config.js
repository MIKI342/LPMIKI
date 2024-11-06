/**
 * Configuración general de la aplicación.
 *
 * Este archivo define una serie de configuraciones y parámetros globales que
 * controlan la apariencia, el diseño y el comportamiento de la interfaz de usuario 
 * de la aplicación. Estas configuraciones están centralizadas para facilitar el 
 * ajuste y personalización de la UI a nivel global, evitando tener que definir 
 * estos parámetros en múltiples lugares del código.
 *
 * Variables definidas:
 * - `version`: Especifica la versión actual de la aplicación.
 * - `navbarBreakPoint` y `topNavbarBreakpoint`: Configuran los puntos de interrupción
 *   para el cambio de diseño en las barras de navegación (horizontal y vertical),
 *   adaptándose automáticamente en función del tamaño de pantalla.
 * - `themeVariants`: Define los modos de tema posibles (claro, oscuro, automático).
 * - `settings`: Contiene los ajustes principales de la aplicación que controlan:
 *    - `isFluid`: Configura el contenedor como fluido o fijo.
 *    - `isRTL`: Activa o desactiva el modo de lectura de derecha a izquierda.
 *    - `isDark`: Define si se usa el tema oscuro.
 *    - `theme`: Establece el tema inicial de la aplicación.
 *    - `navbarPosition`: Determina la posición de la barra de navegación (`vertical`, etc.).
 *    - `showBurgerMenu`: Controla la visibilidad del menú tipo hamburguesa en dispositivos móviles.
 *    - `currency`: Especifica el símbolo de moneda a utilizar en la UI.
 *    - `isNavbarVerticalCollapsed`: Define si la barra de navegación vertical está colapsada.
 *    - `navbarStyle`: Aplica un estilo específico a la barra de navegación vertical.
 *
 * Estos valores son utilizados en varios componentes a través de la aplicación para 
 * garantizar un diseño cohesivo, adaptable y fácilmente personalizable. 
 */
export const version = '4.4.0';
export const navbarBreakPoint = 'xl'; // Vertical navbar breakpoint
export const topNavbarBreakpoint = 'lg';
export const themeVariants = ['light', 'dark', 'auto'];
export const settings = {
  isFluid: false,
  isRTL: false,
  isDark: false,
  theme: 'light',
  navbarPosition: 'vertical',
  showBurgerMenu: false, // controls showing vertical nav on mobile
  currency: '$',
  isNavbarVerticalCollapsed: false, // toggle vertical navbar collapse
  navbarStyle: 'transparent'
};

export default { version, navbarBreakPoint, topNavbarBreakpoint, settings };
