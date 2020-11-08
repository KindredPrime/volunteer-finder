import React from 'react';
import PropTypes from 'prop-types';

function CauseList(props) {
  return (
    <div className="CauseList">
      <ul>
        {props.causes.map((cause) => (
          <li key={cause.id}>
            {cause.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

CauseList.propTypes = {
  causes: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string
  })).isRequired
};

export default CauseList;