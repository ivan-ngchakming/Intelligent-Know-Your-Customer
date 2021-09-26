import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from './views/Login';
import Home from './views/Home';

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/home" exact component={Home} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
