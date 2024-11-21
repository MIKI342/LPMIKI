// CategoryToggle.js
import React from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import PropTypes from 'prop-types';

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

CategoryToggle.propTypes = {
  showAllCategories: PropTypes.bool.isRequired,
  toggleCategories: PropTypes.func.isRequired,
};

// Memoizar el componente para evitar re-renderizados innecesarios
export default React.memo(CategoryToggle);
