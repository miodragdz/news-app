import { createAction, handleActions } from 'redux-actions';
import axios from 'axios';
import { apiFilteredNews } from '../../constants/apiRoutes';
import { isArray } from '../../utility/helpers';

// ------------------------------------
// Constants
// ------------------------------------

const SET_FILTERED_NEWS = 'SET_FILTERED_NEWS';

export const initialState = [];

// ------------------------------------
// Actions
// ------------------------------------

export const setFilteredNews = createAction(SET_FILTERED_NEWS);

// ------------------------------------
// Reducers
// ------------------------------------

export const reducers = {
  [SET_FILTERED_NEWS]: (state, { payload }) => {
    return isArray(payload) ? payload : [];
  },
};

// ------------------------------------
// API calls
// ------------------------------------

export const getFilteredNews = (dispatch, country, searchTerm) => {
  return axios.get(apiFilteredNews(country, searchTerm)).then(({ data }) => {
    dispatch(setFilteredNews(data.articles));
  });
};

export default handleActions(reducers, initialState);

// ------------------------------------
// "plain" action functions
// ------------------------------------

export const clearFilteredNews = () => setFilteredNews(initialState);
