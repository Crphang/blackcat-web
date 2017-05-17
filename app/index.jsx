import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import configureStore from './configureStore';

import App from './containers/App';
import Login from './containers/Login';
import EnsureLoggedInContainer from './containers/EnsureLoggedInContainer';
import UserDetail from './containers/UserDetail';
import EventDetail from './containers/EventDetail';

async function init() {
  // Ensure that rehydration happened
  const store = await configureStore();
  const history = syncHistoryWithStore(browserHistory, store);

  ReactDOM.render(
    <Provider store={store}>
      { /* Tell the Router to use our enhanced history */ }
      <Router history={history}>
        <Route path="/login" component={Login} />
        <Route component={EnsureLoggedInContainer}>
          <Route path="/" component={App} />
          <Route path="/event/:id" component={EventDetail} />
          <Route path="/me" component={UserDetail} />
        </Route>
      </Router>
    </Provider>,
    document.getElementById('app'),
  );
}

init();
