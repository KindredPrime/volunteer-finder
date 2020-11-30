import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './Nav.css';

class Nav extends Component {
  render() {
    const { expanded, handleExpander } = this.props;

    return (
      <nav className="Nav">
        <button 
          className="Nav__expander"
          type="button"
          onClick={() => handleExpander()}
        >
          Menu
        </button>

        {expanded && (
          <div className="Nav__expanded">
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
        )}
      </nav>
    );
  }
}

export default Nav;