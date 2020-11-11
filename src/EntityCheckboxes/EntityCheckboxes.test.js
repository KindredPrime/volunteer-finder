import ReactDOM from 'react-dom';
import { render } from '@testing-library/react';
import EntityCheckboxes from './EntityCheckboxes';
import { dummyCauses } from '../dummyData';

describe('EntityCheckboxes Component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <EntityCheckboxes entities={[]} handleClick={() => {}} type="causes" />,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });

  it('renders the UI as expected', () => {
    render(<EntityCheckboxes entities={dummyCauses} handleClick={() => {}} type="causes" />);

    expect(document.body).toMatchSnapshot();
  });
});