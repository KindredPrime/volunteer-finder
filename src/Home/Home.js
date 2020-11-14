import React from 'react';
import Nav from '../Nav/Nav';

function Home() {
  return (
    <div className="Home">
      <Nav />
      <main>
        <header className="page-title">
          <h1>Welcome to VolunteerFinder</h1>
        </header>

        <p className="Home__statement">
          Looking to volunteer in the DC metropolitan area for causes you beleive in, but you're 
          having trouble finding volunteer opportunities? VolunteerFinder can help you!
        </p>

        <section>
          <h2>Find Volunteer Organizations</h2>
          <p>
            Search for organizations by name, address, description, cause(s), and any relevant 
            tags.
          </p>
        </section>

        <section>
          <h2>Add Organizations</h2>
          <p>
            Know of a great organization for volunteering, but you don't see it here? You can 
            create an account and add it yourself!  To help make sure users can find it, give as 
            much info as you can, and assign tags to it so it will easily show up in searches.
          </p>
        </section>
      </main>
    </div>
  );
}

export default Home;