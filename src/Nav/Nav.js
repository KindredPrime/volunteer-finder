import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import VolunteerContext from '../VolunteerContext';
import './Nav.css';

class Nav extends Component {
  static contextType = VolunteerContext;

  state = {
    expanded: false
  };

  /*handleLogout = (e) => {
    e.preventDefault();

    const { logoutUser } = this.context;
    logoutUser();
  }*/

  render() {
    //const { user } = this.context;
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
            {/*user
              ? <>
                <NavLink to="/add-org">Add Organization</NavLink>
                <NavLink to="/account">Account</NavLink>
                <Link to="" onClick={this.handleLogout}>Logout</Link>
              </>
              : <>
                <NavLink to="/login">Login</NavLink>
                <NavLink to="/signup">Sign Up</NavLink>
              </>*/}
            <NavLink to="/add-org">Add Organization</NavLink>
            <NavLink to="/account">Account</NavLink>
          </div>
        )}
      </nav>
    );
  }
}

export default Nav;