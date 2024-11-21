import { useMemo } from 'react';

export const useCategoryLogic = (groupedProducts, isSmallScreen, showAllCategories) => {
  const allDynamicCategories = useMemo(() => {
    const dynamicCategories = Object.keys(groupedProducts).map((key) => ({
      name: key,
      data: groupedProducts[key],
    }));
    // Agregar "Trámites" como una categoría
    dynamicCategories.push({
      name: 'Trámites',
      data: [], // No tiene productos asociados
    });
    return dynamicCategories;
  }, [groupedProducts]);

  const mainDynamicCategories = useMemo(() => {
    // Filtrar las categorías principales: "Vape" y "Trámites"
    return allDynamicCategories.filter(
      (category) =>
        category.name.toLowerCase() === 'vape' || category.name.toLowerCase() === 'trámites'
    );
  }, [allDynamicCategories]);

  const displayedDynamicCategories = useMemo(() => {
    if (isSmallScreen) {
      // Mostrar solo las categorías principales en pantallas pequeñas
      return showAllCategories ? allDynamicCategories : mainDynamicCategories;
    }
    return allDynamicCategories;
  }, [isSmallScreen, showAllCategories, allDynamicCategories, mainDynamicCategories]);

  return { allDynamicCategories, mainDynamicCategories, displayedDynamicCategories };
};
