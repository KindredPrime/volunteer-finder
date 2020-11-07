import ReactDOM from 'react-dom';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import User from './User';
import App from '../App';
import { dummyUsers } from '../dummyData';

describe('User Component', () => {
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
        <User />
      </BrowserRouter>,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });

  it('renders the UI as expected', () => {
    render(
      <MemoryRouter initialEntries={['/login']}>
        <App />
      </MemoryRouter>
    );

    userEvent.type(screen.getByLabelText('Username'), dummyUsers[0].username);
    userEvent.type(screen.getByLabelText('Password'), dummyUsers[0].password);
    userEvent.click(screen.getByRole('button', { name: 'Login' }));

    expect(document.body).toMatchSnapshot();
  });
});