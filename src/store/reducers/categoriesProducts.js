import { SET_ALL, SET_ERROR, SET_LOADING, SET_ONE } from "../types/categoriesProducts.js";

const initialState = {
  all: [],
  one: {},
  loading: false,
  error: true
};

function categoriesProducts(state = initialState, action) {
  const categoriesProductsCases = {
    [SET_ALL]: {
      ...state,
      all: action.payload
    },
    [SET_ONE]: {
      ...state,
      one: action.payload
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
