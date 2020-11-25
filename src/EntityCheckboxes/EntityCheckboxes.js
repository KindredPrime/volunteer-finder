import React from 'react';
import PropTypes from 'prop-types';

/*
  Used to render checkboxes for causes
*/
function EntityCheckboxes(props) {
  const { entities, handleClick, type, legend } = props;

  return (
    <fieldset className="EntityCheckboxes">
      <legend>{legend}</legend>

      {entities.map((entity) => (
        <div key={entity.id}>
          <label htmlFor={`${type}-${entity.id}`}>{entity.name}</label>
          <input 
            type="checkbox"
            id={`${type}-${entity.id}`}
            name={type}
            value={entity.name}
            onClick={() => handleClick(entity.name)}
          />
        </div>
      ))}
    </fieldset>
  );
}

EntityCheckboxes.propTypes = {
  entities: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string
  })).isRequired,
  handleClick: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  legend: PropTypes.string.isRequired
}

export default EntityCheckboxes;