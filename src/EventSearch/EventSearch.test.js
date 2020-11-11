import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import EventSearch from './EventSearch';
import { dummyOrgs, dummyEvents, dummyCauses, dummyTags } from '../dummyData';
import VolunteerContext from '../VolunteerContext';

describe('EventSearch Component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <BrowserRouter>
        <EventSearch />
      </BrowserRouter>,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });

  it('renders the UI as expected', () => {
    const contextValue = {
      orgs: dummyOrgs,
      causes: dummyCauses,
      tags: dummyTags
    };
    render(
      <VolunteerContext.Provider value={contextValue}>
        <BrowserRouter>
          <EventSearch />
        </BrowserRouter>
      </VolunteerContext.Provider>
    );

    expect(document.body).toMatchSnapshot();
  });

  it(`renders search results after clicking 'Search'`, () => {
    const contextValue = {
      orgs: dummyOrgs,
      events: dummyEvents,
      causes: [],
      tags: []
    };
    render(
      <VolunteerContext.Provider value={contextValue}>
        <BrowserRouter>
          <EventSearch pageLimit={7} />
        </BrowserRouter>
      </VolunteerContext.Provider>
    );

    userEvent.click(screen.getByRole('button', { name: 'Search' }));
    expect(document.body).toMatchSnapshot();
  });
});