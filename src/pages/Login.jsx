import React, { useEffect } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { LoginIcon } from "@heroicons/react/outline";
import { useDispatch, useSelector } from "react-redux";

import { auth } from "../utils/connectFirebase";
import logoIcon from "../assets/images/mobile/logoIcon.svg";
import WaveFlowHeader from "../assets/images/mobile/WaveFlowHeader.svg";
import WaveFlowFooter from "../assets/images/mobile/WaveFlowFooter.svg";

import { IconBanner } from "../components/IconBanner";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { useModel } from "../hooks/useModel";

import "./Login.css";
import { doAuthenticate } from "../store/actions/authenticate";
import { useNavigate } from "react-router";

function Login() {
  const isAuth = useSelector((state) => state.authenticate.isAuth);
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
    const userCredential = await signInWithEmailAndPassword(
      auth,
      userName,
      userPasword
    );

    dispatch(doAuthenticate(userCredential.user.accessToken));
  };

  useEffect(() => {
    if (isAuth) {
      navigate({ pathname: "/update_art" });
    }
  }, [isAuth]);

  return (
    <div className="Login">
      <img src={WaveFlowHeader} alt="WaveFlowHeader" className="WaveFlowHeader" />
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
        <Button type="submit" className="PrimaryWave stylesButtonSignin" onClick={console.log}>
          <div className="sessionContainer">
            <LoginIcon />
            <span>Iniciar sesión</span>
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
