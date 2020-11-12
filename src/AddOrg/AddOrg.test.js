import ReactDOM from 'react-dom';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AddOrg from './AddOrg';
import { dummyUsers, dummyOrgs } from '../dummyData';
import VolunteerContext from '../VolunteerContext';
import App from '../App';

describe('AddOrg Component', () => {
  const origStoredId = window.localStorage.getItem('userId');

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
      <BrowserRouter>
        <AddOrg />
      </BrowserRouter>,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });

  /**
   * You can rely on the App's context for this test because the completed app will connect to the
   * API based on an environment variable, meaning it will only add to a test database.  I'll 
   * just need to delete the organizations from the test environment's database after I'm done 
   * testing
   */
  it('goes to org page after successful add', () => {
    window.localStorage.setItem('userId', dummyUsers[0].id);
    
    render(
      <MemoryRouter initialEntries={['/add-org']}>
        <App />
      </MemoryRouter>
    );

    userEvent.type(screen.getByLabelText('Name*'), 'New Org');
    userEvent.type(screen.getByLabelText('Website'), 'http://www.new-org.com');
    userEvent.type(screen.getByLabelText('Phone'), '1-800-555-5555');
    userEvent.type(screen.getByLabelText('Email'), 'contact@new-org.com');
    userEvent.type(screen.getByLabelText('Address'), 'White House, D.C');
    userEvent.click(screen.getByLabelText('Human Rights'));
    userEvent.click(screen.getByLabelText('virtual'));
    userEvent.click(screen.getByRole('button', { name: 'Add Organization' }));

    expect(document.body).toMatchSnapshot();
  });

  it('renders error when org already exists', () => {
    const user = dummyUsers[0];
    const org = dummyOrgs[0];
    window.localStorage.setItem('userId', user.id);
    
    render(
      <MemoryRouter initialEntries={['/add-org']}>
        <App />
      </MemoryRouter>
    );

    userEvent.type(screen.getByLabelText('Name*'), org.name);
    userEvent.type(screen.getByLabelText('Website'), org.website);
    userEvent.click(screen.getByRole('button', { name: 'Add Organization' }));

    expect(screen.getByText('The organization already exists')).toBeInTheDocument();
  });

  it(`renders an error when 'Name' is missing`, () => {    
    render(
      <BrowserRouter>
        <AddOrg />
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
        <AddOrg />
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