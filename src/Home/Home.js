import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  return (
    <main className="Home">
      <header className="page-title">
        <h1>Welcome to VolunteerFinder</h1>
      </header>

      <p className="Home__statement">
        Looking to volunteer in the DC metropolitan area for causes you believe in, but you're
        having trouble finding volunteer opportunities? VolunteerFinder can help you!
      </p>

      <section>
        <h2>
          <Link to="/org-search" className="Home__header-link">Find Volunteer Organizations</Link>
        </h2>
        <p>
          Search for organizations by name, address, description, and cause(s).
        </p>
      </section>

      <section>
        <h2>
          <Link to="add-org" className="Home__header-link">Add Organizations</Link>
        </h2>
        <p>
          Know of a great organization for volunteering, but you don't see it here? You can add
          it yourself!  To help make sure people can find it, give as much info as you can so it
          will easily show up in searches.
        </p>
      </section>
    </main>
  );
}

export default Home;