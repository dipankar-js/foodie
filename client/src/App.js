import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';

import Login from './components/Login';
import SignUp from './components/SignUp';
import NavBar from './components/NavBar';
import Restaurant from './components/Restaurant';
import Menu from './components/Menu';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/register" component={SignUp} />
          <PrivateRoute exact path="/" component={Restaurant} />
          <PrivateRoute exact path="/restaurant/:id/menu" component={Menu} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
