import React from 'react';
import './ValidationError.css';

function ValidationError(props) {
  if (props.message) {
    return (
      <div className="ValidationError">
        <p>{props.message}</p>
      </div>
    );
  }

  return <></>;
}

export default ValidationError;