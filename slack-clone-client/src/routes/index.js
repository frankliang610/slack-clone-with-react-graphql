import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

import Home from './Home';
import Register from './Register';
import Login from './Login';
import CreateTeam from './CreateTeam';
import ViewTeam from './ViewTeam';
import decode from 'jwt-decode';

const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  const refreshToken = localStorage.getItem('refreshToken');
  try {
    decode(token);
    decode(refreshToken);
  } catch (err) {
    return false;
  }
  return true;
}

const PrivateRoute = ({ children, ...rest }) => {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        (isAuthenticated()
          ? (
            children
          )
          : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: location }
              }}
            />
          )
        )
      }
    />
  );
}

export default () => (
  <Router>
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/register" exact component={Register} />
      <Route path="/login" exact component={Login} />
      <Route path="/view-team" exact component={ViewTeam} />
      <PrivateRoute path="/create-team" exact component={CreateTeam} />
    </Switch>
  </Router>
);
