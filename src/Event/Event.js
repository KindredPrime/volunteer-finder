import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Nav from '../Nav/Nav';
import VolunteerContext from '../VolunteerContext';
import { todayDate, formatDate } from '../util';
import './Event.css';

function Event(props) {
  const eventId = props.match.params.id;

  return (
    <VolunteerContext.Consumer>
      {(value) => {
        const { events, orgs, users } = value;
        const event = events.find((elem) => elem.id === parseInt(eventId));

        if (event) {
          const { name, organization, location, date, duration, description, causes, tags } = event;

          const fullOrg = orgs.find((org) => org.name === organization);

          const creator = users.find((user) => user.eventsAdded.includes(name));

          const eventDateObj = new Date(date);

          return (
            <div className="Event">
              <Nav />

              <header>
                <h1>{name}</h1>
              </header>

              <section>
                <header>
                  <h2>Event Info</h2>
                </header>

                <p>Organization: <Link to={`/org/${fullOrg.id}`}>{fullOrg.name}</Link></p>
                <p>Location: {location}</p>
                <p>Date: {formatDate(date)}</p>
                <p>Duration: {duration}</p>
                <p>{description}</p>
                {eventDateObj < todayDate() && <p className="Event__passed">This event has passed</p>}
              </section>

              <section>
                <header>
                  <h2>Causes</h2>
                </header>
              
                <ul className="Event__causes">
                  {causes.map((cause, index) => (
                    <li key={index}>
                      {cause}
                    </li>
                  ))}
                </ul>
              </section>

              <section>
                <header>
                  <h2>Tags</h2>
                </header>

                <p className="Event__tags">{tags.join(', ')}</p>
              </section>

              <p>Created By: <Link to={`/user/${creator.id}`}>{creator.username}</Link></p>
            </div>
          );
        }

        return (
          <div className="Event">
            <Nav />
            <p>No event found</p>
          </div>
        );
      }}
    </VolunteerContext.Consumer>
  );
}

Event.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string
    })
  })
}

export default Event;