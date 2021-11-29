import React from "react";
import ReactDOM from "react-dom";

// Redux
import { createBrowserHistory } from 'history';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { PersistGate } from 'redux-persist/integration/react';


import configureStore from './store/configureStore';

import "bootstrap/dist/css/bootstrap.min.css";
import App from './App';
import * as serviceWorker from "./serviceWorker";

const history = createBrowserHistory();
const {store, persistor} = configureStore(history);

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter>
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();