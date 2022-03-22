import { SET_ALL, SET_ERROR, SET_LOADING, SET_ONE, SET_SELECTED } from "../types/products";

const initialState = {
  all: [],
  one: {},
  selected: {},
  loading: false,
  error: true
};

function products(state = initialState, action) {
  const productsCases = {
    [SET_ALL]: {
      ...state,
      all: action.payload
    },
    [SET_ONE]: {
      ...state,
      one: action.payload
    },
    [SET_SELECTED]: {
      ...state,
      selected: action.payload
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

  return productsCases[action.type] || state;
}

export {
  products
};
