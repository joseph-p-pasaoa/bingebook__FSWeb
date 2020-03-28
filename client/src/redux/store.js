/*
Joseph P. Pasaoa
Client Redux Store | Bingebook (a full-stack binge-facilitating app)
*/


/* EXTERNALS - LOCALS */
import { createStore } from 'redux';

import rootReducer from './rootReducer';


/* STORE */
const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);


export default store;
