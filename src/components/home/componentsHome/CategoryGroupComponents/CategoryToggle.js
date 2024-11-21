// CategoryToggle.js
import React from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const CategoryToggle = ({ showAllCategories, toggleCategories }) => {
  return (
    <div className="text-center mt-3">
      <div
        onClick={toggleCategories}
        className="toggle-categories"
        style={{ display: 'inline-flex', alignItems: 'center', cursor: 'pointer' }}
      >
        {showAllCategories ? 'Ver menos' : 'Ver todas las categorías'}
        <span
          className="toggle-icon"
          style={{ marginLeft: '8px', display: 'flex', alignItems: 'center' }}
        >
          {showAllCategories ? <FaChevronUp /> : <FaChevronDown />}
        </span>
      </div>
    </div>
  );
};

export default CategoryToggle;
