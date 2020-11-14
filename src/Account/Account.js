import React, { Component } from 'react';
import VolunteerContext from '../VolunteerContext';
import Nav from '../Nav/Nav';
import OrganizationsList from '../OrganizationsList/OrganizationsList';

class Account extends Component {
  static contextType = VolunteerContext;

  render() {
    const { user, orgs } = this.context;
    const { email, username } = user;

    const orgsAdded = orgs.filter((org) => org.creator === username);

    return (
      <div className="Account">
        <Nav />

        <main>
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

              <OrganizationsList orgs={orgsAdded} />
            </header>
          </section>
        </main>
      </div>
    );
  }
}

export default Account;