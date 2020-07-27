import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';

import Signin from '../pages/Signin';
import Signup from '../pages/Signup';
import Dashboard from '../pages/Dashboard';
import NewEmployee from '../pages/NewEmployee';
import InfoEmployee from '../pages/InfoEmployee';

const Routes: React.FC = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" exact component={Signin} />
      <Route path="/signup" exact component={Signup} />
      <Route path="/dashboard" exact component={Dashboard} />
      <Route path="/new" exact component={NewEmployee} />
      <Route path="/info/:id" exact component={InfoEmployee} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
