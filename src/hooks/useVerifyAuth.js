import { useEffect } from "react";

import { useDispatch } from "react-redux";

import { setState } from "../utils/setState";

import { SET_AUTH, SET_ERROR, SET_LOADING } from "../store/types/authenticate";
import { fetchQuery } from "../utils/fetchQuery";

const useVerifyAuth = () => {
  const dispatch = useDispatch();
  // FIXME: React memo thing to prevent two requests useCallback or useMemo 🤚🏻
  useEffect(async () => {
    dispatch(setState({ type: SET_LOADING, payload: true }));

    try {
      const { data, error } = await fetchQuery(`
        mutation {
          verifyIsAuth
        }
      `);
      dispatch(setState({ type: SET_LOADING, payload: false }));
      dispatch(setState({ type: SET_AUTH, payload: data.verifyIsAuth }));
      dispatch(setState({ type: SET_ERROR, payload: Boolean(error) }));
    } catch (error) {
      dispatch(setState({ type: SET_AUTH, payload: false }));
    }
  }, []);
};

export {
  useVerifyAuth
};
