import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router";

import { Home } from "../pages/Home";
import { Login } from "../pages/Login";
import { Categories } from "../pages/Categories";
import { Category } from "../pages/Category";
import { Product } from "../pages/Product";
import { Shopping } from "../pages/Shopping";
import { ContactUs } from "../pages/ContactUs";

import { PrivateRoute } from "./PrivateRoute";

function RoutesComponent() {
  const location = useLocation();

  useEffect(() => {
    const $root = document.getElementById("root");

    if ($root) {
      $root.scrollTo(0, 0);
    }
  }, [location.pathname]);

  return (
    <main className="Router" id="Router">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<div>Hello search</div>} />
        <Route path="/products" element={<Categories />} />
        <Route path="/products/:categoryId" element={<Category />} />
        <Route path="/oneProduct/:productId" element={<Product />} />
        <Route path="/myshopping" element={<Shopping />} />
        <Route path="/contact_us" element={<ContactUs />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/update_art"
          element={<PrivateRoute />}
        >
          <Route exact path="/update_art" element={<div>Hello my private route</div>}/>
        </Route>
      </Routes>
    </main>
  );
}

export {
  RoutesComponent
};
