import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { todayDate } from '../util';
import './EventList.css';

function EventList(props) {
  return (
    <div className="EventList">
      <ul>
        {props.events
          .sort((firstEvent, secondEvent) => {
            const firstDate = new Date(firstEvent.date).getTime();
            const secondDate = new Date(secondEvent.date).getTime();

            return secondDate - firstDate;
          })
          .map((event) => {
            const eventDate = new Date(event.date);
            const classNames = eventDate >= todayDate() 
              ? 'EventList__event'
              : 'EventList__event passed';
            return (
              <li key={event.id}>
                <Link to={`/event/${event.id}`} className={classNames}>{event.name}</Link>
              </li>
            );
          })}
      </ul>
    </div>
  );
}

EventList.propTypes = {
  events: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    organization: PropTypes.number,
    location: PropTypes.string,
    date: PropTypes.string,
    causes: PropTypes.arrayOf(PropTypes.number),
    tags: PropTypes.arrayOf(PropTypes.number)
  }))
};

export default EventList;