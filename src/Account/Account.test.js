import ReactDOM from 'react-dom';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import Account from './Account';
import App from '../App';
import VolunteerContext from '../VolunteerContext';
import { dummyUsers, dummyOrgs, dummyEvents } from '../dummyData';

describe('Account Component', () => {
  const origStoredId = window.localStorage.getItem('userId');

  const contextValue = {
    user: dummyUsers[0],
    orgs: dummyOrgs,
    events: dummyEvents
  };

  beforeAll(() => {
    if (origStoredId) {
      window.localStorage.removeItem('userId');
    }
  });

  afterEach(() => {
    if (window.localStorage.getItem('userId')) {
      window.localStorage.removeItem('userId');
    }
  });

  afterAll(() => {
    if (origStoredId) {
      window.localStorage.setItem('userId', origStoredId);
    }
  });

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <VolunteerContext.Provider value={contextValue}>
        <BrowserRouter>
          <Account />
        </BrowserRouter>
      </VolunteerContext.Provider>,
      div
    );

    ReactDOM.unmountComponentAtNode(div);
  });

  it('renders the UI as expected', () => {
    render(
      <VolunteerContext.Provider value={contextValue}>
        <BrowserRouter>
          <Account />
        </BrowserRouter>
      </VolunteerContext.Provider>
    );

    expect(document.body).toMatchSnapshot();
  });
});