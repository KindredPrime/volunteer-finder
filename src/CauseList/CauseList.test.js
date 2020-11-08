import ReactDOM from 'react-dom';
import { render } from '@testing-library/react';
import CauseList from './CauseList';
import { dummyCauses } from '../dummyData';

describe('CauseList Component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <CauseList causes={[]}/>,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });

  it('renders the UI as expected', () => {
    render(
      <CauseList causes={dummyCauses} />
    );

    expect(document.body).toMatchSnapshot();
  });
});