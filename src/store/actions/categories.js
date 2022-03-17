import { fetchQuery } from "../../utils/fetchQuery";
import { setState } from "../../utils/setState";
import { SET_ALL, SET_ERROR, SET_LOADING } from "../types/categories";

const getCategories = () => async (dispatch) => {
  dispatch(setState({ type: SET_LOADING, payload: true }));

  const { data, error } = await fetchQuery(`
    query {
      getCategories {
        id
        name
      }
    }
  `);

  dispatch(setState({ type: SET_ALL, payload: data.getCategories }));
  dispatch(setState({ type: SET_LOADING, payload: false }));
  dispatch(setState({ type: SET_ERROR, payload: Boolean(error) }));
};

export {
  getCategories
};
