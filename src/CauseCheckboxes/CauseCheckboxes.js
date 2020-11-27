import React from 'react';
import PropTypes from 'prop-types';

/*
  Used to render checkboxes for causes
*/
function CauseCheckboxes(props) {
  const { causes, handleClick, legend } = props;

  return (
    <fieldset className="CauseCheckboxes">
      <legend>{legend}</legend>

      {causes.map((cause) => (
        <div key={cause.id}>
          <label htmlFor={`causes-${cause.id}`}>{cause.cause_name}</label>
          <input 
            type="checkbox"
            id={`causes-${cause.id}`}
            name="causes"
            value={cause.cause_name}
            onChange={() => handleClick(cause.cause_name)}
            checked={cause.checked}
          />
        </div>
      ))}
    </fieldset>
  );
}

CauseCheckboxes.propTypes = {
  causes: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    cause_name: PropTypes.string
  })).isRequired,
  handleClick: PropTypes.func.isRequired,
  legend: PropTypes.string.isRequired
}

export default CauseCheckboxes;