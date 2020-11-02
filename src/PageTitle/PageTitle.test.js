import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import PageTitle from './PageTitle';

describe('PageTitle Component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<PageTitle />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('renders the UI as expected', () => {
    const tree = renderer
      .create(<PageTitle title="title" />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});