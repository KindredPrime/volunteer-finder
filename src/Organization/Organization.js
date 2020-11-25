import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import VolunteerContext from '../VolunteerContext';
import Nav from '../Nav/Nav';

function Organization(props) {
  const orgId = props.match.params.id;

  return (
    <VolunteerContext.Consumer>
      {(value) => {
        const { orgs } = value;
        const org = orgs.find((elem) => elem.id === parseInt(orgId));

        if (org) {
          const { name, website, phone, email, address, description, causes } = org;

          return (
            <div className="Organization">
            <Nav />
    
            <main>
              <header>
                <h1>{name}</h1>
              </header>

              <section>
                <header>
                  <h2>Contact Info</h2>
                </header>

                <p>Website: <a href={website} target="_blank" rel="noreferrer">{website}</a></p>
                <p>Phone: {phone}</p>
                <p>Email: {email}</p>
                <p>Address: {address}</p>
                <p>{description}</p>
              </section>

              <section>
                <header>
                  <h2>Causes</h2>
                </header>
                
                <ul className="Organization__causes">
                  {causes.map((cause, index) => (
                    <li key={index}>
                      {cause}
                    </li>
                  ))}
                </ul>
              </section>
            </main>
          </div>
          );
        }

        return (
          <div className="Organization">
            <Nav />

            <main>
              <p>No organization found</p>
            </main>
          </div>
        )
      }}
    </VolunteerContext.Consumer>
  );
}

Organization.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string
    })
  }).isRequired
};

export default Organization;