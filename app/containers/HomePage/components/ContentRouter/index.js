import React from 'react';
import {Switch, Route} from 'react-router';

import NetworkPage from './components/Network';

import ClientPage from './components/Client';

import TokensPage from './components/Tokens';

const ContentRouter = props => (
  <Switch>
    <Route exact path="/network" component={NetworkPage} />
    <Route exact path="/client" component={ClientPage} />
    <Route exact path="/tokens" component={TokensPage} />
  </Switch>
);

export default ContentRouter;
