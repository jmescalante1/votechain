import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import election from './election'
import web3 from './web3'
import contract from './contract'
import position from './position'
import candidate from './candidate'
import voter from './voter'
import official from './official'
import persistState from './persist-state'
import ballot from './ballot'
import admin from './admin'
import account from './account'

export default (history) => combineReducers({
  router: connectRouter(history),
  election: election,
  web3: web3,
  contract: contract,
  position: position,
  candidate: candidate,
  voter: voter,
  official: official,
  persistState: persistState,
  ballot: ballot,
  admin: admin,
  account: account
});