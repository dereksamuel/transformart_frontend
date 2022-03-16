import { applyMiddleware, combineReducers, compose, createStore } from "@reduxjs/toolkit";
import { products } from "./reducers/products";
import { authenticate } from "./reducers/authenticate";
import thunk from "redux-thunk";

const reducers = combineReducers({
  products,
  authenticate
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const composedEnhancers = composeEnhancers(
  applyMiddleware(
    thunk,
    // logAction,
    // reportError
  )
);

const store = createStore(reducers, composedEnhancers);

export {
  store
};
