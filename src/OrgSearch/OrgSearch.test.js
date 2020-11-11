import ReactDOM from 'react-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import OrgSearch from './OrgSearch';
import { dummyOrgs, dummyCauses, dummyTags } from '../dummyData';
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
      causes: dummyCauses,
      tags: dummyTags
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
      causes: [],
      tags: []
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

  // test search term


  // test selecting causes
  it.skip('renders search results based on selected causes', () => {

  });

  // test selecting tags

});