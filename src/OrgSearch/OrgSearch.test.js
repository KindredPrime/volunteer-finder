import ReactDOM from 'react-dom';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import OrgSearch from './OrgSearch';
import { dummyOrgs, dummyCauses } from '../dummyData';
import VolunteerContext from '../VolunteerContext';

describe('OrgSearch Component', () => {
  const origFetch = global.fetch;

  // return a Promise that resolves to an object with a json function that returns a Promise that
  // resolves to an array of organizations
  beforeAll(() => {
    global.fetch = () => Promise.resolve({
      json: () => Promise.resolve([
        dummyOrgs[0]
      ])
    });
  });

  afterAll(() => {
    global.fetch = origFetch;
  });

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

  it(`Renders 'Searching...' while organizations are being searched`, () => {
    const contextValue = {
      causes: dummyCauses.slice(0, 1)
    };
    render(
      <VolunteerContext.Provider value={contextValue}>
        <BrowserRouter>
          <OrgSearch pageLimit={7} />
        </BrowserRouter>
      </VolunteerContext.Provider>
    );

    userEvent.click(screen.getByLabelText(dummyCauses[0].cause_name));
    userEvent.click(screen.getByRole('button', { name: 'Search' }));
    expect(screen.getByText('Searching...')).toBeInTheDocument();
  });

  /**
   * This test doesn't work when deploying a build to Vercel.  During Vercel's build process,
   * it doesn't have permission to connect to localhost, where the local API is running.
   */
  it.skip(`renders search results after clicking 'Search'`, async () => {
    const contextValue = {
      causes: dummyCauses.slice(0, 1)
    };
    render(
      <VolunteerContext.Provider value={contextValue}>
        <BrowserRouter>
          <OrgSearch pageLimit={7} />
        </BrowserRouter>
      </VolunteerContext.Provider>
    );

    userEvent.click(screen.getByLabelText(dummyCauses[0].cause_name));
    userEvent.click(screen.getByRole('button', { name: 'Search' }));
    await waitFor(() => expect(screen.getByText('Results')).toBeInTheDocument());
  });
});