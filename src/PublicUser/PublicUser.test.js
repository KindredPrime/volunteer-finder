import ReactDOM from 'react-dom';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import PublicUser from './PublicUser';
import { dummyUsers, dummyOrgs } from '../dummyData';
import VolunteerContext from '../VolunteerContext';
import App from '../App';

describe('PublicUser Component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <PublicUser match={{
        params: {
          id: '0'
        }
      }} />,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });

  it('renders the UI as expected', () => {
    const contextValue = {
      users: dummyUsers,
      orgs: dummyOrgs
    };

    render(
      <VolunteerContext.Provider value={contextValue}>
        <MemoryRouter initialEntries={['/user/1']}>
          <App />
        </MemoryRouter>
      </VolunteerContext.Provider>
    );

    expect(document.body).toMatchSnapshot();
  });
});