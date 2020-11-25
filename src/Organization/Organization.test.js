import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import Organization from './Organization';
import { dummyOrgs, dummyCauses } from '../dummyData';
import VolunteerContext from '../VolunteerContext';

describe('Organization Component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <BrowserRouter>
        <Organization match={{
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
      orgs: dummyOrgs,
      causes: dummyCauses
    };
    render(
      <VolunteerContext.Provider value={contextValue}>
        <BrowserRouter>
          <Organization match={{
            params: {
              id: '1'
            }
          }} />
        </BrowserRouter>
      </VolunteerContext.Provider>
    );

    expect(document.body).toMatchSnapshot();
  });
});