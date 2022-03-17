import { combineReducers } from "@reduxjs/toolkit";

import { categoriesProducts } from "./categoriesProducts";
import { categories } from "./categories";
import { products } from "./products";
import { authenticate } from "./authenticate";

const reducers = combineReducers({
  products,
  categories,
  categoriesProducts,
  authenticate
});

export {
  reducers
};
