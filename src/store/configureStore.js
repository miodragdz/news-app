import { routerMiddleware } from 'connected-react-router';
import thunk from 'redux-thunk';
import { applyMiddleware, compose, createStore } from 'redux';

import createRootReducer from './rootReducers';

// Redux DevTools Extension for Chrome and Firefox
const reduxDevTool = () => {
  return typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__()
    ? window.__REDUX_DEVTOOLS_EXTENSION__()
    : f => f;
};

export default function configureStore(initialState, history) {
  const composedStoreEnhancer = compose(
    applyMiddleware(thunk),
    applyMiddleware(routerMiddleware(history)),
    reduxDevTool()
  );

  const store = composedStoreEnhancer(createStore)(
    createRootReducer(history),
    initialState
  );

  if (module.hot) {
    module.hot.accept('./rootReducers', () => {
      store.replaceReducer(createRootReducer(history));
    });
  }

  return store;
}
