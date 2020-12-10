import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import './index.css';

class Nav extends Component {
  render() {
    const { expanded, handleExpander } = this.props;

    return (
      <nav className={expanded ? "Nav expanded" : "Nav"} >
        <button
          className={expanded ? "Nav__expander expanded" : "Nav__expander"}
          type="button"
          onClick={() => handleExpander()}
        >
          <FontAwesomeIcon icon={faBars} />
        </button>

        <div className="links">
          <NavLink
            exact
            to="/"
            onClick={() => handleExpander()}
          >
            Home
          </NavLink>

          <NavLink
            to="/org-search"
            onClick={() => handleExpander()}
          >
            Search Organizations
          </NavLink>

          <NavLink
            to="/add-org"
            onClick={() => handleExpander()}
          >
            Add Organization
          </NavLink>
        </div>
      </nav>
    );
  }
}

export default Nav;