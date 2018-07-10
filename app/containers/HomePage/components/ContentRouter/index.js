import React from 'react';
import {Switch, Route} from 'react-router';

import NetworkOverview from './components/Network/Overview';
import NetworkRESTClient from './components/Network/RESTClient';

import WalletOverview from './components/Wallet/Overview';
import WalletCreate from './components/Wallet/Create';

import TokensOverview from './components/Tokens/Overview';
import TokensBuy from './components/Tokens/Buy';

const ContentRouter = props => (
  <Switch>
    <Route exact path="/network/overview" component={NetworkOverview} />
    <Route exact path="/network/rest_client" component={NetworkRESTClient} />

    <Route exact path="/wallet/overview" component={WalletOverview} />
    <Route exact path="/wallet/create" component={WalletCreate} />
    
    <Route exact path="/tokens/overview" component={TokensOverview} />
    <Route exact path="/tokens/buy" component={TokensBuy} />
  </Switch>
);

export default ContentRouter;
