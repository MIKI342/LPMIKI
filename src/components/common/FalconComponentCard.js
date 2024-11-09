/**
 * FalconComponentCard
 * 
 * Este componente es una tarjeta personalizable (`Card`) que incluye subcomponentes para el encabezado (`Header`)
 * y el cuerpo (`Body`). Se puede usar para mostrar contenido estructurado y organizado en secciones.
 * 
 * Subcomponentes:
 * - **FalconComponentCardHeader**: Encabezado de la tarjeta con opciones de estilo de fondo claro y personalización 
 *   de clases. Permite añadir un título y contenido adicional.
 * - **FalconComponentCardBody**: Cuerpo de la tarjeta, diseñado para mostrar el contenido principal.
 * 
 * Propiedades de `FalconComponentCard`:
 * - `children`: Contenido de la tarjeta, que usualmente incluye `FalconComponentCard.Header` y `FalconComponentCard.Body`.
 * - `noGuttersBottom`: Booleano que, si es `true`, elimina el margen inferior (`mb-3`).
 * 
 * Propiedades de `FalconComponentCardHeader`:
 * - `light`: Activa un fondo claro para el encabezado.
 * - `className`: Clase CSS adicional para personalizar el encabezado.
 * - `title`: Texto del título que se muestra en el encabezado.
 * - `children`: Contenido adicional dentro del encabezado.
 * 
 * Propiedades de `FalconComponentCardBody`:
 * - `className`: Clase CSS adicional para el cuerpo de la tarjeta.
 * - `children`: Contenido del cuerpo de la tarjeta.
 * 
 * Ejemplo de uso:
 * ```jsx
 * <FalconComponentCard noGuttersBottom>
 *   <FalconComponentCard.Header light title="Mi Encabezado">
 *     Contenido adicional en el encabezado
 *   </FalconComponentCard.Header>
 *   <FalconComponentCard.Body>
 *     Contenido principal de la tarjeta.
 *   </FalconComponentCard.Body>
 * </FalconComponentCard>
 * ```
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';
import classNames from 'classnames';

const FalconComponentCardHeader = ({
  light,
  className,
  title,
  children
}) => {
  return (
    <Card.Header
      className={classNames({ 'bg-body-tertiary': light }, className)}
    >
      {title && (
        <h5 className="mb-0 text-truncate text-nowrap">
          {title}
        </h5>
      )}
      {children}
    </Card.Header>
  );
};

const FalconComponentCardBody = ({ children, className }) => {
  return (
    <Card.Body className={classNames(className)}>
      {children}
    </Card.Body>
  );
};

const FalconComponentCard = ({
  children,
  noGuttersBottom,
  ...rest
}) => {
  return (
    <Card className={classNames({ 'mb-3': !noGuttersBottom })} {...rest}>
      {children}
    </Card>
  );
};

FalconComponentCard.Header = FalconComponentCardHeader;
FalconComponentCard.Body = FalconComponentCardBody;

FalconComponentCard.propTypes = {
  children: PropTypes.node,
  noGuttersBottom: PropTypes.bool
};

FalconComponentCardHeader.propTypes = {
  light: PropTypes.bool,
  className: PropTypes.string,
  title: PropTypes.string,
  children: PropTypes.node
};

FalconComponentCardBody.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
};

export default FalconComponentCard;
