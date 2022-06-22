import {
  SET_ALL,
  SET_ERROR,
  SET_LOADING,
  SET_ONE,
  SET_SELECTED,
  SET_SOURCES,
  SET_CREATED,
  SET_DELETED_FILES
} from "../types/products";

const initialState = {
  all: [],
  one: {},
  selected: {},
  sources: null,
  loading: false,
  error: true,
  createdId: null,
  deletedFiles: false
};

function products(state = initialState, action) {
  const productsCases = {
    [SET_ALL]: {
      ...state,
      all: action.payload
    },
    [SET_DELETED_FILES]: {
      ...state,
      deletedFiles: action.payload
    },
    [SET_ONE]: {
      ...state,
      one: action.payload
    },
    [SET_SELECTED]: {
      ...state,
      selected: action.payload
    },
    [SET_SOURCES]: {
      ...state,
      sources: action.payload
    },
    [SET_ERROR]: {
      ...state,
      error: action.payload
    },
    [SET_LOADING]: {
      ...state,
      loading: action.payload
    },
    [SET_CREATED]: {
      ...state,
      createdId: action.payload
    }
  };

  return productsCases[action.type] || state;
}

export {
  products
};
