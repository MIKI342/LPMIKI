/**
 * Punto de entrada principal de la aplicación.
 *
 * Este archivo configura y monta la aplicación en el DOM de la página. Utiliza React
 * con el modo estricto (`React.StrictMode`) para ayudar a identificar problemas
 * potenciales en la aplicación. Dentro de este entorno estricto, se envuelve el 
 * componente raíz `App` dentro de un contexto global (`Main`), que provee configuraciones
 * y contexto compartido para toda la aplicación, como temas, autenticación, y otros estados
 * globales esenciales.
 *
 * Estructura de importación:
 * - `App`: Componente principal que contiene la lógica y rutas principales de la aplicación.
 * - `Main`: Proveedor de contexto global que contiene configuraciones generales y envoltura 
 *   de la aplicación.
 * - `initFA`: Inicializa Font Awesome y otros íconos necesarios.
 *
 * El componente `App` se monta en el elemento HTML con ID `main`, especificado como `container`.
 * Luego, `createRoot` se encarga de renderizar la aplicación usando `root.render`, asegurando 
 * que se mantenga el flujo y control sobre la aplicación dentro del árbol de React.
 */
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import Main from './Main';
import 'helpers/initFA';

const container = document.getElementById('main');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Main>
      <App />
    </Main>
  </React.StrictMode>
);
