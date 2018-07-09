import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {ConnectedRouter} from 'react-router-redux';
import {Switch, Route, Redirect} from 'react-router';
import App from './App';
import HomePage from './HomePage';

export default class Root extends Component<Props> {
  render() {
    return (
      <Provider store={this.props.store}>
        <ConnectedRouter history={this.props.history}>
          <App>
            <Switch>
              <Route path="/" component={HomePage} />
            </Switch>
          </App>
        </ConnectedRouter>
      </Provider>
    );
  }
}
