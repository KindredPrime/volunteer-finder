import ReactDOM from 'react-dom';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import EventList from './EventList';
import { dummyEvents } from '../dummyData';

describe('EventList Component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <EventList events={[]}/>,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });

  it('renders the UI as expected', () => {
    render(
      <BrowserRouter>
        <EventList events={dummyEvents} />
      </BrowserRouter>
    );

    expect(document.body).toMatchSnapshot();
  });
});