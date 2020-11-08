import ReactDOM from 'react-dom';
import CauseList from './CauseList';

describe('CauseList Component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <CauseList causes={[
        {
          id: 0,
          name: 'name'
        }
      ]}/>,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });
});