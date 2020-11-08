import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import VolunteerContext from '../VolunteerContext';
import Nav from '../Nav/Nav';
import CauseList from '../CauseList/CauseList';
import EventList from '../EventList/EventList';

function Organization(props) {
  const orgId = props.match.params.id;

  return (
    <VolunteerContext.Consumer>
      {(value) => {
        const { users, orgs, events } = value;
        const allCauses = value.causes;
        const allTags = value.tags;
        const org = orgs.find((elem) => elem.id === parseInt(orgId));

        if (org) {
          const { name, website, phone, email, address, description } = org;
          const orgCauseIds = org.causes;
          const orgTagIds = org.tags;

          const fullOrgCauses = orgCauseIds.map((orgCauseId) => allCauses.find((cause) => cause.id === orgCauseId));
          const fullOrgTags = orgTagIds.map((orgTagId) => allTags.find((tag) => tag.id === orgTagId));

          const orgEvents = events.filter((event) => event.organization === parseInt(orgId));

          const creator = users.find((user) => user.orgsAdded.includes(parseInt(orgId)));

          return (
            <div className="Organization">
            <Nav />
    
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
              <CauseList causes={fullOrgCauses}/>
            </section>

            <section>
              <header>
                <h2>Tags</h2>
              </header>

              <p className="Organization__tags">{fullOrgTags.map((tag) => tag.name).join(', ')}</p>
            </section>

            <section>
              <header>
                <h2>Events</h2>
              </header>

              <EventList events={orgEvents} />
            </section>
            
            <p>Created By: <Link to={`/user/${creator.id}`}>{creator.username}</Link></p>
          </div>
          );
        }

        return (
          <div className="Organization">
            <Nav />

            <p>No organization found</p>
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