import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Card, Tab, Nav } from 'react-bootstrap';
import Flex from 'components/common/Flex';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLaptopCode, faFileSignature, faTools } from '@fortawesome/free-solid-svg-icons';
import SimpleBarReact from 'simplebar-react';
import tramiteData from 'components/home/componentsHome/MoreServices/tramites/data/tramiteData';
import { useServices } from 'context/useServices'; // Usamos el hook del contexto para servicios
import { useRefacciones } from 'context/useRefacciones'; // Usamos el hook del contexto para refacciones
import ServicesImage from './tramites/ServicesImage';
import RefaccionesImage from './refacciones/RefaccionesImage';


const TabTitle = ({ title, icon }) => (
  <Flex className="p-3 ps-2 text-start cursor-pointer gap-1">
    <Flex className="flex-column flex-between-center">
      <FontAwesomeIcon icon={icon} className="fs-4 text-primary mt-auto" />
    </Flex>
    <div className="ms-2">
      <h6 className="text-700 fs-30 text-nowrap mb-1">{title}</h6>
    </div>
  </Flex>
);

const MasServicios = ({ className }) => {
  const [activeTab, setActiveTab] = useState('');
  const { services, loading: loadingServices } = useServices(); // Accedemos al contexto de servicios
  const { refacciones, loading: loadingRefacciones } = useRefacciones(); // Accedemos al contexto de refacciones

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
      <Tab.Container id="service-tab" activeKey={activeTab} transition={false}>
        <SimpleBarReact>
          <Card.Header>
            <Nav className="nav-tabs">
              <Nav.Item>
                <Nav.Link eventKey="tramites" onClick={() => handleToggleTab('tramites')}>
                  <TabTitle title="Trámites" icon={faFileSignature} />
                </Nav.Link>
              </Nav.Item>
             
              <Nav.Item>
                <Nav.Link eventKey="refacciones" onClick={() => handleToggleTab('refacciones')}>
                  <TabTitle title="Refacciones" icon={faTools} />
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Card.Header>
          <Tab.Content>
            <Tab.Pane eventKey="tramites">
              {loadingServices ? (
                <p className="text-center">Cargando servicios desde la API...</p>
              ) : (
                <ServicesImage data={combinedServiceData} />
              )}
            </Tab.Pane>
            <Tab.Pane eventKey="refacciones">
              {loadingRefacciones ? (
                <p className="text-center">Cargando refacciones desde la API...</p>
              ) : (
                <RefaccionesImage data={combinedRefaccionData} />
              )}
            </Tab.Pane>
          </Tab.Content>
        </SimpleBarReact>
      </Tab.Container>
    </Card>
  );
};

MasServicios.propTypes = {
  className: PropTypes.string,
};

export default MasServicios;
