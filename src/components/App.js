import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Home } from "../pages/Home";
import { Login } from "../pages/Login";
import { Categories } from "../pages/Categories";

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
            <Route path="/myshopping" element={<div>Hello myshopping</div>} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/update_art"
              element={<PrivateRoute />}
            >
              <Route exact path='/update_art' element={<div>Hello my private route</div>}/>
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
