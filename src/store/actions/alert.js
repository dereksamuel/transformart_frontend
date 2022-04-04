import { setState } from "../../utils/setState";

import { SET_ALERT } from "../types/alert";

const onHideAlert = (payload) => (dispatch) => {
  dispatch(setState({
    type: SET_ALERT,
    payload
  }));
};

export {
  onHideAlert
};
