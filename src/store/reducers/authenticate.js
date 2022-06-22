import { SET_AUTH, SET_ERROR, SET_LOADING, SET_LOADING_FORM, SET_SUBSCRIBER } from "../types/authenticate";

const initialState = {
  isAuth: false,
  loading: true,
  loadingForm: false,
  subscriber: null,
  error: false
};

function authenticate(state = initialState, action) {
  const authenticateCases = {
    [SET_AUTH]: {
      ...state,
      isAuth: action.payload
    },
    [SET_SUBSCRIBER]: {
      ...state,
      subscriber: action.payload
    },
    [SET_ERROR]: {
      ...state,
      error: action.payload
    },
    [SET_LOADING]: {
      ...state,
      loading: action.payload
    },
    [SET_LOADING_FORM]: {
      ...state,
      loadingForm: action.payload
    }
  };

  return authenticateCases[action.type] || state;
}

export {
  authenticate
};
