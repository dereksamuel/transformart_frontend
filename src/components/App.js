import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "../pages/Home";
import { Menu } from "./Menu";

import "./styles.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <main className="Router" id="Router">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<div>Hello search</div>} />
            <Route path="/myshopping" element={<div>Hello myshopping</div>} />
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
