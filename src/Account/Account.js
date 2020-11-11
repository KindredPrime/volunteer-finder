import React, { Component } from 'react';
import VolunteerContext from '../VolunteerContext';
import Nav from '../Nav/Nav';
import OrganizationsList from '../OrganizationsList/OrganizationsList';
import EventList from '../EventList/EventList';

class Account extends Component {
  static contextType = VolunteerContext;

  render() {
    const { user, orgs, events } = this.context;
    const { email, username, orgsAdded, eventsAdded } = user;

    const fullOrgsAdded = orgsAdded.map((orgName) => orgs.find((org) => org.name === orgName));
    const fullEventsAdded = eventsAdded.map((eventName) => events.find((event) => event.name === eventName))

    return (
      <div className="Account">
        <Nav />

        <header>
          <h1>Account</h1>
        </header>

        <section>
          <header>
            <h2>Account Info</h2>
          </header>

          <p>Username: {username}</p>
          <p>Email: {email}</p>
        </section>

        <section>
          <header>
            <h2>Organizations Added</h2>

            <OrganizationsList orgs={fullOrgsAdded} />
          </header>
        </section>

        <section>
          <header>
            <h2>Events Added</h2>
          </header>

          <EventList events={fullEventsAdded} />
        </section>
      </div>
    );
  }
}

export default Account;