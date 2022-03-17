import { SET_ALL, SET_ERROR, SET_LOADING } from "../types/categories.js";

const initialState = {
  all: [],
  loading: false,
  error: true
};

function categories(state = initialState, action) {
  const categoriesCases = {
    [SET_ALL]: {
      ...state,
      all: action.payload
    },
    [SET_ERROR]: {
      ...state,
      error: action.payload
    },
    [SET_LOADING]: {
      ...state,
      loading: action.payload
    }
  };

  return categoriesCases[action.type] || state;
}

export {
  categories
};
