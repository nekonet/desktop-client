import React from 'react';
import {Switch, Route} from 'react-router';

import NetworkPage from './components/Network';

import WalletPage from './components/Wallet';

import TokensPage from './components/Tokens';

const ContentRouter = props => (
  <Switch>
    <Route exact path="/network" component={NetworkPage} />
    <Route exact path="/wallet" component={WalletPage} />
    <Route exact path="/tokens" component={TokensPage} />
  </Switch>
);

export default ContentRouter;
