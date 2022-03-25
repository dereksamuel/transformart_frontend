import { fetchQuery } from "../../utils/fetchQuery";
import { setState } from "../../utils/setState";
import { SET_ALL, SET_ERROR, SET_LOADING, SET_ONE } from "../types/products";
import { getCategories } from "./categories";
import { getCategoriesProducts } from "./categoriesProducts";

const expectedValues = `
  id
  srcImage
  srcVideo
  description
  name
  price
  offer
  facebookLink
  instagramLink
  tweeterLink
`;

const getProducts = () => async (dispatch) => {
  dispatch(setState({ type: SET_LOADING, payload: true }));

  const { data, error } = await fetchQuery(`
    query {
      getProducts {
        ${expectedValues}
      }
    }
  `);

  dispatch(setState({ type: SET_ALL, payload: data.getProducts }));
  dispatch(setState({ type: SET_LOADING, payload: false }));
  dispatch(setState({ type: SET_ERROR, payload: Boolean(error) }));
};

const getProduct = (productId) => async (dispatch) => {
  dispatch(setState({ type: SET_LOADING, payload: true }));

  const { data, error } = await fetchQuery(`
    query {
      getProduct(productId: ${productId}) {
        ${expectedValues}
      }
    }
  `);

  dispatch(setState({ type: SET_ONE, payload: data.getProduct }));
  dispatch(setState({ type: SET_LOADING, payload: false }));
  dispatch(setState({ type: SET_ERROR, payload: Boolean(error) }));
};

const deleteProduct = (productId) => async (dispatch) => {
  dispatch(setState({ type: SET_LOADING, payload: true }));

  const { error } = await fetchQuery(`
    mutation {
      deleteProduct(id: ${productId})
    }
  `);

  dispatch(setState({ type: SET_LOADING, payload: false }));
  dispatch(setState({ type: SET_ERROR, payload: Boolean(error) }));

  await dispatch(getCategoriesProducts());
  dispatch(getProducts());
  dispatch(getCategories());
};

export {
  getProducts,
  getProduct,
  deleteProduct
};
