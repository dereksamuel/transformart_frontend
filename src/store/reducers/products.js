import { SET_ALL } from "../types/products";

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
    }
  };

  return productsCases[action.type] || state;
}

export {
  products
};
