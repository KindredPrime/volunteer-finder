import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import VolunteerContext from '../VolunteerContext';
import './Nav.css';

class Nav extends Component {
  static contextType = VolunteerContext;

  state = {
    expanded: false
  };

  render() {
    const { expanded } = this.state;

    return (
      <nav className="Nav">
        <button 
          className="Nav__expander"
          type="button"
          onClick={() => this.setState({
            expanded: !this.state.expanded
          })}
        >
          Menu
        </button>
        {expanded && (
          <div className="Nav__expanded">
            <NavLink exact to="/">Home</NavLink>
            <NavLink to="/org-search">Search Organizations</NavLink>
            <NavLink to="/add-org">Add Organization</NavLink>
          </div>
        )}
      </nav>
    );
  }
}

export default Nav;