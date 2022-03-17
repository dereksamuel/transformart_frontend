import { SET_ALL, SET_ERROR, SET_LOADING } from "../types/products";

const initialState = {
  all: [],
  loading: false,
  error: true
};

function products(state = initialState, action) {
  const productsCases = {
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

  return productsCases[action.type] || state;
}

export {
  products
};
