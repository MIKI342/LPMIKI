// useToggleStylesheet.js - Hook para gestionar la carga dinámica de estilos
// Este hook permite alternar dinámicamente entre hojas de estilo para temas (claro/oscuro) y disposición de texto (LTR/RTL).
// Está diseñado para entornos donde los temas o la orientación de texto pueden cambiar en tiempo real,
// y facilita la carga y eliminación de archivos CSS de manera programática.

// Parámetros:
// - `isRTL` (boolean): indica si el texto debe mostrarse en una disposición de derecha a izquierda.
// - `isDark` (boolean): indica si se debe aplicar el tema oscuro.

// Funcionalidad principal:
// - Cambia la orientación del texto de LTR a RTL, y carga/descarga las hojas de estilo en función de `isRTL`.
// - Alterna entre el tema claro y oscuro aplicando un atributo de tema en el elemento raíz `<html>`.
// - Usa `isLoaded` para indicar si las hojas de estilo se han cargado correctamente, útil para gestionar el estado de carga en la interfaz.

// Ejemplo de uso en un componente:
// ```jsx
// const { isLoaded } = useToggleStylesheet(isRTL, isDark);
// return (
//   <div>
//     {isLoaded ? <MainContent /> : <LoadingSpinner />}
//   </div>
// );
// ```

import { useEffect, useState } from 'react';

const useToggleStylesheet = (isRTL, isDark) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(false);
    Array.from(document.getElementsByClassName('theme-stylesheet')).forEach(
      link => link.remove()
    );
    const link = document.createElement('link');
    link.href = `${process.env.PUBLIC_URL}/css/theme${isRTL ? '.rtl' : ''}.css`;
    link.type = 'text/css';
    link.rel = 'stylesheet';
    link.className = 'theme-stylesheet';

    const userLink = document.createElement('link');
    userLink.href = `${process.env.PUBLIC_URL}/css/user${
      isRTL ? '.rtl' : ''
    }.css`;
    userLink.type = 'text/css';
    userLink.rel = 'stylesheet';
    userLink.className = 'theme-stylesheet';

    link.onload = () => {
      setIsLoaded(true);
    };

    document.getElementsByTagName('head')[0].appendChild(link);
    document.getElementsByTagName('head')[0].appendChild(userLink);
    document
      .getElementsByTagName('html')[0]
      .setAttribute('dir', isRTL ? 'rtl' : 'ltr');
  }, [isRTL]);

  useEffect(() => {
    document.documentElement.setAttribute(
      'data-bs-theme',
      isDark ? 'dark' : 'light'
    );
  }, [isDark]);

  return { isLoaded };
};

export default useToggleStylesheet;
