import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Home } from "../pages/Home";
import { Login } from "../pages/Login";
import { Categories } from "../pages/Categories";
import { Category } from "../pages/Category";
import { Product } from "../pages/Product";
import { Shopping } from "../pages/Shopping";

import { Menu } from "./Menu";
import { PrivateRoute } from "./PrivateRoute";

import "./styles.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <main className="Router" id="Router">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<div>Hello search</div>} />
            <Route path="/products" element={<Categories />} />
            <Route path="/products/:categoryId" element={<Category />} />
            <Route path="/oneProduct/:productId" element={<Product />} />
            <Route path="/myshopping" element={<Shopping />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/update_art"
              element={<PrivateRoute />}
            >
              <Route exact path="/update_art" element={<div>Hello my private route</div>}/>
            </Route>
          </Routes>
        </main>
        <Menu />
      </BrowserRouter>
    </div>
  );
}

export {
  App
};
