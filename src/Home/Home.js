import React from 'react';
import Nav from '../Nav/Nav';

function Home() {
  return (
    <div className="Home">
      <Nav />
      <header className="page-title">
        <h1>Welcome to VolunteerUp</h1>
      </header>

      <section>
        <h2>Find Volunteer Organizations</h2>
        <p>
          Search for organizations in the DC metropolitan area by name, cause(s), 
          and any relevant tags.
        </p>
      </section>

      <section>
        <h2>Create an Account to Add Organizations</h2>
        <p>
          Each organization includes a name, contact info, the cause(s) it’s involved with, and any
          other miscellaneous tags.
        </p>
      </section>
    </div>
  );
}

export default Home;