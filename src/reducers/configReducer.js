// configReducer.js - Reducer de configuración
// Este reducer maneja la configuración global de la aplicación y permite actualizar, refrescar o reiniciar las opciones de configuración. 
// Los cambios pueden persistirse en el almacenamiento local (localStorage) según la configuración proporcionada.

// Acciones:
// - `SET_CONFIG`: Actualiza una clave de configuración específica en el estado global, con la opción de persistirla en el almacenamiento local.
// - `REFRESH`: Refresca el estado actual sin cambios (útil para disparar actualizaciones basadas en dependencias de renderizado).
// - `RESET`: Restablece la configuración a los valores predeterminados (definidos en `settings`), borra el almacenamiento local y restablece el tema.

// Dependencias:
// - `settings`: Configuración predeterminada importada de `config`, que define los valores iniciales y de reinicio de configuración.
// - `setItemToStore`: Función de ayuda para guardar elementos en el almacenamiento local.

import { settings } from 'config';
import { setItemToStore } from 'helpers/utils';

export const configReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case 'SET_CONFIG':
      if (payload.setInStore) {
        setItemToStore(payload.key, payload.value); // Guarda el valor en localStorage si se solicita
      }
      return {
        ...state,
        [payload.key]: payload.value // Actualiza la clave de configuración en el estado
      };
    case 'REFRESH':
      return {
        ...state // Mantiene el estado actual sin cambios
      };
    case 'RESET':
      localStorage.clear(); // Limpia el almacenamiento local
      document.documentElement.setAttribute('data-bs-theme', settings.theme); // Restablece el tema
      return {
        ...state,
        ...settings // Restablece el estado a los valores predeterminados
      };
    default:
      return state;
  }
};
