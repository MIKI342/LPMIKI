import { useMemo } from 'react';

export const useCategoryLogic = (groupedProducts, isSmallScreen, showAllCategories) => {
  const allDynamicCategories = useMemo(() => {
    const dynamicCategories = Object.keys(groupedProducts).map((key) => ({
      name: key,
      data: groupedProducts[key],
    }));
    // Agregar "Trámites" como una categoría al final de la lista
    dynamicCategories.push({
      name: 'Trámites',
      data: [], // No tiene productos asociados
    });
    return dynamicCategories;
  }, [groupedProducts]);

  const mainDynamicCategories = useMemo(() => {
    return allDynamicCategories.filter(
      (category) => category.name.toLowerCase() === 'vape'
    );
  }, [allDynamicCategories]);

  const displayedDynamicCategories = useMemo(() => {
    if (isSmallScreen) {
      return showAllCategories ? allDynamicCategories : mainDynamicCategories;
    }
    return allDynamicCategories;
  }, [isSmallScreen, showAllCategories, allDynamicCategories, mainDynamicCategories]);

  return { allDynamicCategories, mainDynamicCategories, displayedDynamicCategories };
};

