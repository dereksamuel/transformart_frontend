import { SET_ALERT } from "../types/alert";

const initialState = {
  alert: null,
};

function alert(state = initialState, action) {
  const alertCases = {
    [SET_ALERT]: {
      ...state,
      alert: action.payload
    }
  };

  return alertCases[action.type] || state;
}

export {
  alert
};
