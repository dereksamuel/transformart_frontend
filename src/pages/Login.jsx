import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { signInWithEmailAndPassword } from "firebase/auth";
import { LoginIcon } from "@heroicons/react/outline";

import { auth } from "../utils/connectFirebase";
import logoIcon from "../assets/images/mobile/logoIcon.svg";
import WaveFlowHeader from "../assets/images/mobile/WaveFlowHeader.svg";
import WaveFlowFooter from "../assets/images/mobile/WaveFlowFooter.svg";

import { IconBanner } from "../components/IconBanner";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { useModel } from "../hooks/useModel";

import "./Login.css";
import { Alert } from "../components/Alert";
import { setState } from "../utils/setState";
import { SET_AUTH, SET_ERROR, SET_LOADING } from "../store/types/authenticate";

function Login() {
  const isAuth = useSelector((state) => state.authenticate.isAuth);
  const loading = useSelector((state) => state.authenticate.loading);
  const [showAlert, setShowAlert] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [userName] = useModel({
    initialValue: "",
    domEl: "#userName"
  });
  const [userPasword] = useModel({
    initialValue: "",
    domEl: "#userPasword"
  });

  const onLogin = async (event) => {
    event.preventDefault();
    dispatch(setState({ type: SET_LOADING, payload: true }));

    const userCredential = await signInWithEmailAndPassword(
      auth,
      userName,
      userPasword
    ).catch((error) => {
      console.error(error);
      setShowAlert(true);
      dispatch(setState({ type: SET_AUTH, payload: false }));
      dispatch(setState({ type: SET_ERROR, payload: true }));
      dispatch(setState({ type: SET_LOADING, payload: false }));
    });

    localStorage.setItem("headerToken", userCredential.user.accessToken);

    dispatch(setState({ type: SET_AUTH, payload: true }));
  };

  const onHideAlert = () => setShowAlert(false);

  useEffect(() => {
    dispatch(setState({ type: SET_LOADING, payload: false }));

    if (isAuth) {
      navigate({ pathname: "/update_art" });
    }
  }, [isAuth]);

  return (
    <div className="Login">
      <img src={WaveFlowHeader} alt="WaveFlowHeader" className="WaveFlowHeader" />
      {
        showAlert && <Alert
          title="Error de autenticación"
          description="Lo sentimos, pero algo ha ido mal con la autenticación"
          theme="Error"
          toLeft={true}
          onClick={onHideAlert}
        />
      }
      <form className="FormLogin" onSubmit={onLogin}>
        <IconBanner className="IconBanner logoIcon">
          <img src={logoIcon} alt="logoIcon" />
        </IconBanner>
        <Input
          id="userName"
          className="Input userName"
          placeholder="Nombre de usuario"
          autoComplete="false"
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
        <Button type="submit" className="PrimaryWave stylesButtonSignin" disabled={loading}>
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
      <img src={WaveFlowFooter} alt="WaveFlowFooter" className="WaveFlowFooter" />
    </div>
  );
}

export {
  Login
};
