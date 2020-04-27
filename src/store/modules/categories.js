import { createAction, handleActions } from 'redux-actions';
import axios from 'axios';
import { apiCategoryNews } from '../../constants/apiRoutes';

import { isArray } from '../../utility/helpers';

// ------------------------------------
// Constants
// ------------------------------------

const SET_CATEGORY_NEWS = 'SET_CATEGORY_NEWS';
const CLEAR_ALL_CATEGORIES = 'CLEAR_ALL_CATEGORIES';
// const SET_BUSINESS_NEWS = 'SET_BUSINESS_NEWS';
// const SET_ENTERTAINMENT_NEWS = 'SET_ENTERTAINMENT_NEWS';
// const SET_GENERAL_NEWS = 'SET_GENERAL_NEWS';
// const SET_HEALTH_NEWS = 'SET_HEALTH_NEWS';
// const SET_SCIENCE_NEWS = 'SET_SCIENCE_NEWS';
// const SET_SPORTS_NEWS = 'SET_SPORTS_NEWS';
// const SET_TECHNOLOGY_NEWS = 'SET_TECHNOLOGY_NEWS';

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
// export const setBusinessNews = createAction(SET_BUSINESS_NEWS);
// export const setEntertainmentNews = createAction(SET_ENTERTAINMENT_NEWS);
// export const setGeneralNews = createAction(SET_GENERAL_NEWS);
// export const setHealthNews = createAction(SET_HEALTH_NEWS);
// export const setScienceNews = createAction(SET_SCIENCE_NEWS);
// export const setSportsNews = createAction(SET_SPORTS_NEWS);
// export const setTechnologyNews = createAction(SET_TECHNOLOGY_NEWS);

// ------------------------------------
// Reducers
// ------------------------------------

export const reducers = {
  [SET_CATEGORY_NEWS]: (state, { payload }) => {
    console.log('payload', payload);
    return isArray(payload.data)
      ? { ...state, [payload.category]: payload.data }
      : state;
  },
  [CLEAR_ALL_CATEGORIES]: (state, { payload }) => {
    return { ...state, ...initialState };
  },
  // [SET_BUSINESS_NEWS]: (state, { payload }) => {
  //   return isArray(payload) ? {...state, business: payload} : [];
  // },
  // [SET_ENTERTAINMENT_NEWS]: (state, { payload }) => {
  //   return isArray(payload) ? {...state, entertainment: payload} : [];
  // },
  // [SET_GENERAL_NEWS]: (state, { payload }) => {
  //   return isArray(payload) ? {...state, general: payload} : [];
  // },
  // [SET_HEALTH_NEWS]: (state, { payload }) => {
  //   return isArray(payload) ? {...state, health: payload} : [];
  // },
  // [SET_SCIENCE_NEWS]: (state, { payload }) => {
  //   return isArray(payload) ? {...state, science: payload} : [];
  // },
  // [SET_SPORTS_NEWS]: (state, { payload }) => {
  //   return isArray(payload) ? {...state, sports: payload} : [];
  // },
  // [SET_TECHNOLOGY_NEWS]: (state, { payload }) => {
  //   return isArray(payload) ? {...state, technology: payload} : [];
  // },
};

// ------------------------------------
// API calls
// ------------------------------------

export const getCategoryNews = (dispatch, country, category, pageSize) => {
  return axios
    .get(apiCategoryNews(country, category, pageSize))
    .then(({ data }) => {
      dispatch(setCategoryNews({ category, data: data.articles }));
      // switch(category) {
      //   case 'business':
      //     dispatch(setBusinessNews(data.articles));
      //     break;
      //   case 'entertainment':
      //     dispatch(setEntertainmentNews(data.articles));
      //     break;
      //   case 'general':
      //     dispatch(setGeneralNews(data.articles));
      //     break;
      //   case 'health':
      //     dispatch(setHealthNews(data.articles));
      //     break;
      //   case 'science':
      //     dispatch(setScienceNews(data.articles));
      //     break;
      //   case 'sports':
      //     dispatch(setSportsNews(data.articles));
      //     break;
      //   case 'technology':
      //     dispatch(setTechnologyNews(data.articles));
      //     break;
      //   default:
      //
      // }
    });
};

export default handleActions(reducers, initialState);

// ------------------------------------
// "plain" action functions
// ------------------------------------

export const clearCategoryNews = (dispatch, category) =>
  dispatch(setCategoryNews({ category, data: [] }));
// export const clearBusinessNews = () => setBusinessNews([]);
// export const clearEntertainmentNews = () => setEntertainmentNews([]);
// export const clearGeneralNews = () => setGeneralNews([]);
// export const clearHealthNews = () => setHealthNews([]);
// export const clearScienceNews = () => setScienceNews([]);
// export const clearSportsNews = () => setSportsNews([]);
// export const clearTechnologyNews = () => setTechnologyNews([]);
