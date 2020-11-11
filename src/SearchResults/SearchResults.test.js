import ReactDOM from 'react-dom';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import SearchResults from './SearchResults';
import { dummyOrgs } from '../dummyData';

describe('SearchResults Component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <SearchResults results={[]} pageLimit={0} resultType="event" />,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });

  it('renders the UI as expected', () => {
    render(
      <BrowserRouter>
        <SearchResults results={dummyOrgs} pageLimit={10} resultType="org" />
      </BrowserRouter>
    );

    expect(document.body).toMatchSnapshot();
  });

  it(`renders the next page when 'Next' clicked`, () => {
    render(
      <BrowserRouter>
        <SearchResults results={dummyOrgs} pageLimit={10} resultType="org" />
      </BrowserRouter>
    );

    userEvent.click(screen.getByRole('button', { name: 'Next' }));
    expect(document.body).toMatchSnapshot();
  });

  it(`renders the previous page when 'Previous' clicked`, () => {
    render(
      <BrowserRouter>
        <SearchResults results={dummyOrgs} pageLimit={10} resultType="org" />
      </BrowserRouter>
    );

    userEvent.click(screen.getByRole('button', { name: 'Next' }));
    userEvent.click(screen.getByRole('button', { name: 'Previous' }));
    expect(document.body).toMatchSnapshot();
  });
  //Check previous and next buttons
});