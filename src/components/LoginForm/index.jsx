import React from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { signInWithEmailAndPassword } from "firebase/auth";
import { LoginIcon } from "@heroicons/react/outline";
import PropTypes from "prop-types";

import { useModel } from "../../hooks/useModel";

import { Input } from "../Input";
import { Button } from "../Button";

import { setState } from "../../utils/setState";
import { auth } from "../../utils/connectFirebase";

import { SET_AUTH, SET_ERROR, SET_LOADING_FORM } from "../../store/types/authenticate";

function LoginForm({ onError }) {
  const loading = useSelector((state) => state.authenticate.loadingForm);
  const navigate = useNavigate();

  const [userName] = useModel({
    initialValue: "",
    domEl: "#userName"
  });
  const [userPasword] = useModel({
    initialValue: "",
    domEl: "#userPasword"
  });

  const dispatch = useDispatch();

  const onLogin = async (event) => {
    event.preventDefault();
    dispatch(setState({ type: SET_LOADING_FORM, payload: true }));

    const userCredential = await signInWithEmailAndPassword(
      auth,
      userName,
      userPasword
    ).catch((error) => {
      console.error(error);
      onError();
      dispatch(setState({ type: SET_AUTH, payload: false }));
      dispatch(setState({ type: SET_ERROR, payload: true }));
      dispatch(setState({ type: SET_LOADING_FORM, payload: false }));
    });

    localStorage.setItem("headerToken", userCredential.user.accessToken);

    dispatch(setState({ type: SET_AUTH, payload: true }));
    dispatch(setState({ type: SET_LOADING_FORM, payload: false }));
    navigate({ pathname: "/update_art" });
  };

  return (
    <form onSubmit={onLogin} id="formLogin">
      <Input
        id="userName"
        className="Input userName"
        placeholder="Nombre de usuario"
        autoComplete="false"
        type="email"
        required
      />
      <Input
        id="userPasword"
        className="Input userPasword"
        placeholder="Contraseña"
        type="password"
        autoComplete="false"
        required
      />
      <Button
        type="submit"
        className="PrimaryWave stylesButtonSignin"
        disabled={loading}
        form="formLogin"
      >
        <div className="sessionContainer">
          {
            !loading ? (
              <>
                <LoginIcon />
                <span>Iniciar sesión</span>
              </>
            ) : (
              <span>Cargando</span>
            )
          }
        </div>
      </Button>
    </form>
  );
}

LoginForm.propTypes = {
  onError: PropTypes.func
};

export {
  LoginForm
};
