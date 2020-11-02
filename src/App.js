import { Route } from 'react-router-dom';
import Home from './Home/Home';
import "./App.css";

function App() {
  return (
    <div className="App">
      <Route exact path="/">
        <Home />
      </Route>
    </div>
  );
}

export default App;
