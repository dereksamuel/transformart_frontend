import React from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router";

function PrivateRoute() {
  const loading = useSelector((state) => state.authenticate.loading);

  return loading ? <p className="whitep">LOADING...</p> : <Outlet />;
}

export {
  PrivateRoute
};
