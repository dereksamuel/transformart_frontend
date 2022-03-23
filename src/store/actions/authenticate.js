import { fetchQuery } from "../../utils/fetchQuery";
import { setState } from "../../utils/setState";
import { SET_AUTH, SET_ERROR, SET_LOADING } from "../types/authenticate";

const logout = () => async (dispatch) => {
  dispatch(setState({ type: SET_LOADING, payload: true }));

  const { error } = await fetchQuery(`
    mutation {
      logout
    }
  `);

  localStorage.removeItem("headerToken");

  dispatch(setState({ type: SET_AUTH, payload: false }));
  dispatch(setState({ type: SET_LOADING, payload: false }));
  dispatch(setState({ type: SET_ERROR, payload: Boolean(error) }));
};

export {
  logout
};
