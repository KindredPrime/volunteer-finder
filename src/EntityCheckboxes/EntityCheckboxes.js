import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

/*
  Used to render checkboxes for either causes or tags
*/
function EntityCheckboxes(props) {
  const { entities, handleClick, type } = props;

  return (
    <fieldset className="EntityCheckboxes">
      <legend>{_.capitalize(type)} (all are selected by default)</legend>

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
  type: PropTypes.string.isRequired
}

export default EntityCheckboxes;