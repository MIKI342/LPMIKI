import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Card, Tab, Nav } from 'react-bootstrap';
import Flex from 'components/common/Flex';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { Carousel } from 'react-bootstrap';
import {
  faLaptopCode,
  faMobileAlt,
  faFileSignature
} from '@fortawesome/free-solid-svg-icons';

import SimpleBarReact from 'simplebar-react';
import classNames from 'classnames';
import tramiteData from 'components/home/componentsHome/MoreServices/data/tramiteData';

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
  const [activeTab, setActiveTab] = useState(''); // Estado para controlar la pestaña activa

  const handleToggleTab = tabKey => {
    setActiveTab(prevTab => (prevTab === tabKey ? '' : tabKey));
  };

  return (
    <Card className={classNames(className, 'overflow-hidden')}>
      {/* Desactivar transición entre pestañas */}
      <Tab.Container id="service-tab" activeKey={activeTab} transition={false}>
        <SimpleBarReact>
          <Card.Header className="p-0">
            <Nav className="nav-tabs service-tab border-0 flex-nowrap">
              <Nav.Item>
                <Nav.Link
                  className="mb-0"
                  eventKey="tramites"
                  onClick={() => handleToggleTab('tramites')}
                >
                  <TabTitle title="Trámites" icon={faFileSignature} />
                </Nav.Link>
              </Nav.Item>

              <Nav.Item>
                <Nav.Link
                  className="mb-0"
                  eventKey="electronicos"
                  onClick={() => handleToggleTab('electronicos')}
                >
                  <TabTitle
                    title="Servicios Electrónicos"
                    icon={faLaptopCode}
                  />
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  className="mb-0"
                  eventKey="telefonia"
                  onClick={() => handleToggleTab('telefonia')}
                >
                  <TabTitle title="Servicios de Telefonía" icon={faMobileAlt} />
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Card.Header>

          {/* Contenido de cada pestaña */}
          <Tab.Content>
            <Tab.Pane eventKey="tramites">
              {/* Aislar el carrusel para evitar el cambio de pestaña al deslizar */}
              <div onTouchStart={e => e.stopPropagation()}>
                <Carousel interval={3000} controls indicators pause="hover">
                  {tramiteData.map((tramite, index) => (
                    <Carousel.Item key={index}>
                      <Link to={`/tramite/${tramite.id}`}>
                        <img
                          src={tramite.mainImageUrl}
                          alt={tramite.nombre}
                          style={{ width: '100%', height: 'auto' }}
                        />
                      </Link>
                    </Carousel.Item>
                  ))}
                </Carousel>
              </div>
            </Tab.Pane>
          </Tab.Content>
        </SimpleBarReact>
      </Tab.Container>
    </Card>
  );
};

TabTitle.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.object.isRequired
};

MasServicios.propTypes = {
  className: PropTypes.string
};

export default MasServicios;
