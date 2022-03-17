import { fetchQuery } from "../../utils/fetchQuery";
import { setState } from "../../utils/setState";
import { SET_AUTH, SET_ERROR, SET_LOADING } from "../types/authenticate";

const doAuthenticate = (fb_token) => async function (dispatch) {
  dispatch(setState({ type: SET_LOADING, payload: true }));

  const { error } = await fetchQuery(`
    mutation {
      authenticate(headerToken: "${fb_token}")
    }
  `);

  dispatch(setState({ type: SET_AUTH, payload: !error }));
  dispatch(setState({ type: SET_LOADING, payload: false }));
  dispatch(setState({ type: SET_ERROR, payload: error }));
};

export {
  doAuthenticate
};
