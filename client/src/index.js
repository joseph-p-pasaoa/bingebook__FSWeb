/*
JOSEPH P. PASAOA
Client INDEX | Bingebook (a full-stack binge-facilitating app)
*/


/* EXTERNALS & LOCALS */
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from './redux/store.js';
import './reset.css';
import './index.css';
import App from './App';


/* MAIN */
ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
, document.getElementById('root'));
