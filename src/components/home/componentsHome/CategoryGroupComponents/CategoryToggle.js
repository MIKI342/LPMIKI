import React from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const CategoryToggle = ({ showAllCategories, toggleCategories }) => {
  return (
    <div className="text-center mt-3">
      <div onClick={toggleCategories} className="toggle-categories">
        {showAllCategories ? 'Ver menos' : 'Ver todas las categorías'}
        <div className={`toggle-icon ${showAllCategories ? 'open' : ''}`}>
          {showAllCategories ? <FaChevronUp /> : <FaChevronDown />}
        </div>
      </div>
    </div>
  );
};

export default CategoryToggle;
