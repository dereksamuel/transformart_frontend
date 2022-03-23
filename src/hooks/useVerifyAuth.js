import { useEffect } from "react";

import { useDispatch } from "react-redux";

import { setState } from "../utils/setState";
import { auth } from "../utils/connectFirebase";

import { SET_AUTH, SET_ERROR, SET_LOADING } from "../store/types/authenticate";

const useVerifyAuth = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setState({ type: SET_LOADING, payload: true }));

    auth.onAuthStateChanged((user) => {
      dispatch(setState({ type: SET_LOADING, payload: false }));
      dispatch(setState({ type: SET_AUTH, payload: Boolean(user) }));
      dispatch(setState({ type: SET_ERROR, payload: false }));
    });
  }, []);
};

export {
  useVerifyAuth
};
