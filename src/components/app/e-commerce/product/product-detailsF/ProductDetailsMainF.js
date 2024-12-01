import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const ProductDetailsMain = ({ product }) => {
  const {
    nombreProducto,
    descripcionProducto,
    precioUnitario,
    precioMayoreo,
    superPrecio,
    cantidad,
    categoria
  } = product;

  // Crear un array de precios para determinar el más barato
  const precios = [
    { nombre: 'Precio Unitario', precio: precioUnitario },
    { nombre: 'Super Precio', precio: superPrecio },
    { nombre: 'Precio Mayoreo', precio: precioMayoreo }
  ];

  // Filtrar precios disponibles (no nulos ni indefinidos)
  const preciosDisponibles = precios.filter(({ precio }) => precio != null);

  // Ordenar precios de menor a mayor
  const preciosOrdenados = preciosDisponibles.sort((a, b) => a.precio - b.precio);

  return (
    <>
      <h5>{nombreProducto}</h5>
      {categoria && (
        <Link to="#!" className="fs-10 mb-2 d-block">
          {categoria}
        </Link>
      )}
      {descripcionProducto && <p className="fs-10">{descripcionProducto}</p>}

      <h4>
        {/* Mostrar los precios disponibles de menor a mayor */}
        {preciosOrdenados.map(({ nombre, precio }, index) => (
          <div key={nombre} className="mb-2">
            <span
              className={`${
                precio === preciosOrdenados[0].precio ? 'text-warning' : 'fs-10'
              }`}
            >
              {`${nombre}: `}
              <strong>${precio}</strong>
            </span>
          </div>
        ))}
      </h4>

      {/* Mostrar el Stock con la cantidad disponible */}
      <p className="fs-10">
        Stock:{' '}
        <strong
          className={`${
            cantidad > 0 ? 'text-success' : 'text-danger'
          }`}
        >
          {cantidad > 0 ? `Disponible (${cantidad})` : 'Agotado'}
        </strong>
      </p>
    </>
  );
};

ProductDetailsMain.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    nombreProducto: PropTypes.string.isRequired,
    descripcionProducto: PropTypes.string,
    precioUnitario: PropTypes.number.isRequired,
    precioMayoreo: PropTypes.number,
    superPrecio: PropTypes.number,
    cantidad: PropTypes.number.isRequired,
    categoria: PropTypes.string
  }).isRequired
};

export default ProductDetailsMain;
