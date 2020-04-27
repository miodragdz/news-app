import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import country from './modules/country';
import topNews from './modules/topNews';
import categories from './modules/categories';
import search from './modules/search';

const createRootReducer = history =>
  combineReducers({
    router: connectRouter(history),
    country,
    topNews,
    categories,
    search,
  });

export default createRootReducer;
