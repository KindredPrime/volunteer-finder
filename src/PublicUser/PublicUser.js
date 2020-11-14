import React from 'react';
import PropTypes from 'prop-types';
import VolunteerContext from '../VolunteerContext';
import Nav from '../Nav/Nav';
import OrganizationsList from '../OrganizationsList/OrganizationsList';

function PublicUser(props) {
  const userId = props.match.params.id;

  return (
    <VolunteerContext.Consumer>
      {(value) => {
        const { users, orgs } = value;
        const desiredUser = users.find((user) => user.id === parseInt(userId));

        if (desiredUser) {
          const { username } = desiredUser;
          const orgsAdded = orgs.filter((org) => org.creator === username);

          return (
            <div className="PublicUser">
              <Nav />

              <main>
                <header>
                  <h1>{username}</h1>
                </header>

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

        return (
          <div className="PublicUser">
            <main>
              <p>No user found</p>
            </main>
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