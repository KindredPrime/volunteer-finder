import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import Account from './Account';
import VolunteerContext from '../VolunteerContext';
import { dummyUsers, dummyOrgs } from '../dummyData';

describe('Account Component', () => {
  const origStoredId = window.localStorage.getItem('userId');

  const contextValue = {
    user: dummyUsers[0],
    orgs: dummyOrgs
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