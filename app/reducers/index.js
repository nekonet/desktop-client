// @flow
import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import blockchain from './blockchain';
import network from './network';
import tokens from './tokens';

const rootReducer = combineReducers({
  network,
  blockchain,
  tokens,
  router
});

export default rootReducer;
