import React from 'react';
import PropTypes from 'prop-types';
import VolunteerContext from '../VolunteerContext';
import Nav from '../Nav/Nav';
import OrganizationsList from '../OrganizationsList/OrganizationsList';
import EventList from '../EventList/EventList';

function PublicUser(props) {
  const userId = props.match.params.id;

  return (
    <VolunteerContext.Consumer>
      {(value) => {
        const { users, orgs, events } = value;
        const desiredUser = users.find((user) => user.id === parseInt(userId));

        if (desiredUser) {
          const { username, orgsAdded, eventsAdded } = desiredUser;
          const fullOrgsAdded = orgsAdded.map((orgName) => orgs.find((org) => org.name === orgName));
          const fullEventsAdded = eventsAdded.map((eventName) => events.find((event) => event.name === eventName))

          return (
            <div className="PublicUser">
              <Nav />

              <header>
                <h1>{username}</h1>
              </header>

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

        return (
          <div className="PublicUser">
            <p>No user found</p>
          </div>
        );
      }}
    </VolunteerContext.Consumer>
  );
}

PublicUser.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string
    })
  }).isRequired
};

export default PublicUser;