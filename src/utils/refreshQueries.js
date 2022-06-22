import { getCategoriesProducts } from "../store/actions/categoriesProducts";
import { getProducts } from "../store/actions/products";
import { getCategories } from "../store/actions/categories";

const refreshQueries = async (dispatch) => {
  await dispatch(getCategoriesProducts());
  dispatch(getProducts());
  dispatch(getCategories());
};

export {
  refreshQueries
};
