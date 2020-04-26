import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import country from './modules/country';
import topNews from './modules/topNews';
import categories from './modules/categories';

const createRootReducer = history =>
  combineReducers({
    router: connectRouter(history),
    country,
    topNews,
    categories,
  });

export default createRootReducer;
