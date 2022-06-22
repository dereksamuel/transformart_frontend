import { setState } from "../../utils/setState";

import { SET_ALERT } from "../types/alert";

const onChangeAlert = (payload) => (dispatch) => {
  dispatch(setState({
    type: SET_ALERT,
    payload
  }));
};

export {
  onChangeAlert
};
