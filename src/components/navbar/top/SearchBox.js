/**
 * Componente SearchBox
 *
 * Este componente permite a los usuarios buscar productos en tiempo real y muestra resultados en un menú desplegable
 * que se actualiza en función de las entradas del usuario. Utiliza `Fuse.js` para implementar una búsqueda difusa.
 * 
 * Dependencias:
 * - `react-bootstrap`: Para el formulario, el menú desplegable y otros componentes de la interfaz de usuario.
 * - `Fuse.js`: Para realizar la búsqueda difusa en los productos.
 * - `context/Context`: Contexto de productos que proporciona los datos del catálogo de productos.
 * 
 * Ejemplo de uso:
 * ```jsx
 * <SearchBox />
 * ```
 */

import React, { Fragment, useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Form, Dropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Fuse from 'fuse.js';
import { Link } from 'react-router-dom';
import Avatar from 'components/common/Avatar';
import { isIterableArray } from 'helpers/utils';
import Flex from 'components/common/Flex';
import FalconCloseButton from 'components/common/FalconCloseButton';
import { ProductContext } from 'context/Context';

const MediaSearchContent = ({ item }) => (
  <Dropdown.Item className="px-x1 py-2" as={Link} to={`/e-commerce/product/product-detailsF/${item.id}`}>
    <Flex alignItems="center">
      {item.file && (
        <div className="file-thumbnail">
          <img src={item.img} alt="" className={item.imgAttrs.class} />
        </div>
      )}
      {item.icon && (
        <Avatar src={item.icon.img} size="l" className={item.icon.status} />
      )}
      <div className="ms-2">
        <h6 className="mb-0">{item.nombreProducto}</h6>
        <p className="fs-11 mb-0">{item.descripcionProducto}</p>
      </div>
    </Flex>
  </Dropdown.Item>
);

const SearchBox = () => {
  const { products, loading } = useContext(ProductContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchInputValue, setSearchInputValue] = useState('');
  const [resultItem, setResultItem] = useState([]);

  const fuseJsOptions = {
    includeScore: true,
    keys: ['nombreProducto', 'descripcionProducto']
  };

  useEffect(() => {
    if (searchInputValue) {
      const fuse = new Fuse(products, fuseJsOptions);
      const results = fuse.search(searchInputValue).map(result => result.item);
      setResultItem(results);
      setDropdownOpen(isIterableArray(results));
    } else {
      setResultItem([]);
      setDropdownOpen(false);
    }
  }, [searchInputValue, products]);

  if (loading) {
    return <p>Cargando productos...</p>;
  }

  return (
    <Dropdown
      show={dropdownOpen}
      className="search-box"
      onToggle={() => setDropdownOpen(!dropdownOpen)}
    >
      <Dropdown.Toggle as="div" className="dropdown-caret-none">
        <Form className="position-relative">
          <Form.Control
            type="search"
            placeholder="Buscar productos..."
            aria-label="Buscar productos"
            className="rounded-pill search-input"
            value={searchInputValue}
            onChange={({ target }) => setSearchInputValue(target.value)}
          />
          <FontAwesomeIcon icon="search" className="position-absolute text-400 search-box-icon" />
          {searchInputValue && (
            <div className="search-box-close-btn-container">
              <FalconCloseButton
                size="sm"
                noOutline
                className="fs-11"
                onClick={() => {
                  setSearchInputValue('');
                  setDropdownOpen(false);
                }}
              />
            </div>
          )}
        </Form>
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <div className="scrollbar py-3" style={{ maxHeight: '24rem' }}>
          {isIterableArray(resultItem) && resultItem.length > 0 ? (
            resultItem.map(product => (
              <MediaSearchContent item={product} key={product.id} />
            ))
          ) : (
            <p className="text-center">No se encontraron productos.</p>
          )}
        </div>
      </Dropdown.Menu>
    </Dropdown>
  );
};

MediaSearchContent.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    nombreProducto: PropTypes.string.isRequired,
    descripcionProducto: PropTypes.string,
    img: PropTypes.string,
    icon: PropTypes.shape({
      img: PropTypes.string,
      status: PropTypes.string
    }),
    file: PropTypes.bool,
    imgAttrs: PropTypes.shape({
      class: PropTypes.string
    })
  }).isRequired
};

export default SearchBox;
