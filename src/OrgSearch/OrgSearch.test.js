import ReactDOM from 'react-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import OrgSearch from './OrgSearch';
import { dummyOrgs, dummyCauses } from '../dummyData';
import VolunteerContext from '../VolunteerContext';

describe('OrgSearch Component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <BrowserRouter>
        <OrgSearch />
      </BrowserRouter>,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  }); 

  it('renders the UI as expected', () => {
    const contextValue = {
      causes: dummyCauses
    };
    render(
      <VolunteerContext.Provider value={contextValue}>
        <BrowserRouter>
          <OrgSearch />
        </BrowserRouter>
      </VolunteerContext.Provider>
    );

    expect(document.body).toMatchSnapshot();
  });

  it(`renders search results after clicking 'Search'`, () => {
    const contextValue = {
      orgs: dummyOrgs,
      causes: []
    };
    render(
      <VolunteerContext.Provider value={contextValue}>
        <BrowserRouter>
          <OrgSearch pageLimit={7} />
        </BrowserRouter>
      </VolunteerContext.Provider>
    );

    userEvent.click(screen.getByRole('button', { name: 'Search' }));
    expect(document.body).toMatchSnapshot();
  });

  it('renders search results that match the search term', () => {
    const contextValue = {
      orgs: dummyOrgs,
      causes: []
    };
    render(
      <VolunteerContext.Provider value={contextValue}>
        <BrowserRouter>
          <OrgSearch pageLimit={10} />
        </BrowserRouter>
      </VolunteerContext.Provider>
    );

    userEvent.type(screen.getByLabelText('Search Term'), 'YMCA');
    userEvent.click(screen.getByRole('button', { name: 'Search' }));
    expect(document.body).toMatchSnapshot();
  });

  it('renders search results that have the selected causes', () => {
    const contextValue = {
      orgs: dummyOrgs,
      causes: dummyCauses.slice(0, 1)
    };
    render(
      <VolunteerContext.Provider value={contextValue}>
        <BrowserRouter>
          <OrgSearch pageLimit={10} />
        </BrowserRouter>
      </VolunteerContext.Provider>
    );

    userEvent.click(screen.getByLabelText('Youth'));
    userEvent.click(screen.getByRole('button', { name: 'Search' }));
    expect(document.body).toMatchSnapshot();
  });
});