import { useEffect } from "react";

import { useDispatch } from "react-redux";

import { setState } from "../utils/setState";
import { auth } from "../utils/connectFirebase";

import { SET_AUTH, SET_ERROR, SET_LOADING } from "../store/types/authenticate";
import { fetchQuery } from "../utils/fetchQuery";

const useVerifyAuth = () => {
  const dispatch = useDispatch();

  useEffect(async () => {
    dispatch(setState({ type: SET_LOADING, payload: true }));

    let unsubscribe = auth.onAuthStateChanged((user) => {
      dispatch(setState({ type: SET_AUTH, payload: Boolean(user) }));

      unsubscribe();
    });

    dispatch(setState({ type: SET_LOADING, payload: false }));

    const { data, error } = await fetchQuery(`
      mutation {
        verifyIsAuth
      }
    `);

    dispatch(setState({ type: SET_LOADING, payload: false }));
    dispatch(setState({ type: SET_AUTH, payload: data.verifyIsAuth }));
    dispatch(setState({ type: SET_ERROR, payload: Boolean(error) }));
  }, []);
};

export {
  useVerifyAuth
};
