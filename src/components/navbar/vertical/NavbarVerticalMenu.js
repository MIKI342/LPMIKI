import React, { useState, useMemo } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { Collapse, Nav } from 'react-bootstrap';
import { NavLink, useLocation } from 'react-router-dom';
import NavbarVerticalMenuItem from './NavbarVerticalMenuItem';
import { useAppContext } from 'Main';

const NavbarVerticalMenu = ({ routes }) => {
  const {
    config: { showBurgerMenu, isNavbarVerticalCollapsed },
    setConfig,
  } = useAppContext();

  const handleNavItemClick = () => {
    if (showBurgerMenu) {
      setConfig('showBurgerMenu', false);
    }
    if (!isNavbarVerticalCollapsed) {
      setConfig('isNavbarVerticalCollapsed', true);
    }
  };

  const validRoutes = useMemo(() => (Array.isArray(routes) ? routes : []), [routes]);

  const CollapseItems = ({ route }) => {
    const { pathname } = useLocation();

    const openCollapse = (children = []) => {
      const checkLink = (child) => {
        if (child.to === pathname) {
          return true;
        }
        return (
          Object.prototype.hasOwnProperty.call(child, 'children') &&
          child.children.some(checkLink)
        );
      };
      return children.some(checkLink);
    };

    const [open, setOpen] = useState(openCollapse(route.children));

    return (
      <Nav.Item as="li">
        <Nav.Link
          onClick={() => setOpen(!open)}
          className={classNames('dropdown-indicator cursor-pointer', {
            'text-500': !route.active,
          })}
          aria-expanded={open}
        >
          <NavbarVerticalMenuItem route={route} />
        </Nav.Link>
        <Collapse in={open} transition={false}>
          <Nav className="flex-column nav" as="ul">
            <NavbarVerticalMenu routes={route.children || []} />
          </Nav>
        </Collapse>
      </Nav.Item>
    );
  };

  CollapseItems.propTypes = {
    route: PropTypes.shape({
      name: PropTypes.string.isRequired,
      icon: PropTypes.string,
      children: PropTypes.array.isRequired,
      active: PropTypes.bool,
    }).isRequired,
  };

  return (
    <>
      {validRoutes.map((route) => {
        if (!route.children) {
          return (
            <Nav.Item as="li" key={route.name} onClick={handleNavItemClick}>
              <NavLink
                end={route.exact}
                to={route.to}
                onClick={() =>
                  route.name === 'Modal' ? setConfig('openAuthModal', true) : undefined
                }
                className={({ isActive }) =>
                  classNames('nav-link', { active: isActive && route.to !== '#!' })
                }
              >
                <NavbarVerticalMenuItem route={route} />
              </NavLink>
            </Nav.Item>
          );
        }
        return <CollapseItems route={route} key={route.name} />;
      })}
    </>
  );
};

NavbarVerticalMenu.propTypes = {
  routes: PropTypes.arrayOf(PropTypes.shape(NavbarVerticalMenuItem.propTypes)).isRequired,
};

export default React.memo(NavbarVerticalMenu);
