import ReactDOM from 'react-dom';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import OrganizationsList from './OrganizationsList';
import { dummyOrgs } from '../dummyData';

describe('OrganizationsList Component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <OrganizationsList orgs={[]} />,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });

  it('renders the UI as expected', () => {
    render(
      <BrowserRouter>
        <OrganizationsList orgs={dummyOrgs} />
      </BrowserRouter>
    );

    expect(document.body).toMatchSnapshot();
  });
});