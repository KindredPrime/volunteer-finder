import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import Nav from './Nav';
import App from '../App';

describe('Nav Component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <BrowserRouter>
        <Nav />
      </BrowserRouter>,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });

  it(`expands and closes nav menu when 'Menu' is clicked`, () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    userEvent.click(screen.getByRole('button', { name: 'Menu' }));
    expect(document.body).toMatchSnapshot();

    userEvent.click(screen.getByRole('button', { name: 'Menu' }));
    expect(document.body).toMatchSnapshot();
  });
});
