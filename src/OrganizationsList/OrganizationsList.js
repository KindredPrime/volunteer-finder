import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './OrganizationsList.css';

function OrganizationsList(props) {
  return (
    <div className="OrganizationsList">
      <ul>
        {props.orgs.map((org) => (
          <li key={org.id}>
            <Link to={`/org/${org.id}`}>{org.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

OrganizationsList.propTypes = {
  orgs: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    website: PropTypes.string,
    phone: PropTypes.string,
    email: PropTypes.string,
    address: PropTypes.string,
    description: PropTypes.string,
    causes: PropTypes.arrayOf(PropTypes.string)
  })).isRequired
}

export default OrganizationsList;