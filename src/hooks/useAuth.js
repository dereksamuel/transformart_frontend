import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { SET_AUTH, SET_LOADING } from "../store/types/authenticate";

import { auth } from "../utils/connectFirebase";
import { changeState } from "../utils/reusableReducer";

const useAuth = (ready) => {
  const dispatch = useDispatch();
  dispatch(changeState({ type: SET_LOADING, payload: true }));

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      dispatch(changeState({ type: SET_AUTH, payload: Boolean(user) }));
      dispatch(changeState({ type: SET_LOADING, payload: false }));

      ready(user);
    });
  }, []);
};

export {
  useAuth
};
