import React from 'react';

function ValidationError(props) {
  if (props.message) {
    return (
      <div className="ValidationError">
        <p className="error">{props.message}</p>
      </div>
    );
  }

  return <></>;
}

export default ValidationError;