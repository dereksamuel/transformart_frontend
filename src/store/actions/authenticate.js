import { fetchQuery } from "../../utils/fetchQuery";
import { changeState } from "../../utils/reusableReducer";
import { SET_AUTH, SET_ERROR, SET_LOADING } from "../types/authenticate";

const doAuthenticate = (fb_token, navigate) => async (dispatch) => {
  dispatch(changeState({ type: SET_LOADING, payload: true }));

  const { error } = await fetchQuery(`
    mutation {
      authenticate(headerToken: "${fb_token}")
    }
  `);

  if (!error) {
    navigate({ pathname: "/update_art" });
  }

  dispatch(changeState({ type: SET_AUTH, payload: !error }));
  dispatch(changeState({ type: SET_LOADING, payload: false }));
  dispatch(changeState({ type: SET_ERROR, payload: error }));
};

export {
  doAuthenticate
};
