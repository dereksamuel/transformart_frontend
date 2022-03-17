import { SET_ALL, SET_ERROR, SET_LOADING } from "../types/categoriesProducts.js";

const initialState = {
  all: [],
  loading: false,
  error: true
};

function categoriesProducts(state = initialState, action) {
  const categoriesProductsCases = {
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

  return categoriesProductsCases[action.type] || state;
}

export {
  categoriesProducts
};
