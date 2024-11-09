// src/components/home/componentsHome/MarkerComponent.js

import React from 'react';
import { Marker, Popup } from 'react-leaflet';
import PropTypes from 'prop-types';

/**
 * MarkerComponent Component
 *
 * Este componente representa un marcador en el mapa.
 * Está memorizado para evitar re-renderizados innecesarios.
 */
const MarkerComponent = React.memo(({ location, icon }) => (
  <Marker
    key={location.moduloId}
    position={[location.lat, location.long]} // Coordenadas del módulo
    icon={icon}
  >
    <Popup>
      <h6 className="mb-1">{location.moduleName}</h6>
      <p className="m-0 text-500">{location.address}</p>
    </Popup>
  </Marker>
));

MarkerComponent.propTypes = {
  location: PropTypes.shape({
    moduloId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    moduleName: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    lat: PropTypes.number.isRequired,
    long: PropTypes.number.isRequired,
  }).isRequired,
  icon: PropTypes.instanceOf(L.Icon).isRequired,
};

export default MarkerComponent;
