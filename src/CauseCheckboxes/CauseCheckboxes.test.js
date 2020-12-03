import ReactDOM from 'react-dom';
import { render } from '@testing-library/react';
import CauseCheckboxes from './CauseCheckboxes';
import { dummyCauses } from '../dummyData';

describe('CauseCheckboxes Component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <CauseCheckboxes 
        causes={[]}
        checkedCauses={[]}
        handleClick={() => {}}
        legend="Legend"
      />,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });

  it('renders the UI as expected', () => {
    render(
      <CauseCheckboxes
        causes={dummyCauses}
        checkedCauses={[{
          [dummyCauses[0]]: true,
          [dummyCauses[1]]: true
        }]}
        handleClick={() => {}}
        legend="Causes"
      />
    );

    expect(document.body).toMatchSnapshot();
  });
});