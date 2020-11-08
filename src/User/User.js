import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import VolunteerContext from '../VolunteerContext';
import Nav from '../Nav/Nav';
import EventList from '../EventList/EventList';
import './User.css';

class User extends Component {
  static contextType = VolunteerContext;

  render() {
    const { user, orgs, events } = this.context;
    const { email, username, orgsAdded, eventsAdded } = user;

    const fullOrgsAdded = orgsAdded 
      ? orgsAdded.map((orgAdded) => orgs.find((org) => org.id === orgAdded)) 
      : [];

    const fullEventsAdded = eventsAdded 
      ? eventsAdded.map((eventAdded) => events.find((event) => event.id === eventAdded)) 
      : [];

    return (
      <div className="User">
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
            <ul className="User__orgs">
              {fullOrgsAdded.map((org) => (
                <li key={org.id} className="User__org">
                  <Link to={`/org/${org.id}`}>{org.name}</Link>
                </li>
              ))}
            </ul>
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

export default User;