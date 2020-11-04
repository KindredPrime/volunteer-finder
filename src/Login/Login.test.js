import ReactDOM from 'react-dom';
import { BrowserRouter, Router } from 'react-router-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import Login from './Login';
import App from '../App';

describe('Login Component', () => {
  let history;
  beforeEach(() => {
    history = createMemoryHistory();
  });

  afterEach(() => {
    history = null;
  });

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <BrowserRouter>
        <Login history={history}/>
      </BrowserRouter>, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('displays an error when incorrect username or password', () => {
    history.push('/login');
    render(
      <Router history={history}>
        <App />
      </Router>);
    fireEvent.input(screen.getByLabelText('Username'), { target: { value: "wrong" }});
    fireEvent.input(screen.getByLabelText('Password'), { target: { value: "wrongpassword" }});

    fireEvent.submit(screen.getByTestId('login-form'));
    expect(screen.getByText("Invalid username and password combination"))
      .toBeInTheDocument();
  });
});