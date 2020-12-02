import ReactDOM from 'react-dom';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AddOrg from './AddOrg';
import { dummyOrgs, dummyCauses } from '../dummyData';
import App from '../App';
import VolunteerContext from '../VolunteerContext';

describe('AddOrg Component', () => {
  const origFetch = global.fetch;

  // Return a promise that resolves to an object with a json function that returns a promise that 
  // resolves to one of the following: 
  //   - a single organization
  //   - an array of causes
  //   - an empty array (to represent no organizations)
  beforeAll(() => {
    global.fetch = (route, options={}) => {
      if (route.includes('orgs') && options.method === 'POST') {
        return Promise.resolve({
          json: () => Promise.resolve({
            id: 1,
            ...JSON.parse(options.body)
          })
        });
      }
      else if (route.includes('causes')) {
        return Promise.resolve({
          json: () => Promise.resolve(dummyCauses)
        });
      }

      return Promise.resolve({
        json: () => Promise.resolve([])
      });
    }
  });

  afterAll(() => {
    global.fetch = origFetch;
  });

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <BrowserRouter>
        <AddOrg history={{}} />
      </BrowserRouter>,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });

  it('goes to org page after successful add', async () => {
    render(
      <MemoryRouter initialEntries={['/add-org']}>
        <App />
      </MemoryRouter>
    );

    const causesLegend = 'Causes* (select at least one)';
    await waitFor(() => expect(screen.getByText(causesLegend)).toBeInTheDocument());

    const name = 'New Org';
    const website = 'http://www.new-org.com';
    const phone = '1-800-555-5555';
    const email = 'contact@new-org.com';
    const address = 'White House, D.C.';
    const description = 'New Org description';

    userEvent.type(screen.getByLabelText('Name*'), name);
    userEvent.type(screen.getByLabelText('Website'), website);
    userEvent.type(screen.getByLabelText('Phone'), phone);
    userEvent.type(screen.getByLabelText('Email'), email);
    userEvent.type(screen.getByLabelText('Address'), address);
    userEvent.type(screen.getByLabelText('Description*'), description);
    userEvent.click(screen.getByText(dummyCauses[0].cause_name));
    userEvent.click(screen.getByRole('button', { name: 'Add Organization' }));

    await waitFor(() => expect(screen.getByText(name)).toBeInTheDocument());
    expect(screen.getByText(website)).toBeInTheDocument();
    expect(screen.getByText(`Phone: ${phone}`)).toBeInTheDocument();
    expect(screen.getByText(`Email: ${email}`)).toBeInTheDocument();
    expect(screen.getByText(`Address: ${address}`)).toBeInTheDocument();
    expect(screen.getByText(description)).toBeInTheDocument();
  });

  it(`renders 'Adding...' while the new organization is being added`, () => {
    const contextValue = {
      orgs: [],
      causes: dummyCauses.slice(0, 1)
    };
    
    render(
      <VolunteerContext.Provider value={contextValue}>
        <BrowserRouter>
          <AddOrg history={{}} />
        </BrowserRouter>
      </VolunteerContext.Provider>
    );

    const org = dummyOrgs[0];
    userEvent.type(screen.getByLabelText('Name*'), org.org_name);
    userEvent.type(screen.getByLabelText('Website'), org.website);
    userEvent.type(screen.getByLabelText('Description*'), org.org_desc);
    userEvent.click(screen.getByLabelText(dummyCauses[0].cause_name));
    userEvent.click(screen.getByRole('button', { name: 'Add Organization' }));

    expect(screen.getByText('Adding...')).toBeInTheDocument();
  });

  it('renders error when org already exists', () => {
    const contextValue = {
      orgs: dummyOrgs,
      causes: dummyCauses.slice(0, 1)
    };
    
    render(
      <BrowserRouter>
        <VolunteerContext.Provider value={contextValue}>
          <AddOrg history={{}} />
        </VolunteerContext.Provider>
      </BrowserRouter>
    );

    const org = dummyOrgs[0];
    userEvent.type(screen.getByLabelText('Name*'), org.org_name);
    userEvent.type(screen.getByLabelText('Website'), org.website);
    userEvent.type(screen.getByLabelText('Description*'), org.org_desc);
    userEvent.click(screen.getByLabelText(dummyCauses[0].cause_name));
    userEvent.click(screen.getByRole('button', { name: 'Add Organization' }));

    expect(screen.getByText('The organization already exists')).toBeInTheDocument();
  });

  it(`renders an error when 'Name' is missing`, () => {    
    render(
      <BrowserRouter>
        <AddOrg history={{}} />
      </BrowserRouter>
    );

    const nameInput = screen.getByLabelText('Name*');
    userEvent.type(nameInput, 'some text');
    nameInput.setSelectionRange(0, 9);
    userEvent.type(nameInput, '{backspace}');
    
    expect(screen.getByText('You must provide a name')).toBeInTheDocument();
  });

  it('renders an error when no contact info fields', () => {
    render(
      <BrowserRouter>
        <AddOrg history={{}} />
      </BrowserRouter>
    );

    const websiteInput = screen.getByLabelText('Website');
    userEvent.type(websiteInput, 'http://www.website.com');
    websiteInput.setSelectionRange(0, 22);
    userEvent.type(websiteInput, '{backspace}');

    const phoneInput = screen.getByLabelText('Phone');
    userEvent.type(phoneInput, '1-800-555-5555');
    phoneInput.setSelectionRange(0, 14);
    userEvent.type(phoneInput, '{backspace}');

    userEvent.click(screen.getByLabelText('Email'));

    const addressInput = screen.getByLabelText('Address');
    userEvent.type(addressInput, '1 Some Rd. Vienna, VA');
    addressInput.setSelectionRange(0, 21);
    userEvent.type(addressInput, '{backspace}');
    
    expect(screen.getByText('You must fill out at least one contact info field'))
      .toBeInTheDocument();
  });
});