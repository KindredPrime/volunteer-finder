import ReactDOM from 'react-dom';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';
import SignUp from './SignUp';
import App from '../App';
import { dummyUsers, dummyOrgs } from '../dummyData';
import VolunteerContext from '../VolunteerContext';

describe('SignUp Component', () => {
  const testUsers = [
    {
      id: 1,
      email: 'unique-email@email.com',
      username: 'uniqueUsername',
      password: 'genericPassword'
    }
  ];

  const contextValue = {
    users: testUsers
  };

  let history;
  beforeEach(() => {
    history = createMemoryHistory();
  })

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <BrowserRouter>
        <SignUp history={history} />
      </BrowserRouter>,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });

  // Finish this test after the API is created
  it.skip('creates a new user and redirects to its page', () => {
    const contextValue = {
      users: dummyUsers,
      orgs: dummyOrgs
    };
    render(
      <VolunteerContext.Provider value={contextValue}>
        <MemoryRouter initialEntries={['/signup']}>
          <App />
        </MemoryRouter>
      </VolunteerContext.Provider>
    );

    userEvent.type(screen.getByLabelText('Email'), 'email@email.com');
    userEvent.type(screen.getByLabelText('Username'), 'username');
    userEvent.type(screen.getByLabelText('Password'), 'password');
    userEvent.type(screen.getByLabelText('Confirm Password'), 'password');
    userEvent.click(screen.getByRole('button', { name: 'Sign Up' }));

    expect(document.body).toMatchSnapshot();
  });

  it(`displays error when passwords don't match`, () => {
    render(
    <BrowserRouter>
      <SignUp history={history} />
    </BrowserRouter>);

    userEvent.type(screen.getByLabelText('Email'), 'email@email.com');
    userEvent.type(screen.getByLabelText('Username'), 'username');
    userEvent.type(screen.getByLabelText('Password'), 'password');
    userEvent.type(screen.getByLabelText('Confirm Password'), 'differentPassword');

    expect(screen.getByText(`Passwords don't match`)).toBeInTheDocument();
  });

  // Finish this test after the API is created
  it.skip('displays an error when the email is taken', () => {
    render(
      <VolunteerContext.Provider value={contextValue}>
        <BrowserRouter>
          <SignUp history={history} />
        </BrowserRouter>
      </VolunteerContext.Provider>
    );

    userEvent.type(screen.getByLabelText('Email'), 'unique-email@email.com');
    userEvent.type(screen.getByLabelText('Username'), 'newUsername');
    userEvent.type(screen.getByLabelText('Password'), 'password');
    userEvent.type(screen.getByLabelText('Confirm Password'), 'password');
    userEvent.click(screen.getByRole('button'));

    expect(screen.getByText('A user with that email already exists')).toBeInTheDocument();
  });

  // Finish this test after the API is created
  it.skip('displays an error when the username is taken', () => {
    render(
      <VolunteerContext.Provider value={contextValue}>
        <BrowserRouter>
          <SignUp history={history} />
        </BrowserRouter>
      </VolunteerContext.Provider>
    );

    userEvent.type(screen.getByLabelText('Email'), 'new-email@email.com');
    userEvent.type(screen.getByLabelText('Username'), 'uniqueUsername');
    userEvent.type(screen.getByLabelText('Password'), 'password');
    userEvent.type(screen.getByLabelText('Confirm Password'), 'password');
    userEvent.click(screen.getByRole('button'));

    expect(screen.getByText('That username is already taken')).toBeInTheDocument();
  });
});