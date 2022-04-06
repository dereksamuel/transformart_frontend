import React from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router";

import { useVerifyAuth } from "../../hooks/useVerifyAuth";

function PrivateRoute() {
  const loading = useSelector((state) => state.authenticate.loading);
  useVerifyAuth();

  return loading ? <p className="whitep">LOADING...</p> : <Outlet />;
}

export {
  PrivateRoute
};
