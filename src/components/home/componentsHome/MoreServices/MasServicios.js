// MasServicios.js
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Card, Tab, Nav } from 'react-bootstrap';
import Flex from 'components/common/Flex';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLaptopCode, faFileSignature } from '@fortawesome/free-solid-svg-icons';
import SimpleBarReact from 'simplebar-react';
import tramiteData from 'components/home/componentsHome/MoreServices/data/tramiteData';
import { useServices } from 'context/useServices'; // Usamos el hook del contexto
import ServicesImage from './ServicesImage';

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
  const { services, loading } = useServices(); // Accedemos al contexto

  const handleToggleTab = (tabKey) => {
    setActiveTab((prevTab) => (prevTab === tabKey ? '' : tabKey));
  };

  const combinedData = [
    ...tramiteData.map((item) => ({
      ...item,
      isSimulado: false,
    })),
    ...services.map((item) => ({
      ...item,
      isSimulado: true,
    })),
  ];

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
                <Nav.Link eventKey="electronicos" onClick={() => handleToggleTab('electronicos')}>
                  <TabTitle title="Electrónicos" icon={faLaptopCode} />
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Card.Header>
          <Tab.Content>
            <Tab.Pane eventKey="tramites">
              {loading ? (
                <p className="text-center">Cargando servicios desde la API...</p>
              ) : (
                <ServicesImage data={combinedData} />
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
