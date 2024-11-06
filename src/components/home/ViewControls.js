/**
 * ViewControls Component
 * 
 * Este componente proporciona controles de visualización para alternar entre vista de cuadrícula y vista de lista,
 * además de un botón para regresar a la página anterior.
 * 
 * Propiedades:
 * - `setViewMode`: Función que permite cambiar el modo de vista entre "grid" (cuadrícula) y "list" (lista).
 * - `viewMode`: Modo de vista actual, que determina el icono y la función del botón de cambio de vista.
 * - `goBack`: Función que permite regresar a la página anterior.
 * 
 * Funcionalidad:
 * - Botón "Go Back" (con icono de flecha hacia atrás) para navegar a la página anterior.
 * - Alterna entre los iconos `FaThLarge` (cuadrícula) y `FaList` (lista) según el modo de vista actual.
 * 
 * Ejemplo de uso:
 * ```jsx
 * <ViewControls
 *   setViewMode={(mode) => console.log(`Cambiando vista a: ${mode}`)}
 *   viewMode="grid"
 *   goBack={() => console.log("Volviendo a la página anterior")}
 * />
 * ```
 */

import React from 'react';
import { Button } from 'react-bootstrap';
import { FaThLarge, FaList, FaArrowLeft } from 'react-icons/fa';

const ViewControls = ({ setViewMode, viewMode, goBack }) => {
  return (
    <div>
      <Button variant="light" onClick={goBack} className="me-2">
        <FaArrowLeft style={{ color: 'black' }} />
      </Button>
      {viewMode === 'list' && (
        <Button variant="light" onClick={() => setViewMode('grid')}>
          <FaThLarge style={{ color: 'black' }} />
        </Button>
      )}
      {viewMode === 'grid' && (
        <Button variant="light" onClick={() => setViewMode('list')}>
          <FaList style={{ color: 'black' }} />
        </Button>
      )}
    </div>
  );
};

export default ViewControls;
