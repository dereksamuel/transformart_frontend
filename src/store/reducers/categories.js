import { SET_ALL, SET_CREATED, SET_ERROR, SET_LOADING } from "../types/categories.js";

const initialState = {
  all: [],
  createdId: null,
  loading: false,
  error: true
};

function categories(state = initialState, action) {
  const categoriesCases = {
    [SET_ALL]: {
      ...state,
      all: action.payload
    },
    [SET_CREATED]: {
      ...state,
      createdId: action.payload
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
