import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router";

import { useVerifyAuth } from "../../hooks/useVerifyAuth";

const PrivateRoute = () => {
  const loading = useSelector((state) => state.authenticate.loading);
  const isAuth = useSelector((state) => state.authenticate.isAuth);
  const navigate = useNavigate();
  useVerifyAuth();

  useEffect(() => {
    console.log("loading", loading);
    if (!isAuth && !loading) {
      navigate({ pathname: "/login" });
    }
  }, [isAuth, loading]);

  return loading ? <p className="whitep">LOADING...</p> : <Outlet />;
};

export {
  PrivateRoute
};
