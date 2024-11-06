// Este archivo define `addBrowserClasses`, una función que aplica clases CSS específicas al elemento HTML
// de acuerdo con el navegador o sistema operativo en uso. Esto permite que la aplicación detecte automáticamente
// el entorno del usuario (Windows, Chrome, Firefox, Safari) y agregue clases relacionadas al `HTMLClassList`.
//
// Estas clases pueden ser utilizadas en estilos CSS para adaptar la apariencia o comportamiento de la aplicación
// a cada navegador, manejando inconsistencias o personalizando la experiencia del usuario según el entorno.
//
// Dependencia: `is_js` se utiliza para realizar detección de navegador y sistema operativo.
import is from 'is_js';

export const addBrowserClasses = (HTMLClassList) => {
  if (is.windows()) {
    HTMLClassList.add('windows');
  }
  if (is.chrome()) {
    HTMLClassList.add('chrome');
  }
  if (is.firefox()) {
    HTMLClassList.add('firefox');
  }
  if (is.safari()) {
    HTMLClassList.add('safari');
  }
};
