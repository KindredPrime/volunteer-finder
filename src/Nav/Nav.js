import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import VolunteerContext from '../VolunteerContext';
import './Nav.css';

class Nav extends Component {
  static contextType = VolunteerContext;

  handleLogout = (e) => {
    e.preventDefault();

    const { logoutUser } = this.context;
    logoutUser();
  }

  render() {
    const { user } = this.context;

    return (
      <div className="Nav">
        <nav>
          <NavLink exact to="/">Home</NavLink>
          {user
            ? <Link to="" onClick={this.handleLogout}>Logout</Link>
            : <>
              <NavLink to="/login">Login</NavLink>
              <NavLink to="/signup">Sign Up</NavLink>
            </>}
        </nav>
      </div>
    );
  }
}

export default Nav;