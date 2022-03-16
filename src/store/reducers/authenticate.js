import { SET_AUTH, SET_ERROR, SET_LOADING } from "../types/authenticate";

const initialState = {
  isAuth: false,
  loading: false,
  error: true
};

function authenticate(state = initialState, action) {
  const authenticateCases = {
    [SET_AUTH]: {
      ...state,
      isAuth: action.payload
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

  return authenticateCases[action.type] || state;
}

export {
  authenticate
};
