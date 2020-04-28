import { createAction, handleActions } from 'redux-actions';
import axios from 'axios';
import { apiTopNews } from '../../constants/apiRoutes';
import { isArray } from '../../utility/helpers';

// ------------------------------------
// Constants
// ------------------------------------

const SET_TOP_NEWS = 'SET_TOP_NEWS';

export const initialState = [];

// ------------------------------------
// Actions
// ------------------------------------

export const setTopNews = createAction(SET_TOP_NEWS);

// ------------------------------------
// Reducers
// ------------------------------------

export const reducers = {
  [SET_TOP_NEWS]: (state, { payload }) => {
    return isArray(payload) ? payload : [];
  },
};

// ------------------------------------
// API calls
// ------------------------------------

export const getTopNews = (dispatch, country) => {
  return axios.get(apiTopNews(country)).then(({ data }) => {
    dispatch(setTopNews(data.articles));
  });
};

export default handleActions(reducers, initialState);

// ------------------------------------
// "plain" action functions
// ------------------------------------

export const clearTopNews = () => setTopNews(initialState);
