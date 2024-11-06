/**
 * Este archivo configura el contexto global de la aplicación, proporcionando estilos y ajustes de tema.
 *
 * `Main` es el proveedor de contexto central de la aplicación, configurando propiedades como:
 * - Estilos de tema (oscuro o claro) y modo RTL.
 * - Posición y estilo de la barra de navegación.
 * - Configuración de la disposición fluida o contenida.
 *
 * Este archivo:
 * - Utiliza `configReducer` para gestionar la lógica de configuración.
 * - Lee configuraciones iniciales desde el almacenamiento local y las aplica al estado global.
 * - Proporciona funciones para cambiar el tema, alternar la barra de navegación vertical y actualizar 
 *   el contexto.
 * - Integra `ChartJS` para gráficos y `useToggleStyle` para cambiar hojas de estilo según el tema.
 *
 * Los componentes hijos que consumen este contexto pueden acceder a `config`, cambiar el tema o estilo 
 * de la aplicación, y actualizar la configuración global en tiempo real.
 */
import React, { useContext, useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';
import { AppContext } from 'context/Context';

import { settings } from './config';
import { getColor, getItemFromStore } from 'helpers/utils';
import { configReducer } from './reducers/configReducer';
import useToggleStyle from './hooks/useToggleStyle';

import { Chart as ChartJS, registerables } from 'chart.js';
ChartJS.register(...registerables);

const Main = props => {
  const configState = {
    isFluid: getItemFromStore('isFluid', settings.isFluid),
    isRTL: getItemFromStore('isRTL', settings.isRTL),
    isDark: getItemFromStore('isDark', settings.isDark),
    theme: getItemFromStore('theme', settings.theme),
    navbarPosition: getItemFromStore('navbarPosition', settings.navbarPosition),
    disabledNavbarPosition: [],
    isNavbarVerticalCollapsed: getItemFromStore(
      'isNavbarVerticalCollapsed',
      settings.isNavbarVerticalCollapsed
    ),
    navbarStyle: getItemFromStore('navbarStyle', settings.navbarStyle),
    currency: settings.currency,
    showBurgerMenu: settings.showBurgerMenu,
    showSettingPanel: false,
    navbarCollapsed: false,
    openAuthModal: false
  };

  const [config, configDispatch] = useReducer(configReducer, configState);

  const setConfig = (key, value) => {
    configDispatch({
      type: 'SET_CONFIG',
      payload: {
        key,
        value,
        setInStore: [
          'isFluid',
          'isRTL',
          'isDark',
          'theme',
          'navbarPosition',
          'isNavbarVerticalCollapsed',
          'navbarStyle'
        ].includes(key)
      }
    });
  };
  const { isLoaded } = useToggleStyle(config.isRTL, config.isDark);

  useEffect(() => {
    const isDark =
      config.theme === 'auto'
        ? window.matchMedia('(prefers-color-scheme: dark)').matches
        : config.theme === 'dark';

    setConfig('isDark', isDark);
  }, [config.theme]);

  const changeTheme = theme => {
    const isDark =
      theme === 'auto'
        ? window.matchMedia('(prefers-color-scheme: dark)').matches
        : theme === 'dark';

    document.documentElement.setAttribute(
      'data-bs-theme',
      isDark ? 'dark' : 'light'
    );

    setConfig('theme', theme);
    setConfig('isDark', isDark);
  };

  if (!isLoaded) {
    return (
      <div
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          backgroundColor: config.isDark ? getColor('dark') : getColor('light')
        }}
      />
    );
  }

  const toggleNavbarVertical = () => {
    setConfig('isNavbarVerticalCollapsed', !config.isNavbarVerticalCollapsed);
  };
  
  return (
    <AppContext.Provider
      value={{ config, setConfig, configDispatch, changeTheme, toggleNavbarVertical }}
    >
      {props.children}
    </AppContext.Provider>
  );
  
};

Main.propTypes = { children: PropTypes.node };

export const useAppContext = () => useContext(AppContext);
export default Main;
