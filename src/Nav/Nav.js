import React from 'react';
import { NavLink } from 'react-router-dom';
import './Nav.css';

function Nav() {
  return (
    <div className="Nav">
      <nav>
        <NavLink to="/">Home</NavLink>
      </nav>
    </div>
  );
}

export default Nav;