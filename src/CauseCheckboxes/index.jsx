import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import './index.css';

/*
  Render checkbox inputs for causes
*/
function CauseCheckboxes(props) {
  // checkedCauses is an object where the keys are the names of causes that have been checked, and
  // the values are all set to 'true'
  const { causes, checkedCauses, handleClick, legend } = props;

  const customCheckboxClass = 'CauseCheckboxes__custom-checkbox';

  // Add the checked status to the list of all causes
  const causesWithChecks = causes.map((cause) => {
    return checkedCauses[cause.cause_name]
      ? {
        ...cause,
        checked: true
      }
      : {
        ...cause,
        checked: false
      };
  })

  return (
    <fieldset className="CauseCheckboxes">
      <legend>{legend}</legend>

      {causesWithChecks.map((cause) => (
        <div className="CauseCheckboxes__cause-wrapper" key={cause.id}>
          <label htmlFor={`causes-${cause.id}`}>
            {cause.cause_name}
          </label>
          <div
            className={!cause.checked
              ? customCheckboxClass
              : `${customCheckboxClass} checked`}
          >
            <FontAwesomeIcon
              className="CauseCheckboxes__checkmark"
              icon={faCheck}
            />
          </div>
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