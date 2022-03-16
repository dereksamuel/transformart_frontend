import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router";

import { useAuth } from "../../hooks/useAuth";
import { SET_LOADING } from "../../store/types/authenticate";
import { changeState } from "../../utils/reusableReducer";

const PrivateRoute = () => {
  // const [loading, setLoading] = useState(true);
  const loading = useSelector((state) => state.authenticate.loading);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useAuth((isAuth) => {
    if (!isAuth) {
      navigate({ pathname: "/login" });
    } else {
      console.log("Hello");
      dispatch(changeState({ type: SET_LOADING, payload: false }));
    }
  });

  return loading ? <p>Loading DK... {`${loading}`}</p> : <Outlet />;
};

export {
  PrivateRoute
};
