import { fetchQuery } from "../../utils/fetchQuery";
import { setState } from "../../utils/setState";
import { SET_ALL, SET_ERROR, SET_LOADING } from "../types/products";

const getProducts = () => async (dispatch) => {
  dispatch(setState({ type: SET_LOADING, payload: true }));

  const { data, error } = await fetchQuery(`
    query {
      getProducts {
        id
        srcImage
        srcVideo
        description
        name
        facebookLink
        instagramLink
        tweeterLink
      }
    }
  `);

  dispatch(setState({ type: SET_ALL, payload: data.getProducts }));
  dispatch(setState({ type: SET_LOADING, payload: false }));
  dispatch(setState({ type: SET_ERROR, payload: Boolean(error) }));
};

export {
  getProducts
};
