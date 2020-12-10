import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Home from '.';

describe('Home Component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});