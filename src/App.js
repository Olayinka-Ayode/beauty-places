import './App.css';
import React from 'react';
import Home from './Home';
import List from './List';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom/cjs/react-router-dom.min';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/list">
            <List />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
