import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import  { Router } from 'react-router-dom'
import configureStore, { history } from './configureStore'

import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';

const store = configureStore()

ReactDOM.render ((
  <Provider store={store}>
    <ConnectedRouter history={history} >
      <App />    
    </ConnectedRouter>
  </Provider>
  
), document.getElementById('root'));
