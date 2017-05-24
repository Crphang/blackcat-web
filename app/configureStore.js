// configureStore.js
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { autoRehydrate, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import { browserHistory } from 'react-router';

import userReducer from './reducers/UserReducer';
import eventReducer from './reducers/EventReducer';
import categoryReducer from './reducers/CategoryReducer';

const reducers = combineReducers({
  user: userReducer,
  events: eventReducer,
  categories: categoryReducer,
  routing: routerReducer,
});


export default function configureStore() {
  return new Promise((resolve, reject) => {
    try {
      const store = createStore(
        reducers,
        compose(
          autoRehydrate(),
          applyMiddleware(routerMiddleware(browserHistory), thunk),
        ),
      );

      persistStore(
        store,
        { whitelist: ['user'] },
        () => resolve(store),
      );
    } catch (error) {
      reject(error);
    }
  });
}
