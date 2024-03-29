import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router";

import { Home } from "../pages/Home";
import { Login } from "../pages/Login";
import { Categories } from "../pages/Categories";
import { Category } from "../pages/Category";
import { Product } from "../pages/Product";
import { Shopping } from "../pages/Shopping";
import { ContactUs } from "../pages/ContactUs";
import { Resume } from "../pages/Resume";
import { UpdateArt } from "../pages/UpdateArt";

import { PrivateRoute } from "./PrivateRoute";
import WaveLogin from "../assets/images/pc/WaveLogin.png";

import { useVerifyAuth } from "../hooks/useVerifyAuth";
import { ResumeWave } from "./ResumeWave";

function RoutesComponent() {
  const location = useLocation();
  const isHiddenTriangle = location.pathname.includes("/products") || location.pathname === "/myshopping";
  useVerifyAuth();

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
        <Route path="/products" element={<Categories />} />
        <Route path="/products/:categoryId" element={<Category />} />
        <Route path="/oneProduct/:productId" element={<Product />} />
        <Route path="/myshopping" element={<Shopping />} />
        <Route path="/contact_us" element={<ContactUs />} />
        <Route path="/resume" element={<Resume />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/update_art"
          element={<PrivateRoute />}
        >
          <Route exact path="/update_art" element={<UpdateArt />}/>
        </Route>
      </Routes>
      {location.pathname === "/resume" && <div className="wave-pc"><ResumeWave /></div>}
      {location.pathname === "/login" && <img src={WaveLogin} alt="WaveLogin" className="wave-login-pc" />}
      {isHiddenTriangle && <div className="triangle-pc"></div>}
    </main>
  );
}

export {
  RoutesComponent
};
