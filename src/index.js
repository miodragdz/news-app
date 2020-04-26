import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserHistory } from 'history';
import './styles/index.css';
import App from './App';

import configureStore from './store/configureStore';
const initialState = {};
export const history = createBrowserHistory();
export const store = configureStore(initialState, history);

ReactDOM.render(
  <React.StrictMode>
    <App history={history} store={store} />
  </React.StrictMode>,
  document.getElementById('root')
);
