import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { todayDate } from '../util';
import VolunteerContext from '../VolunteerContext';
import Nav from '../Nav/Nav';
import './Organization.css';

function Organization(props) {
  const id = props.match.params.id;

  return (
    <VolunteerContext.Consumer>
      {(value) => {
        const { orgs, events } = value;
        const allCauses = value.causes;
        const allTags = value.tags;
        const org = orgs.find((elem) => elem.id === parseInt(id));

        if (org) {
          const { name, website, phone, email, address } = org;
          const orgCauseIds = org.causes;
          const orgTagIds = org.tags;

          const fullOrgCauses = orgCauseIds.map((id) => allCauses.find((cause) => cause.id === id));
          const fullOrgTags = orgTagIds.map((id) => allTags.find((tag) => tag.id === id));

          const orgEvents = events.filter((event) => event.organization === parseInt(id));

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

              <p>Website: <a href={website} target="_blank">{website}</a></p>
              <p>Phone: {phone}</p>
              <p>Email: {email}</p>
              <p>Address: {address}</p>
            </section>

            <section>
              <header>
                <h2>Causes</h2>
              </header>
              <ul className="Organization__causes">
                {fullOrgCauses.map((cause) => (
                  <li key={cause.id}>
                    {cause.name}
                  </li>
                ))}
              </ul>
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

              <ul className="Organization__events">
                {orgEvents
                  .sort((firstEvent, secondEvent) => {
                    const firstDate = new Date(firstEvent.date).getTime();
                    const secondDate = new Date(secondEvent.date).getTime();

                    return secondDate - firstDate;
                  })
                  .map((event) => {
                    const eventDate = new Date(event.date);
                    const classNames = eventDate >= todayDate() 
                      ? 'Organization__event'
                      : 'Organization__event passed';
                    return (
                      <li key={event.id}>
                        <Link to={`/event/${id}`} className={classNames}>{event.name}</Link>
                      </li>
                    );
                  })}
              </ul>
            </section>
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