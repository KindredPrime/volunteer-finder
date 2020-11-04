import React from 'react';
import Nav from '../Nav/Nav';

function Home() {
  return (
    <div className="Home">
      <Nav />
      <header className="page-title">
        <h1>VolunteerUp</h1>
      </header>

      <section>
        <h2>Find Volunteer Opportunites</h2>
        <p>Users can search for events or organizations by name and cause(s).  The search functions will search for names/causes and tags that match the search terms.</p>
      </section>

      <section>
        <h2>Add Organizations and Events</h2>
        <p>Each organization includes a location, contact info, a website, the cause(s) it’s involved with, and any other tags users want to add.  Each event includes the organization running the event, the location, the date, the cause(s) it’s involved with, and any other tags users add.</p>
      </section>
    </div>
  );
}

export default Home;