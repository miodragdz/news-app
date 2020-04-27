import { createAction, handleActions } from 'redux-actions';
import axios from 'axios';
import { apiCategoryNews } from '../../constants/apiRoutes';
import { isArray } from '../../utility/helpers';

// ------------------------------------
// Constants
// ------------------------------------

const SET_CATEGORY_NEWS = 'SET_CATEGORY_NEWS';
const CLEAR_ALL_CATEGORIES = 'CLEAR_ALL_CATEGORIES';

export const initialState = {
  business: [],
  entertainment: [],
  general: [],
  health: [],
  science: [],
  sports: [],
  technology: [],
};

// ------------------------------------
// Actions
// ------------------------------------

export const setCategoryNews = createAction(SET_CATEGORY_NEWS);
export const clearAllCategories = createAction(CLEAR_ALL_CATEGORIES);

// ------------------------------------
// Reducers
// ------------------------------------

export const reducers = {
  [SET_CATEGORY_NEWS]: (state, { payload }) => {
    return isArray(payload.data)
      ? { ...state, [payload.category]: payload.data }
      : state;
  },
  [CLEAR_ALL_CATEGORIES]: (state, { payload }) => {
    return { ...state, ...initialState };
  },
};

// ------------------------------------
// API calls
// ------------------------------------

export const getCategoryNews = (dispatch, country, category, pageSize) => {
  return axios
    .get(apiCategoryNews(country, category, pageSize))
    .then(({ data }) => {
      dispatch(setCategoryNews({ category, data: data.articles }));
    });
};

export default handleActions(reducers, initialState);

// ------------------------------------
// "plain" action functions
// ------------------------------------

export const clearCategoryNews = (dispatch, category) =>
  dispatch(setCategoryNews({ category, data: [] }));
