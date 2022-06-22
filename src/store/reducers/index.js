import { combineReducers } from "@reduxjs/toolkit";

import { categoriesProducts } from "./categoriesProducts";
import { categories } from "./categories";
import { products } from "./products";
import { authenticate } from "./authenticate";
import { alert } from "./alert";

const reducers = combineReducers({
  products,
  categories,
  categoriesProducts,
  authenticate,
  alert
});

export {
  reducers
};
