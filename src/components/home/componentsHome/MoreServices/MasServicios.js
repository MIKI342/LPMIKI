import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Card, Col, Row, Tab, Nav, Form } from 'react-bootstrap';
import Flex from 'components/common/Flex';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLaptopCode, faMobileAlt, faFileSignature } from '@fortawesome/free-solid-svg-icons';
import MasServiciosTable from 'components/home/componentsHome/MoreServices/MasServiciosTable';

import SimpleBarReact from 'simplebar-react';
import classNames from 'classnames';

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

const MasServicios = ({ tableData, className }) => {
  const [activeTab, setActiveTab] = useState(''); // Estado para controlar la pestaña activa

  const handleToggleTab = (tabKey) => {
    // Cambia la pestaña activa o la oculta si ya está seleccionada
    setActiveTab(prevTab => (prevTab === tabKey ? '' : tabKey));
  };

  return (
    <Card className={classNames(className, 'overflow-hidden')}>
      <Tab.Container id="service-tab" activeKey={activeTab}>
        <SimpleBarReact>
          <Card.Header className="p-0">
            <Nav className="nav-tabs service-tab border-0 flex-nowrap">
              <Nav.Item>
                <Nav.Link className="mb-0" eventKey="electronicos" onClick={() => handleToggleTab('electronicos')}>
                  <TabTitle
                    title="Servicios Electrónicos"
                    icon={faLaptopCode}
                  />
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link className="mb-0" eventKey="telefonia" onClick={() => handleToggleTab('telefonia')}>
                  <TabTitle
                    title="Servicios de Telefonía"
                    icon={faMobileAlt}
                  />
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link className="mb-0" eventKey="tramites" onClick={() => handleToggleTab('tramites')}>
                  <TabTitle
                    title="Trámites"
                    icon={faFileSignature}
                  />
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Card.Header>
        </SimpleBarReact>

        <Card.Body className="p-0">
          <Tab.Content>
            {activeTab === 'electronicos' && (
              <Tab.Pane unmountOnExit eventKey="electronicos">
                <MasServiciosTable tableData={tableData ? tableData.slice(0, 4) : []} />
              </Tab.Pane>
            )}
            {activeTab === 'telefonia' && (
              <Tab.Pane unmountOnExit eventKey="telefonia">
                <MasServiciosTable tableData={tableData ? tableData.slice(4, 8) : []} />
              </Tab.Pane>
            )}
            {activeTab === 'tramites' && (
              <Tab.Pane unmountOnExit eventKey="tramites">
                <MasServiciosTable tableData={tableData ? tableData.slice(8, 12) : []} />
              </Tab.Pane>
            )}
          </Tab.Content>
        </Card.Body>
      </Tab.Container>
    </Card>
  );
};

TabTitle.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.object.isRequired,
};

MasServicios.propTypes = {
  tableData: PropTypes.arrayOf(PropTypes.object).isRequired,
  className: PropTypes.string
};

export default MasServicios;
