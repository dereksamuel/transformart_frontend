import React from "react";
import { BrowserRouter } from "react-router-dom";

import { Menu } from "./Menu";
import { RoutesComponent } from "./RoutesComponent";

import "./styles.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <RoutesComponent />
        <Menu />
      </BrowserRouter>
    </div>
  );
}

export {
  App
};
