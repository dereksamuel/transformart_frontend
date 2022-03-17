import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router";

import { auth } from "../../utils/connectFirebase";
import { setState } from "../../utils/setState";
import { SET_LOADING, SET_AUTH, SET_ERROR } from "../../store/types/authenticate";

const PrivateRoute = () => {
  const loading = useSelector((state) => state.authenticate.loading);
  const isAuth = useSelector((state) => state.authenticate.isAuth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(setState({ type: SET_LOADING, payload: true }));

    auth.onAuthStateChanged((user) => {
      dispatch(setState({ type: SET_LOADING, payload: false }));
      dispatch(setState({ type: SET_AUTH, payload: Boolean(user) }));
      dispatch(setState({ type: SET_ERROR, payload: false }));

      if (!user) {
        dispatch(setState({ type: SET_ERROR, payload: true }));
        navigate({ pathname: "/login" });
      }
    });
  }, []);

  useEffect(() => {
    if (!isAuth && !loading) {
      navigate({ pathname: "/login" });
    }
  }, [isAuth, loading]);

  return loading ? <p className="whitep">LOADING...</p> : <Outlet />;
};

export {
  PrivateRoute
};
