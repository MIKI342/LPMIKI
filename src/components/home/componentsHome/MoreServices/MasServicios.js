  import React, { useState } from 'react';
  import PropTypes from 'prop-types';
  import { Card, Tab, Nav } from 'react-bootstrap';
  import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
  import { faFileSignature, faMobileAlt } from '@fortawesome/free-solid-svg-icons';
  import tramiteData from 'components/home/componentsHome/MoreServices/tramites/data/tramiteData';
  import { useServices } from 'context/useServices';
  import { useRefacciones } from 'context/useRefacciones';
  import ServicesImage from './tramites/ServicesImage';
  import RefaccionesImage from './refacciones/RefaccionesImage';

  // Animaciones CSS
  const styles = `
    @keyframes glow {
      0% {
        box-shadow: 0px 0px 10px rgba(0, 123, 255, 0.2);
      }
      50% {
        box-shadow: 0px 0px 20px rgba(0, 123, 255, 0.6);
      }
      100% {
        box-shadow: 0px 0px 10px rgba(0, 123, 255, 0.2);
      }
    }
    .glow-icon {
      animation: glow 2s infinite;
    }
  `;

  const TabTitle = ({ title, icon, isActive }) => (
    <div
      className={`d-flex flex-column align-items-center justify-content-center`}
      style={{
        transition: 'all 0.3s ease',
        transform: isActive ? 'scale(1.1)' : 'scale(1)',
      }}
    >
      <FontAwesomeIcon
        icon={icon}
        className={`fs-4 mb-1 glow-icon`}
        style={{
          color: '#007bff',
          boxShadow: '0px 0px 15px rgba(0, 123, 255, 0.5)',
        }}
      />
      <h6
        className={`mb-1 text-center fs-8`}
        style={{
          color: isActive ? '#000' : '#6c757d',
          fontWeight: isActive ? 'bold' : 'normal',
          textShadow: '0px 4px 6px rgba(0, 123, 255, 0.3)',
        }}
      >
        {title}
      </h6>
    </div>
  );

  const MasServicios = ({ className }) => {
    const [activeTab, setActiveTab] = useState('');
    const { services, loading: loadingServices } = useServices();
    const { refacciones, loading: loadingRefacciones } = useRefacciones();

    const handleToggleTab = (tabKey) => {
      setActiveTab((prevTab) => (prevTab === tabKey ? '' : tabKey));
    };

    const combinedServiceData = [
      ...tramiteData.map((item) => ({
        ...item,
        isSimulado: false,
      })),
      ...services.map((item) => ({
        ...item,
        isSimulado: true,
      })),
    ];

    const combinedRefaccionData = refacciones.map((item) => ({
      ...item,
      isSimulado: true,
    }));

    return (
      <Card className={className}>
        {/* Inline CSS for animations */}
        <style>{styles}</style>

        {/* Título del componente */}
        <Card.Header className="text-center pb-1 pt-2">
          <h4 className="fw-bold mb-1" style={{ color: '#333', fontSize: '1.3rem' }}>
            Conoce más sobre nuestros servicios
          </h4>
        </Card.Header>

        <Tab.Container id="service-tab" activeKey={activeTab}>
          <Card.Header>
            <Nav className="d-flex flex-row justify-content-around">
              <Nav.Item>
                <Nav.Link
                  eventKey="tramites"
                  onClick={() => handleToggleTab('tramites')}
                  className={`text-center`}
                  style={{ width: '150px' }}
                >
                  <TabTitle
                    title="Trámites"
                    icon={faFileSignature}
                    isActive={activeTab === 'tramites'}
                  />
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  eventKey="refacciones"
                  onClick={() => handleToggleTab('refacciones')}
                  className={`text-center`}
                  style={{ width: '150px' }}
                >
                  <TabTitle
                    title="RefacStore"
                    icon={faMobileAlt}
                    isActive={activeTab === 'refacciones'}
                  />
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Card.Header>
          <Tab.Content>
            {activeTab === 'tramites' && (
              <Tab.Pane eventKey="tramites">
                {loadingServices ? (
                  <p className="text-center">Cargando servicios desde la API...</p>
                ) : (
                  <ServicesImage data={combinedServiceData} />
                )}
              </Tab.Pane>
            )}
            {activeTab === 'refacciones' && (
              <Tab.Pane eventKey="refacciones">
                {loadingRefacciones ? (
                  <p className="text-center">Cargando refacciones desde la API...</p>
                ) : (
                  <RefaccionesImage data={combinedRefaccionData} />
                )}
              </Tab.Pane>
            )}
          </Tab.Content>
        </Tab.Container>
      </Card>
    );
  };

  MasServicios.propTypes = {
    className: PropTypes.string,
  };

  export default MasServicios;
