import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import Event from './Event';
import { dummyUsers, dummyOrgs, dummyEvents, dummyCauses, dummyTags } from '../dummyData';
import VolunteerContext from '../VolunteerContext';

describe('Event Component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <BrowserRouter>
        <Event match={{
          params: {
            id: '0'
          }
        }} />
      </BrowserRouter>,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });

  it('renders the UI as expected', () => {
    const contextValue = {
      users: dummyUsers,
      orgs: dummyOrgs,
      events: dummyEvents,
      causes: dummyCauses,
      tags: dummyTags
    }
    
    render(
      <VolunteerContext.Provider value={contextValue}>
        <BrowserRouter>
          <Event match={{
            params: {
              id: '1'
            }
          }}/>
        </BrowserRouter>
      </VolunteerContext.Provider>
    );

    expect(document.body).toMatchSnapshot();
  });

  it('renders a blank page when no event', () => {
    render(
      <BrowserRouter>
        <Event match={{
          params: {
            id: '100000'
          }
        }} />
      </BrowserRouter>
    );

    expect(document.body).toMatchSnapshot();
  });
});