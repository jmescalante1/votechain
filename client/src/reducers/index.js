import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import election from './election'
import web3 from './web3'
import contract from './contract'
import position from './position'

export default (history) => combineReducers({
  router: connectRouter(history),
  election: election,
  web3: web3,
  contract: contract,
  position: position
});