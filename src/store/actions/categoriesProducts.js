import { fetchQuery } from "../../utils/fetchQuery";
import { refreshQueries } from "../../utils/refreshQueries";
import { setState } from "../../utils/setState";
import { SET_ALL, SET_ERROR, SET_LOADING, SET_ONE } from "../types/categoriesProducts";

const getCategoriesProducts = () => async (dispatch) => {
  dispatch(setState({ type: SET_LOADING, payload: true }));

  const { data, error } = await fetchQuery(`
    query {
      getCategoriesProducts {
        id
        categoriesId
        productsId
      }
    }
  `);

  dispatch(setState({ type: SET_ALL, payload: data.getCategoriesProducts }));
  dispatch(setState({ type: SET_LOADING, payload: false }));
  dispatch(setState({ type: SET_ERROR, payload: Boolean(error) }));
};

const getCategoriesProduct = (id) => async (dispatch) => {
  dispatch(setState({ type: SET_LOADING, payload: true }));

  const { data, error } = await fetchQuery(`
    query {
      getCategoriesProduct(categoriesProductsId: ${id}) {
        id
        categoriesId
        productsId
      }
    }
  `);

  dispatch(setState({ type: SET_ONE, payload: data.getCategoriesProduct }));
  dispatch(setState({ type: SET_LOADING, payload: false }));
  dispatch(setState({ type: SET_ERROR, payload: Boolean(error) }));
};

const createCategoriesProduct = (categoriesId, productsId) => async (dispatch) => {
  dispatch(setState({ type: SET_LOADING, payload: true }));

  const { error } = await fetchQuery(`
    mutation {
      createCategoriesProduct(
        categoriesId: ${categoriesId}
        ${productsId ? `productsId: ${productsId}` : ""}
      ) {
        id
        categoriesId
        productsId
      }
    }
  `);

  await refreshQueries(dispatch);
  dispatch(setState({ type: SET_LOADING, payload: false }));
  dispatch(setState({ type: SET_ERROR, payload: Boolean(error) }));
};

const deleteCategoriesProduct = (cpId) => async (dispatch) => {
  dispatch(setState({ type: SET_LOADING, payload: true }));

  const { error } = await fetchQuery(`
    mutation {
      deleteCategoriesProduct(
        id: ${cpId}
      )
    }
  `);

  await refreshQueries(dispatch);
  dispatch(setState({ type: SET_LOADING, payload: false }));
  dispatch(setState({ type: SET_ERROR, payload: Boolean(error) }));
};

const updateCategoriesProduct = ({
  createCategoriesProductId,
  categoriesId,
  productsId
}) => async (dispatch) => {
  dispatch(setState({ type: SET_LOADING, payload: true }));

  const { error } = await fetchQuery(`
    mutation {
      updateCategoriesProduct(
        id: ${createCategoriesProductId}
        categoriesId: ${categoriesId}
        productsId: ${productsId}
      ) {
        id
        categoriesId
        productsId
      }
    }
  `);

  await refreshQueries(dispatch);
  dispatch(setState({ type: SET_LOADING, payload: false }));
  dispatch(setState({ type: SET_ERROR, payload: Boolean(error) }));
};

const upsertCategoriesProduct = ({
  createCategoriesProductId,
  categoriesId,
  productsId
}) => async (dispatch) => {
  dispatch(setState({ type: SET_LOADING, payload: true }));

  const { error } = await fetchQuery(`
    mutation {
      upsertCategoriesProduct(
        id: ${createCategoriesProductId}
        categoriesId: ${categoriesId}
        productsId: ${productsId}
      ) {
        id
        categoriesId
        productsId
      }
    }
  `);

  dispatch(setState({ type: SET_LOADING, payload: false }));
  dispatch(setState({ type: SET_ERROR, payload: Boolean(error) }));
};

export {
  getCategoriesProducts,
  getCategoriesProduct,
  createCategoriesProduct,
  deleteCategoriesProduct,
  updateCategoriesProduct,
  upsertCategoriesProduct
};
