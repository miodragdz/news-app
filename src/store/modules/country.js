import { createAction, handleActions } from 'redux-actions';

// ------------------------------------
// Constants
// ------------------------------------

const SET_COUNTRY = 'SET_COUNTRY';

export const initialState = 'gb';

// ------------------------------------
// Actions
// ------------------------------------
export const setCountry = createAction(SET_COUNTRY);

// ------------------------------------
// Reducers
// ------------------------------------

export const reducers = {
  [SET_COUNTRY]: (state, { payload }) => {
    return payload;
  },
};

// ------------------------------------
// API calls
// ------------------------------------

export default handleActions(reducers, initialState);

// ------------------------------------
// "plain" action functions
// ------------------------------------

export const setInitialCountry = () => setCountry(initialState);
