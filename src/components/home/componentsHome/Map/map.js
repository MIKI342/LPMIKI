// Archivo: Map.js

import React, { useContext, useMemo } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'react-leaflet-markercluster/dist/styles.min.css';
import { useAppContext } from 'Main';
import { ProductContext } from 'context/Context';
import useGroupedByModule from 'hooks/useGroupedByModule';
import FalconComponentCard from 'components/common/FalconComponentCard';
import MarkerComponent from './MarkerComponent';
import 'components/home/componentsHome/css/Map.css';

const defaultIcon = L.icon({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  shadowSize: [41, 41],
});

const Map = () => {
  const { config } = useAppContext();
  const { isDark } = config;

  // Obtener productos y estado de carga desde ProductContext
  const { products, loading } = useContext(ProductContext);

  // Agrupar productos por módulo y obtener información de ubicaciones
  const moduleLocations = useGroupedByModule(products);

  // Coordenadas iniciales predeterminadas
  const defaultPosition = [19.715690900326546, -99.95523253068207];

  // Obtener las coordenadas de la primera ubicación disponible
  const initialPosition = useMemo(() => {
    const firstLocation = Object.values(moduleLocations)[0];
    return firstLocation ? [firstLocation.lat, firstLocation.long] : defaultPosition;
  }, [moduleLocations, defaultPosition]);

  // Memorizar el icono para evitar recreaciones
  const markerIcon = useMemo(() => defaultIcon, []);

  // Memorizar las posiciones de los marcadores
  const markers = useMemo(() => {
    return Object.values(moduleLocations).map(location => (
      <MarkerComponent key={location.moduloId} location={location} icon={markerIcon} />
    ));
  }, [moduleLocations, markerIcon]);

  if (loading) {
    return (
      <FalconComponentCard>
        <FalconComponentCard.Header>
          <div className="text-center">
            <h3>Cargando Sucursales</h3>
          </div>
        </FalconComponentCard.Header>
        <FalconComponentCard.Body>
          <div className="loading-container">Loading...</div>
        </FalconComponentCard.Body>
      </FalconComponentCard>
    );
  }

  return (
    <FalconComponentCard>
      <FalconComponentCard.Header>
        <div className="text-center">
          <h3>Conoce nuestras sucursales</h3>
          <p className="map-description">
            Encuentra la sucursal más cercana a ti con nuestro mapa interactivo.
            <br />
            <span className="map-highlight">¡Visítanos hoy mismo!</span>
          </p>
        </div>
      </FalconComponentCard.Header>
      <FalconComponentCard.Body>
        <div className="map-wrapper">
          <MapContainer
            zoom={10}
            minZoom={10}
            maxZoom={18}
            zoomSnap={0.5}
            center={initialPosition}
            className="map-container"
          >
            {/* Usando CartoDB Positron como capa de estilo */}
            <TileLayer
              url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
              attribution='&copy; <a href="https://carto.com/attributions">CARTO</a> contributors'
            />

            <MarkerClusterGroup chunkedLoading={true} spiderfyOnMaxZoom={false}>
              {markers}
            </MarkerClusterGroup>
          </MapContainer>
        </div>
      </FalconComponentCard.Body>
    </FalconComponentCard>
  );
};

// Exportar componente memorizado
export default React.memo(Map);
