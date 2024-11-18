import React, { useContext, useMemo } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'react-leaflet-markercluster/dist/styles.min.css';
import { useAppContext } from 'Main';
import { ProductContext } from 'context/Context';
import useLocationsByModule from 'hooks/useLocationsByModule';
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

  // Usar el nuevo hook para obtener ubicaciones
  const moduleLocations = useLocationsByModule(products);

  // Coordenadas iniciales basadas en la primera ubicación disponible
  const initialPosition = useMemo(() => {
    const firstLocation = Object.values(moduleLocations)[0]?.locations[0];
    return firstLocation ? [firstLocation.lat, firstLocation.long] : null;
  }, [moduleLocations]);

  // Memorizar el icono para evitar recreaciones
  const markerIcon = useMemo(() => defaultIcon, []);

  // Crear marcadores para todas las ubicaciones
  const markers = useMemo(() => {
    return Object.values(moduleLocations).flatMap(module =>
      module.locations.map((location, index) => (
        <MarkerComponent
          key={`${module.moduloId}-${index}`}
          location={location}
          icon={markerIcon}
        />
      ))
    );
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

  if (!initialPosition) {
    return (
      <FalconComponentCard>
        <FalconComponentCard.Header>
          <div className="text-center">
            <h3>No se encontraron sucursales</h3>
          </div>
        </FalconComponentCard.Header>
        <FalconComponentCard.Body>
          <div className="text-center">
            <p>No hay información de ubicaciones disponible para mostrar en el mapa.</p>
          </div>
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

export default React.memo(Map);
