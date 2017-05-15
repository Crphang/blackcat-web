import React from 'react';
import ReactDOM from 'react-dom';
import { compose, createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { Router, Route, browserHistory } from 'react-router';
import { syncHistoryWithStore, routerReducer, routerMiddleware } from 'react-router-redux';
import { persistStore, autoRehydrate } from 'redux-persist';

import App from './containers/App';
import Login from './containers/Login';
import userReducer from './reducers/UserReducer';
import eventReducer from './reducers/EventReducer';

const reducers = combineReducers({
  user: userReducer,
  events: eventReducer,
  routing: routerReducer,
});

const store = createStore(
  reducers,
  compose(
    applyMiddleware(routerMiddleware(browserHistory), thunk),
    autoRehydrate(),
  ),
);

persistStore(store, { whitelist: ['user'] });

// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
  <Provider store={store}>
    { /* Tell the Router to use our enhanced history */ }
    <Router history={history}>
      <Route path="/" component={App} />
      <Route path="/login" component={Login} />
    </Router>
  </Provider>,
  document.getElementById('app'),
);

