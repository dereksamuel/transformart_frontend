import { combineReducers } from "@reduxjs/toolkit";

import { products } from "./products";
import { authenticate } from "./authenticate";

const reducers = combineReducers({
  products,
  authenticate
});

export {
  reducers
};
