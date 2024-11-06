/**
 * FalconCardHeader Component
 * 
 * Este componente es un encabezado de tarjeta personalizable que puede incluir un título, contenido adicional, 
 * y un elemento final opcional. Ideal para encabezados de secciones en tarjetas, con opciones de diseño responsivo 
 * y temas de fondo claros.
 * 
 * Relación con otros subcomponentes:
 * - `Title`: Muestra el título del encabezado y maneja el ajuste de margen (`mb-0`), basado en el breakpoint para control de diseño.
 * 
 * Propiedades de `FalconCardHeader`:
 * - `title`: Contenido del título, generalmente un texto o un componente.
 * - `light`: Booleano que aplica un fondo claro (`bg-body-tertiary`) al encabezado.
 * - `titleTag`: Etiqueta HTML utilizada para el título, como `h5` o `h4`.
 * - `titleClass`: Clase CSS adicional para personalizar el título.
 * - `className`: Clase CSS adicional para el encabezado.
 * - `breakPoint`: Define el breakpoint donde se aplican los márgenes y alineación condicionales.
 * - `endEl`: Elemento opcional que se muestra al final del encabezado, alineado a la derecha.
 * - `children`: Contenido adicional que se muestra bajo el título.
 * 
 * Ejemplo de uso:
 * ```jsx
 * <FalconCardHeader 
 *   title="Mi Encabezado" 
 *   light 
 *   titleTag="h3" 
 *   breakPoint="md" 
 *   endEl={<Button variant="primary">Acción</Button>}
 * >
 *   Contenido adicional debajo del título.
 * </FalconCardHeader>
 * ```
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Col, Card, Row } from 'react-bootstrap';
import classNames from 'classnames';

const Title = ({ titleTag: TitleTag, className, breakPoint, children }) => (
  <TitleTag
    className={classNames(
      {
        'mb-0': !breakPoint,
        [`mb-${breakPoint}-0`]: !!breakPoint
      },
      className
    )}
  >
    {children}
  </TitleTag>
);

const FalconCardHeader = ({
  title,
  light,
  titleTag,
  titleClass,
  className,
  breakPoint,
  endEl,
  children
}) => (
  <Card.Header className={classNames(className, { 'bg-body-tertiary': light })}>
    {endEl ? (
      <Row className="align-items-center g-2">
        <Col>
          <Title
            breakPoint={breakPoint}
            titleTag={titleTag}
            className={titleClass}
          >
            {title}
          </Title>
          {children}
        </Col>
        <Col
          {...{ [breakPoint ? breakPoint : 'xs']: 'auto' }}
          className={`text${breakPoint ? `-${breakPoint}` : ''}-right`}
        >
          {endEl}
        </Col>
      </Row>
    ) : (
      <Title breakPoint={breakPoint} titleTag={titleTag} className={titleClass}>
        {title}
      </Title>
    )}
  </Card.Header>
);

Title.propTypes = {
  breakPoint: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl', 'xxl']),
  titleTag: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  className: PropTypes.string,
  children: PropTypes.node
};

Title.defaultProps = { titleTag: 'h5' };

FalconCardHeader.propTypes = {
  title: PropTypes.node.isRequired,
  light: PropTypes.bool,
  breakPoint: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl', 'xxl']),
  endEl: PropTypes.node,
  titleTag: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  titleClass: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node
};

export default FalconCardHeader;
