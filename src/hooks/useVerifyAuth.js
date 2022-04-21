import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router";

import { setState } from "../utils/setState";
import { fetchQuery } from "../utils/fetchQuery";
import { auth } from "../utils/connectFirebase";

import { SET_AUTH, SET_ERROR, SET_LOADING, SET_SUBSCRIBER } from "../store/types/authenticate";

const onAuthVal = (dispatch, val) => {
  dispatch(setState({ type: SET_LOADING, payload: false }));
  dispatch(setState({ type: SET_AUTH, payload: val }));
};

const useVerifyAuth = () => {
  const subscriber = useSelector((state) => state.authenticate.subscriber);
  const location = useLocation();
  const navigate = useNavigate();

  const dispatch = useDispatch();

  useEffect(() => {
    if (!subscriber) {
      dispatch(setState({
        type: SET_SUBSCRIBER,
        payload: auth.onIdTokenChanged((user) => {
          // si quieres que se unsubscribe con x = askaskla x();
          console.log(user);
          if (!user) {
            if (location.pathname === "/update_art") {
              navigate({ pathname: "/login" });
            }

            onAuthVal(dispatch, user);
            dispatch(setState({ type: SET_ERROR, payload: false }));
          }
        })
      }));
    }
  }, []);

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

      onAuthVal(dispatch, data.verifyIsAuth);
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
