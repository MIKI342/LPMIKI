/**
 * PageHeader Component
 * 
 * Este componente es un encabezado de página (`Card`) que muestra un título principal, subtítulo opcional, descripción,
 * e imagen de fondo. Es ideal para encabezados de secciones importantes de la aplicación.
 * 
 * Propiedades:
 * - `title`: Título principal de la sección (obligatorio).
 * - `preTitle`: Subtítulo opcional que aparece sobre el título.
 * - `titleTag`: Etiqueta HTML para el título (por defecto `h3`).
 * - `description`: Descripción en formato HTML que se muestra bajo el título, usando `dangerouslySetInnerHTML` para formateo.
 * - `image`: Imagen de fondo del encabezado, mostrada en pantallas medianas y grandes.
 * - `col`: Propiedades de columna de Bootstrap para ajustar el ancho del contenido.
 * - `children`: Elementos secundarios que se muestran bajo la descripción.
 * 
 * Ejemplo de uso:
 * ```jsx
 * <PageHeader
 *   title="Bienvenido"
 *   preTitle="Dashboard"
 *   description="<strong>Descripción</strong> con formato"
 *   image="/path/to/image.jpg"
 * />
 * ```
 */

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Card, Col, Row } from 'react-bootstrap';
import Background from './Background';
import corner4 from 'assets/img/illustrations/corner-4.png';
import createMarkup from 'helpers/createMarkup';

const PageHeader = ({
  title,
  preTitle,
  titleTag: TitleTag,
  description,
  image,
  col,
  children,
  ...rest
}) => (
  <Card {...rest}>
    <Background
      image={image}
      className="bg-card d-none d-sm-block"
      style={{
        borderTopRightRadius: '0.375rem',
        borderBottomRightRadius: '0.375rem'
      }}
    />
    <Card.Body className="position-relative">
      <Row>
        <Col {...col}>
          {preTitle && <h6 className="text-600">{preTitle}</h6>}
          <TitleTag className="mb-0">{title}</TitleTag>
          {description && (
            <p
              className={classNames('mt-2', { 'mb-0': !children })}
              dangerouslySetInnerHTML={createMarkup(description)}
            />
          )}
          {children}
        </Col>
      </Row>
    </Card.Body>
  </Card>
);

PageHeader.propTypes = {
  title: PropTypes.string.isRequired,
  preTitle: PropTypes.string,
  titleTag: PropTypes.string,
  description: PropTypes.string,
  col: PropTypes.shape(Col.propTypes),
  image: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node
};

PageHeader.defaultProps = { col: { lg: 8 }, image: corner4, titleTag: 'h3' };

export default PageHeader;
