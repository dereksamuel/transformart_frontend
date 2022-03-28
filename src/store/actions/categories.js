import { fetchQuery } from "../../utils/fetchQuery";
import { setState } from "../../utils/setState";
import { SET_ALL, SET_ERROR, SET_LOADING, SET_CREATED } from "../types/categories";

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

const deleteCategory = (categoryId) => async (dispatch) => {
  dispatch(setState({ type: SET_LOADING, payload: true }));

  const { error } = await fetchQuery(`
    mutation {
      deleteCategory(id: ${categoryId})
    }
  `);

  dispatch(setState({ type: SET_LOADING, payload: false }));
  dispatch(setState({ type: SET_ERROR, payload: Boolean(error) }));
};

const createCategory = (categoryName) => async (dispatch) => {
  dispatch(setState({ type: SET_LOADING, payload: true }));

  const { data, error } = await fetchQuery(`
    mutation {
      createCategory(name: "${categoryName}") {
        id
      }
    }
  `);

  dispatch(setState({ type: SET_CREATED, payload: data.createCategory }));
  dispatch(setState({ type: SET_LOADING, payload: false }));
  dispatch(setState({ type: SET_ERROR, payload: Boolean(error) }));
};

export {
  getCategories,
  deleteCategory,
  createCategory
};
