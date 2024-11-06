import { useState, useMemo } from 'react';

const useProductFilter = (products) => {
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  // Filtramos los productos basándonos en la categoría y el estado
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      // Usamos encadenamiento opcional para evitar errores si 'CategoriaProducto' no está definido
      const matchesCategory = categoryFilter === 'all' || product.CategoriaProducto?.nombre === categoryFilter;
      const matchesStatus = statusFilter === 'all' || product.estado === statusFilter;
      return matchesCategory && matchesStatus;
    });
  }, [products, categoryFilter, statusFilter]);

  return { filteredProducts, categoryFilter, statusFilter, setCategoryFilter, setStatusFilter };
};

export default useProductFilter;
