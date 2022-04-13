import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router";

import { setState } from "../utils/setState";
import { fetchQuery } from "../utils/fetchQuery";

import { SET_AUTH, SET_ERROR, SET_LOADING } from "../store/types/authenticate";

const useVerifyAuth = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const dispatch = useDispatch();

  useEffect(async () => {
    dispatch(setState({ type: SET_LOADING, payload: true }));

    try {
      const { data, error } = await fetchQuery(`
        mutation {
          verifyIsAuth
        }
      `);

      if (!data.verifyIsAuth && location.pathname === "/update_art") {
        navigate({ pathname: "/login" });
      }

      dispatch(setState({ type: SET_LOADING, payload: false }));
      dispatch(setState({ type: SET_AUTH, payload: data.verifyIsAuth }));
      dispatch(setState({ type: SET_ERROR, payload: Boolean(error) }));
    } catch (error) {
      console.error(error);
      dispatch(setState({ type: SET_AUTH, payload: false }));
    }
  }, [dispatch]);
};

export {
  useVerifyAuth
};
