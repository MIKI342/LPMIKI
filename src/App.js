import React, { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import FalconRoutes from 'routes';
import { CloseButton } from 'components/common/Toast';
import SettingsToggle from 'components/settings-panel/SettingsToggle';
import SettingsPanel from 'components/settings-panel/SettingsPanel';
import { ProductProvider } from './context/Context';
import 'bootstrap/dist/css/bootstrap.min.css';

// Otros imports
import { addBrowserClasses } from './helpers/browserClassHelpers';
import useWindowSize from './hooks/useWindowSize';

const App = () => {
  const HTMLClassList = document.getElementsByTagName('html')[0].classList;

  useEffect(() => {
    addBrowserClasses(HTMLClassList);

    document.body.style.overflowX = 'hidden';
    document.documentElement.style.overflowX = 'hidden';

    return () => {
      document.body.style.overflowX = 'auto';
      document.documentElement.style.overflowX = 'auto';
    };
  }, [HTMLClassList]);

  return (
    
      <ProductProvider>
        
        
        
            <Router basename={process.env.PUBLIC_URL}>
              <FalconRoutes />
              <SettingsToggle />
              <SettingsPanel />
              <ToastContainer closeButton={CloseButton} icon={false} position="bottom-left" />
            </Router>
           
      </ProductProvider>
 
  );
};

export default App;
