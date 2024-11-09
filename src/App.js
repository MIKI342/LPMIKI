// App.js
// Este archivo es el punto de entrada principal de la aplicación. Configura el enrutamiento, el manejo de contexto global,
// y los componentes de UI globales como el sistema de notificaciones y panel de configuración.

// Dependencias e importaciones necesarias
import React, { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import FalconRoutes from 'routes';
import { CloseButton } from 'components/common/Toast';
import SettingsToggle from 'components/settings-panel/SettingsToggle';
import SettingsPanel from 'components/settings-panel/SettingsPanel';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-toastify/dist/ReactToastify.min.css';
import { useAppContext } from 'Main';
import { ProductProvider } from './context/Context';
import { AuthProvider } from './context/AuthContext'; // Proveedor de contexto de autenticación
// src/index.js o src/App.js

import 'bootstrap/dist/css/bootstrap.min.css';

// Importar el helper de clases de navegador
import { addBrowserClasses } from './helpers/browserClassHelpers';

// Importar el hook useWindowSize para manejar el tamaño de la ventana
import useWindowSize from './hooks/useWindowSize';

const App = () => {
  const HTMLClassList = document.getElementsByTagName('html')[0].classList;
  const {
    config: { navbarPosition }
  } = useAppContext();

  // Llamar al hook useWindowSize para obtener el tamaño actual de la ventana
  const size = useWindowSize();

  // Agregar clases específicas del navegador al cargar la app
  useEffect(() => {
    console.log(
      'App.js: Envolviendo toda la aplicación con ProductProvider...'
    );
    addBrowserClasses(HTMLClassList);

    // Prevenir scroll horizontal
    document.body.style.overflowX = 'hidden';
    document.documentElement.style.overflowX = 'hidden';

    return () => {
      document.body.style.overflowX = 'auto'; // Restaurar al valor predeterminado al desmontar
      document.documentElement.style.overflowX = 'auto';
    };
  }, [HTMLClassList]);

  // Configuración de estilo condicional para el layout de navbar
  useEffect(() => {
    if (navbarPosition === 'double-top') {
      HTMLClassList.add('double-top-nav-layout');
    }
    return () => HTMLClassList.remove('double-top-nav-layout');
  }, [navbarPosition]);

  return (
    // Envolvemos toda la aplicación con los proveedores de contexto
    <AuthProvider>
      {' '}
      {/* Proveedor de autenticación para gestionar el estado de usuario */}
      <ProductProvider>
        <Router basename={process.env.PUBLIC_URL}>
          {/* Condicional para mostrar un mensaje según el tamaño de la ventana */}
          <FalconRoutes /> {/* Configuración de rutas de la aplicación */}
          <SettingsToggle /> {/* Botón para activar panel de configuración */}
          <SettingsPanel /> {/* Panel de configuración de la aplicación */}
          <ToastContainer
            closeButton={CloseButton}
            icon={false}
            position="bottom-left"
          />
        </Router>
      </ProductProvider>
    </AuthProvider>
  );
};

export default App;
